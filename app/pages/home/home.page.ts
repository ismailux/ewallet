import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgClass, NgFor, NgIf, DecimalPipe } from '@angular/common';
import { IonHeader, IonToolbar, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonAvatar, IonText, IonLabel, IonButton,
  IonCard,IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BillsService } from '../bills/../../services/bills.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonAvatar, IonText, IonLabel, IonButton,
    IonCard,IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    NgClass, NgFor, NgIf, DecimalPipe, DatePipe
  ],
})
export class HomePage {

  private balance = 21350.54;
  private billsInsightsData: ReturnType<BillsService['insights']> | undefined;

  private _isBalanceVisible: boolean = true;
  private _math = Math;
  private _transactions: any[] = [
    {
      logo: 'assets/icons/shopping.svg',
      name: 'Adidas Store Paris',
      date: '30 June',
      category: 'Shopping',
      amount: -85.50
    },
    {
      logo: 'assets/icons/transfer-in.svg',
      name: 'Refund',
      date: '28 June',
      category: 'Incomming funds',
      amount: 1200.00
    },
    {
      logo: 'assets/icons/groceries.svg',
      name: 'Carrefour Express',
      date: '27 June',
      category: 'Groceries',
      amount: -22.30
    },
    {
      logo: 'assets/icons/merchant_online.svg',
      name: 'Netflix Subscription',
      date: '27 June',
      category: 'Online Payment',
      amount: -15.99
    },
    {
      logo: 'assets/icons/groceries.svg',
      name: 'La grande Pharmacie',
      date: '26 June',
      category: 'Medicine',
      amount: -5.40
    },
  ];

  constructor(private router: Router, private bills: BillsService) { }

  ngOnInit() {
    this.refreshInsights();
  }

  ionViewWillEnter() {
    // refresh when returning from Bills pages
    this.refreshInsights();
  }

  private refreshInsights() {
    this.billsInsightsData = this.bills.insights(this.balance);
  }

  public get isBalanceVisible(): boolean {
    return this._isBalanceVisible;
  }

  public get math(): Math {
    return this._math;
  }

  public get transactions(): any[] {
    return this._transactions;
  }

  public toggleBalanceVisibility(): void {
    this._isBalanceVisible = !this._isBalanceVisible;
  }

  getIconForCategory(category: string): string {
    const basePath = 'assets/icons/transaction_icons/';

    switch (category) {
      case 'Shopping':
        return basePath + 'shopping.svg';
      case 'Incomming funds':
        return basePath + 'transfer-in.svg';
      case 'Transfers':
        return basePath + 'transfer-out.svg';
      case 'Groceries':
        return basePath + 'groceries.svg';
      case 'Online Payment':
        return basePath + 'merchant_online.svg';
      case 'Medicine':
        return basePath + 'medicine.svg';
      default:
        return basePath + 'default.svg';
    }
  }

  public goToTransferPage(): void {
    this.router.navigate(['/tabs/transfer']);
  }

  public goToRequestMoneyPage(): void {
    this.router.navigate(['/tabs/request-money/']);
  }

  public goTransactionsPage(): void {
    this.router.navigate(['/tabs/transactions/']);
  }

  public goToTopUpPage(): void {
    this.router.navigate(['/tabs/top-up/']);
  }

  public goBillsPage(): void {
    this.router.navigate(['/tabs/bill']);
  }

  get balanceValue(): number {
    return this.balance;
  }

  get insights() {
    return this.billsInsightsData;
  }

  get nextPayDays(): number | undefined {
    return this.billsInsightsData?.nextPayDays;
  }

  get nextPayDate(): string | undefined {
    return this.billsInsightsData?.nextPayDateISO;
  }

  get remaining(): number {
    return this.billsInsightsData?.remaining ?? 0;
  }

  get remainingOfMonth(): number {
    return this.billsInsightsData?.remainingOfMonth ?? 0;
  }

  get billsCount(): number {
    return this.billsInsightsData?.billsCount ?? 0;
  }

  get totalAccounts(): number {
    return this.billsInsightsData?.totalAccounts ?? 0;
  }

  get shareOfBalancePercent(): number {
    return (this.billsInsightsData?.shareOfBalance ?? 0) * 100;
  }


}