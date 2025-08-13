import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonProgressBar, IonIcon, IonList, 
  IonItem, IonLabel, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Account, Card} from 'src/app/models/payment';
import { TopupFlowService } from 'src/app/services/topup-flow.service';

@Component({
  selector: 'app-topup-receipt',
  templateUrl: './topup-receipt.page.html',
  styleUrls: ['./topup-receipt.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonProgressBar, IonIcon, IonList, 
    IonItem, IonLabel, IonAccordion, IonAccordionGroup, CommonModule, FormsModule]
})

export class TopupReceiptPage implements OnInit {
  public mode!: 'card' | 'bank';
  public source!: Card | Account;
  public amount!: number;
  public sourceLabel = '';
  public today = new Date();

  constructor(private router: Router, private flow: TopupFlowService) {
    const nav = this.router.getCurrentNavigation()?.extras.state as any;
    console.log('[Receipt] nav state:', nav);

    if (nav?.mode && nav?.source && typeof nav?.amount === 'number') {
      this.mode = nav.mode;
      this.source = nav.source;
      this.amount = nav.amount;
    } else {
      // fallback to service
      this.mode = this.flow.getMode() as any;
      this.source = this.flow.getSource() as any;
      this.amount = this.flow.getAmount() as any;
    }
  }

  ngOnInit(): void {
    if (!this.mode || !this.source || typeof this.amount !== 'number') {
      console.warn('[Receipt] Missing data → redirecting to mode');
      this.router.navigate(['/tabs/top-up/mode']);
    }

    // Build a safe label for the funding source
  if (this.mode === 'card') {
    const s: any = this.source;
    this.sourceLabel = `${s.brand ?? s.bank ?? 'Card'} •••• ${s.last4 ?? ''}`;
  } else {
    const s: any = this.source;
    this.sourceLabel = `${s.bankName ?? 'Bank'} •••• ${s.last4 ?? ''}`;
  }
  }

  done() { this.router.navigate(['/tabs/home'], { replaceUrl: true }); }
}
