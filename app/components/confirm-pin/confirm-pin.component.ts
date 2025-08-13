import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonIcon, IonBackButton
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { backspaceOutline, arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-confirm-pin',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonIcon, IonBackButton
  ],
  templateUrl: './confirm-pin.component.html',
  styleUrls: ['./confirm-pin.component.scss']
})
export class ConfirmPinComponent {
  @Output() confirmed = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<void>();

  /** Current PIN value (masked visually) */
  public pin = '';
  /** What the template renders inside the 4 boxes */
  public pinDigits: string[] = ['', '', '', ''];

  arrowBack = arrowBack;

  constructor(private modalCtrl: ModalController) {
      addIcons({backspaceOutline});}

  /** Close the modal (cancel) */
  onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
    this.canceled.emit();
  }

  /** Confirm if 4 digits entered */
  onConfirm(): void {
    if (this.pin.length === 4) {
      this.modalCtrl.dismiss({ pin: this.pin }, 'confirm');
      this.confirmed.emit(this.pin);
    }
  }

  /** Handle keypad press */
  onNumberPress(digit: string): void {
    // Enforce numeric PIN (drop the '*' key entirely if not needed)
    if (!/^[0-9]$/.test(digit)) return;

    if (this.pin.length < 4) {
      this.pin += digit;
      this.syncDigits(/*mask=*/true);
      // If you prefer auto-confirm after last digit, uncomment:
      // if (this.pin.length === 4) this.onConfirm();
    }
  }

  /** Backspace one digit */
  onBackspace(): void {
    if (!this.pin.length) return;
    this.pin = this.pin.slice(0, -1);
    this.syncDigits(/*mask=*/true);
  }

  /**
   * Update visual digits array from current pin.
   * If mask=true, show bullets; else show actual digits.
   */
  private syncDigits(mask = true): void {
    this.pinDigits = Array.from({ length: 4 }, (_, i) => {
      const ch = this.pin[i];
      if (!ch) return '';
      return mask ? '•' : ch;
    });
  }
}
