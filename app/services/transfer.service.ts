// src/app/services/transfer.service.ts
import { Injectable } from '@angular/core';

export type TransferMode = 'mobile' | 'cash' | 'bank';

export interface MobileDetails {
  amount: number;
  currency: string;
  recipient: any;
  category: string;
  note: string;
  scheduleType: 'now' | 'date';
  scheduleDate: string;
}
export interface CashDetails {
  amount: number;
  currency: string;
  pickupLocation: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  city: string;
  phone: string;
  email?: string;
  paymentMethod: string;
}

@Injectable({ providedIn: 'root' })
export class TransferService {
  private mode: TransferMode | null = null;
  private mobileDetails: MobileDetails | null = null;
  private cashDetails: CashDetails | null = null;

  setMode(m: TransferMode) { this.mode = m; }
  getMode(): TransferMode | null { return this.mode; }

  setMobileDetails(d: MobileDetails) { this.mobileDetails = d; }
  getMobileDetails(): MobileDetails | null { return this.mobileDetails; }

  setCashDetails(d: CashDetails) { this.cashDetails = d; }
  getCashDetails(): CashDetails | null { return this.cashDetails; }
}
