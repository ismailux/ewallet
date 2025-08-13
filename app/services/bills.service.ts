import { Injectable, OnDestroy, effect, signal } from '@angular/core';
import { BillAccount, BillCarrier, BillItem, BillPayment, Frequency } from '../models/bills';
import { CARRIERS } from '../data/carriers.mock';
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';

function uid(prefix = 'id'): string { return `${prefix}_${Math.random().toString(36).slice(2, 10)}`; }

const KEYS = { ACCOUNTS: 'bills_accounts', ITEMS: 'bills_items', PAYMENTS: 'bills_payments' };

@Injectable({ providedIn: 'root' })
export class BillsService implements OnDestroy {
  carriers = signal<BillCarrier[]>(CARRIERS);
  accounts = signal<BillAccount[]>([]);
  items    = signal<BillItem[]>([]);
  payments = signal<BillPayment[]>([]);

  private interval?: any;

  constructor() {
    this.restore();
    this.startFauxScheduler();
    App.addListener('appStateChange', ({ isActive }) => { if (isActive) this.runSchedulerTick(); });

    // Request local notification permission on first use
    LocalNotifications.requestPermissions();

    // Keep nextRunAt in sync when frequency/autopay changes
    effect(() => {
      const acc = this.accounts();
      acc.forEach(a => {
        if (a.autopay && a.frequency !== 'MANUAL') {
          a.nextRunAt = this.computeNextRun(a.frequency);
        } else {
          a.nextRunAt = undefined;
        }
      });
      this.persist();
    });
  }

  ngOnDestroy(): void { if (this.interval) clearInterval(this.interval); }

  // ---- Persistence (Preferences for simplicity) ----
  private async restore() {
    const [a, i, p] = await Promise.all([
      Preferences.get({ key: KEYS.ACCOUNTS }),
      Preferences.get({ key: KEYS.ITEMS }),
      Preferences.get({ key: KEYS.PAYMENTS }),
    ]);
    this.accounts.set(a.value ? JSON.parse(a.value) : []);
    this.items.set(i.value ? JSON.parse(i.value) : []);
    this.payments.set(p.value ? JSON.parse(p.value) : []);
  }
  private async persist() {
    await Promise.all([
      Preferences.set({ key: KEYS.ACCOUNTS, value: JSON.stringify(this.accounts()) }),
      Preferences.set({ key: KEYS.ITEMS, value: JSON.stringify(this.items()) }),
      Preferences.set({ key: KEYS.PAYMENTS, value: JSON.stringify(this.payments()) }),
    ]);
  }

  // ---- CRUD ----
  async addAccount(payload: { carrierId: string; nickname?: string; identity: Record<string, any>; }) {
    const acc: BillAccount = {
      id: uid('acc'),
      carrierId: payload.carrierId,
      nickname: payload.nickname,
      identity: payload.identity,
      createdAt: new Date().toISOString(),
      frequency: 'MANUAL',
      autopay: false,
    };
    this.accounts.update(list => [acc, ...list]);
    // simulate initial unpaid items retrieval
    const newItems: BillItem[] = this.mockUnpaidFor(acc.id);
    this.items.update(list => [...newItems, ...list]);
    await this.persist();
    return acc;
  }

  async removeAccount(id: string) {
    this.accounts.update(list => list.filter(a => a.id !== id));
    this.items.update(list => list.filter(i => i.accountId !== id));
    await this.persist();
  }

  listItems(accountId: string) { return this.items().filter(i => i.accountId === accountId); }
  listUnpaid(accountId: string) { return this.listItems(accountId).filter(i => i.status === 'UNPAID'); }

  async setSchedule(accountId: string, frequency: Frequency, autopay: boolean) {
    this.accounts.update(list => list.map(a => a.id === accountId ? { ...a, frequency, autopay } : a));
    await this.persist();
  }

  async payNow(accountId: string, itemId?: string) {
    const targetItems = itemId ? this.items().filter(i => i.id === itemId) : this.listUnpaid(accountId).slice(0, 1);
    if (!targetItems.length) return null;

    const paid: BillPayment[] = targetItems.map(i => ({
      id: uid('pay'),
      itemId: i.id,
      accountId,
      paidAt: new Date().toISOString(),
      amount: i.amount,
      currency: i.currency,
      method: 'WALLET',
      receiptUrl: `data:text/plain;base64,${btoa(`RECEIPT ${i.id} ${new Date().toISOString()}`)}`,
      txRef: uid('tx'),
    }));

    this.payments.update(p => [...paid, ...p]);
    this.items.update(list => list.map(i => targetItems.some(t => t.id === i.id) ? { ...i, status: 'PAID' } : i));
    await this.persist();
    return paid[0];
  }

