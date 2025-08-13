// src/app/services/card.service.ts

import { Injectable } from '@angular/core';
import type { Card } from '../models/payment';

@Injectable({ providedIn: 'root' })
export class CardStoreService {
  /** Physical cards (as defined in CardsPage) */
  public readonly physicalCards: Card[] = [
    {
        id: 'boa-1',
        brand: 'BANK OF AFRICA',
        last4: '9877',
        expiryMonth: 5,
        expiryYear: 2025,
        expiryDate: '05/2026',
        type: 'Mastercard',
        number: '1234 6788 2324 9877',
        bank: 'BANK OF AFRICA',
        logo: 'assets/images/Mastercard/logo.png',
        chip: 'assets/images/Mastercard/chip.png',
        logoIcon : 'assets/images/Mastercard/icon_mastercard.svg',
        bg: 'assets/images/Mastercard/bg.png',
        holderName: 'KARIM ALAOUI',
        indicator: ''
    },
    {
        id: 'sg-1',
        brand: 'SOCIETE GENERALE',
        last4: '9999',
        expiryMonth: 3,
        expiryYear: 2027,
        logo: 'assets/images/Visa/visa.svg',
        chip: 'assets/images/Visa/chip.svg',
        logoIcon : 'assets/images/Visa/icon_visa.svg',
        bg: 'assets/images/Visa/default.jpg',
        number: '1234 5678 1245 3456',
        holderName: 'KARIM ALAOUI',
        expiryDate: '12/2029',
        bank: 'SOCIETE GENERALE',
        type: 'VISA',
        indicator: ''
    }
  ];


  /** Virtual cards (as defined in CardsPage) */
  public readonly virtualCards: Card[] = [
    {
        id: 'virt-1',
        brand: 'VIRTUAL BANK',
        last4: '9010',
        expiryMonth: 12,
        expiryYear: 2030,
        logo: 'assets/images/Visa/visa.png',
        chip: 'assets/images/Visa/chip.png',
        logoIcon : 'assets/images/Visa/icon_visa.svg',
        bg: '',
        number: '0000 0000 0000 0000',
        holderName: 'KARIM ALAOUI',
        expiryDate: '02/2026',
        bank: 'NEXFING',
        type: 'VISA',
        indicator: 'assets/images/Visa/contactless-indicator.png'
    }
  ];

  constructor() {}
}
