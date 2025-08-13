import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-debit-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './debit-card.component.html',
  styleUrls: ['./debit-card.component.scss']
})
export class DebitCardComponent {
  /** card type label (e.g. "Visa") */
  @Input() type!: string;
  /** one of "blue"|"orange"|"black"|"purple" */
  @Input() colorKey!: string;
  /** cardholder name / description */
  @Input() description!: string;
  /** 16‑digit number string */
  @Input() number!: string;
  /** expiry MM/YY */
  @Input() expiry!: string;
  /** CVV / secret code */
  @Input() secret!: string;
}
