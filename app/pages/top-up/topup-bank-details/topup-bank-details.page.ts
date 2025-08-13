// src/app/pages/top-up/topup-bank-details/topup-bank-details.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { copyOutline, warningOutline } from 'ionicons/icons';
import type { Account } from '../../../models/payment';

@Component({
  selector: 'app-topup-bank-details',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton
  ],
  templateUrl: './topup-bank-details.page.html',
  styleUrls: ['./topup-bank-details.page.scss']
})
export class TopupBankDetailsPage implements OnInit {
  public account!: Account;
  public warningOutline = warningOutline;
  public copyOutline    = copyOutline;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    // static random data
    this.account = {
      id: 'wallet-nxf',
      bankName: 'Bank Of Africa',
      bankLogoUrl: 'assets/logos/revolut.png',
      last4: '1821',
      iban: 'MA28 143 2992 97593459532751821',
      bic: 'BOAXXX21',
      beneficiaryName: 'Karim ALAOUI',
      beneficiaryAddress: '123 Bd XXXXX, Casablanca',
      bankAddress: '140 Bd Hassan II, Casablanca 20320',
      messageForRecipient: 'NXF3343455' 
    };
  }

  goBack(): void {
    this.location.back();
  }

  copy(value: string): void {
    navigator.clipboard.writeText(value);
  }

  shareDetails(): void {
    const text =
      `Beneficiary: ${this.account.beneficiaryName}\n` +
      `IBAN: ${this.account.iban}\n` +
      `BIC: ${this.account.bic}\n` +
      `Bank: ${this.account.bankName}, ${this.account.bankAddress}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }
}
