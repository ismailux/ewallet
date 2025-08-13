import { Injectable } from '@angular/core';
import type { Account } from '../models/payment';

@Injectable({ providedIn: 'root' })
export class AccountStoreService {
  /** In‐memory list of user’s linked bank accounts */
  public readonly accounts: Account[] = [
    {
        id: 'boa-1',
        bankName: 'Bank of Africa',
        bankLogoUrl: 'assets/logos/boa.png',
        last4: '9877',
        iban: '',
        bic: '',
        beneficiaryName: '',
        beneficiaryAddress: '',
        bankAddress: '',
        messageForRecipient: ''
    },
    {
        id: 'sg-1',
        bankName: 'Société Générale',
        bankLogoUrl: 'assets/logos/sg.png',
        last4: '1234',
        iban: '',
        bic: '',
        beneficiaryName: '',
        beneficiaryAddress: '',
        bankAddress: '',
        messageForRecipient:''
    }
    // … add more or load them from an API
  ];
}
