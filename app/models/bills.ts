export type Frequency = 'ON_BILL' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY' | 'MANUAL';

export interface BillCarrierField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select';
  required?: boolean;
  options?: string[]; // for 'select'
}

export interface BillCarrier {
  id: string;
  name: string;
  logo?: string;
  category: 'UTILITIES' | 'TELECOM' | 'ADMIN' | 'EDU';
  fields: BillCarrierField[]; // base identification fields
}

export interface BillAccount {
  id: string;
  carrierId: string;
  nickname?: string;
  // dynamic identity map (ID client, phone, contract, etc.)
  identity: Record<string, string | number>;
  createdAt: string;
  frequency: Frequency;
  autopay: boolean;
  nextRunAt?: string; // computed for schedules
}

export interface BillItem {
  id: string;
  accountId: string;
  period?: string; // e.g., "2025-07"
  dueAt?: string;
  amount: number;
  currency: string;
  status: 'UNPAID' | 'PAID' | 'FAILED' | 'PENDING';
  meta?: Record<string, any>;
}

export interface BillPayment {
  id: string;
  itemId?: string;
  accountId: string;
  paidAt: string;
  amount: number;
  currency: string;
  method: 'WALLET' | 'CARD';
  receiptUrl?: string; // can be a data: url for mocks
  txRef?: string;
}