import { Injectable } from "@angular/core";
import { Account, Card } from "../models/payment";

// topup-flow.service.ts
@Injectable({ providedIn: 'root' })
export class TopupFlowService {
  private _mode?: 'card' | 'bank';
  private _source?: Card | Account;
  private _amount?: number;

  set(mode: 'card' | 'bank', source: Card | Account, amount: number) {
    this._mode = mode;
    this._source = source;
    this._amount = amount;
  }

  clear() { this._mode = undefined; this._source = undefined; this._amount = undefined; }


  getMode() { return this._mode; }
  getSource() { return this._source; }
  getAmount() { return this._amount; }
}
