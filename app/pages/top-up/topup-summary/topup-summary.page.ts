import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonProgressBar,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/angular/standalone';
import type { Card, Account } from '../../../models/payment';
import { TopupFlowService } from '../../../services/topup-flow.service';
import { ConfirmPinService } from '../../../services/confirm-pin.service';

@Component({
  selector: 'app-topup-summary',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonProgressBar,
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ],
  templateUrl: './topup-summary.page.html',
  styleUrls: ['./topup-summary.page.scss']
})
export class TopupSummaryPage implements OnInit {
  public mode?: 'card' | 'bank';
  public source?: Card | Account;
  public amount?: number;
  public today = new Date();
  public sourceLabel = '';


  constructor(
    private router: Router,
    private location: Location,
    private flow: TopupFlowService,
    private confirmPin: ConfirmPinService
  ) {
    const nav = this.router.getCurrentNavigation()?.extras.state as any;
    const hist = history.state as any;
    console.log('[Summary] constructor nav state:', nav);
    console.log('[Summary] constructor history.state:', hist);

    this.mode = nav?.mode ?? hist?.mode;
    this.source = nav?.source ?? hist?.source;
    this.amount = nav?.amount ?? hist?.amount;
    console.log('[Summary] resolved mode, source, amount:', this.mode, this.source, this.amount);

    // compute label safely
    if (this.mode === 'card' && this.isCard(this.source)) {
      this.sourceLabel = `${this.source.brand} •••• ${this.source.last4}`;
    } else if (this.mode === 'bank' && this.isAccount(this.source)) {
      this.sourceLabel = `${this.source.bankName} •••• ${this.source.last4}`;
    }

    this.mode = nav?.mode ?? hist?.mode;
    this.source = nav?.source ?? hist?.source;
    this.amount = nav?.amount ?? hist?.amount;

    // compute label safely
    if (this.mode === 'card' && this.isCard(this.source)) {
      this.sourceLabel = `${this.source.brand} •••• ${this.source.last4}`;
    } else if (this.mode === 'bank' && this.isAccount(this.source)) {
      this.sourceLabel = `${this.source.bankName} •••• ${this.source.last4}`;
    }

  }

  ngOnInit(): void {
    console.log('[Summary] ngOnInit mode, source, amount:', this.mode, this.source, this.amount);
    this.mode = this.flow.getMode();
    this.source = this.flow.getSource();
    this.amount = this.flow.getAmount();
    if (!this.mode || !this.source || this.amount == null) {
      console.warn('[Summary] missing data, redirecting back');
      this.router.navigate(['/tabs/top-up/mode']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  async onConfirmClick() {
    try {
      const pin = await this.confirmPin.prompt();
      console.log('✅ PIN entered:', pin);

      const mode = this.mode;
      const source = this.source;
      const amount = this.amount;

      console.log('[TopupSummary] Confirm PIN OK → navigating', { mode, source, amount });

      this.router.navigate(['/tabs/top-up/receipt'], {
        state: { mode, source, amount }
      });
    } catch {
      // user cancelled; stay here or show an alert
      console.warn('❌ PIN entry cancelled');
    }
  }

  private isCard(obj: any): obj is Card {
    return !!obj && (obj as Card).brand !== undefined;
  }

  private isAccount(obj: any): obj is Account {
    return !!obj && (obj as Account).bankName !== undefined;
  }
}