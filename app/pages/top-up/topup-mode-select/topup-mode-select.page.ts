// src/app/pages/top-up/mode-select/top-up-mode-select.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-topup-mode-select',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon],
  templateUrl: './topup-mode-select.page.html',
  styleUrls: ['./topup-mode-select.page.scss']
})
export class TopupModeSelectPage {
  constructor(private router: Router) {}

  /**
   * Navigate to the Details page with the chosen mode.
   * @param mode 'bank' or 'card'
   */
  /*selectMode(mode: 'bank' | 'card'): void {
    this.router.navigate(['/tabs/top-up/details'], {
      state: { mode }
    });
  }*/
selectMode(mode: 'card'|'bank') {
  console.log('[ModeSelect] selecting mode:', mode);
  this.router.navigate(
    mode==='bank'
      ? ['/tabs/top-up/bank-details']
      : ['/tabs/top-up/details'],
    { state: { mode } }
  ).then(() => console.log('[ModeSelect] navigation done'));
}

  public goToRequestMoneyPage(): void {
    this.router.navigate(['/tabs/request-money/']);
  }
}