  history(accountId: string) { return this.payments().filter(p => p.accountId === accountId); }
  carriersByCategory(cat: BillCarrier['category']) { return this.carriers().filter(c => c.category === cat); }

  // ---- Faux scheduler ----
  private startFauxScheduler() {
    // Foreground tick every 30s. On real apps, server-driven is recommended.
    this.interval = setInterval(() => this.runSchedulerTick(), 30_000);
  }

  private async runSchedulerTick() {
    const now = Date.now();
    const acc = this.accounts();
    for (const a of acc) {
      if (!a.autopay || a.frequency === 'MANUAL') continue;
      const due = this.listUnpaid(a.id);
      if (!due.length) continue;

      const next = a.nextRunAt ? new Date(a.nextRunAt).getTime() : now;
      if (now >= next) {
        // if frequency is ON_BILL pay immediately when unpaid exists
        await this.payNow(a.id, due[0].id);
        await LocalNotifications.schedule({
          notifications: [{
            id: Number(`${Date.now()}`.slice(-9)),
            title: 'Bill paid',
            body: `${this.carriers().find(c => c.id === a.carrierId)?.name || 'Bill'} has been paid automatically.`,
          }]
        });
        // recompute next
        a.nextRunAt = this.computeNextRun(a.frequency);
        await this.persist();
      }
    }
  }

  private computeNextRun(freq: Frequency): string | undefined {
    const d = new Date();
    switch (freq) {
      case 'ON_BILL': return new Date(Date.now() + 24 * 3600 * 1000).toISOString(); // check daily
      case 'WEEKLY': d.setDate(d.getDate() + 7); return d.toISOString();
      case 'MONTHLY': d.setMonth(d.getMonth() + 1); return d.toISOString();
      case 'QUARTERLY': d.setMonth(d.getMonth() + 3); return d.toISOString();
      case 'ANNUALLY': d.setFullYear(d.getFullYear() + 1); return d.toISOString();
      default: return undefined;
    }
  }

  // ---- Mock data helpers ----
  private mockUnpaidFor(accountId: string): BillItem[] {
    const amt = Math.floor(Math.random() * 200) + 50; // 50..250 MAD
    return [{
      id: uid('itm'),
      accountId,
      period: new Date().toISOString().slice(0, 7),
      dueAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      amount: amt,
      currency: 'MAD',
      status: 'UNPAID',
    }];
  }

  // ---- Insights (for Home dashboards) ----
/**
 * Computes KPIs for the Home insights cards.
 * - nextPayDays: days until the closest UNPAID dueAt (undefined if none)
 * - nextPayDateISO: ISO date of that closest dueAt
 * - remaining: sum of UNPAID amounts (current total liability)
 * - remainingOfMonth: sum of all bills this month (any state) – used as "of X"
 * - billsCount: number of bills this month (any state)  ✅ matches your spec
 * - totalAccounts: number of saved bill accounts
 * - shareOfBalance: remaining / wallet balance (0..1)
 */
insights(balance: number) {
  const accounts = this.accounts();
  const items = this.items();

  const now = new Date();
  const ym = now.toISOString().slice(0, 7); // "YYYY-MM"

  const monthItems = items.filter(i => (i.period || '').startsWith(ym)); // all states
  const unpaid = items.filter(i => i.status === 'UNPAID');

  const remaining = unpaid.reduce((sum, i) => sum + (i.amount || 0), 0);
  const remainingOfMonth = monthItems.reduce((sum, i) => sum + (i.amount || 0), 0);

  // closest due date among unpaid items
  const next = unpaid
    .filter(i => i.dueAt)
    .map(i => new Date(i.dueAt!))
    .sort((a, b) => a.getTime() - b.getTime())[0];

  let nextPayDays: number | undefined;
  if (next) {
    const ms = next.getTime() - now.getTime();
    nextPayDays = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  return {
    nextPayDays,
    nextPayDateISO: next?.toISOString(),
    remaining,
    remainingOfMonth: Math.max(remainingOfMonth, remaining), // avoid "of" < remaining
    billsCount: monthItems.length,           // ✅ total bills this month (any state)
    totalAccounts: accounts.length,
    shareOfBalance: balance > 0 ? remaining / balance : 0
  };
}

}