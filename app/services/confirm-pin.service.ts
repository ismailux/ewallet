// src/app/services/confirm-pin.service.ts

import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';
import { ConfirmPinComponent } from '../components/confirm-pin/confirm-pin.component';

@Injectable({ providedIn: 'root' })
export class ConfirmPinService {
  constructor(private modalCtrl: ModalController) {}

  /**
   * Presents the Confirm PIN modal and resolves with the entered PIN.
   * If the user cancels or closes the modal without confirming,
   * the returned Promise will reject.
   */
  async prompt(): Promise<string> {
    const modal = await this.modalCtrl.create({
      component: ConfirmPinComponent,
      backdropDismiss: false
    });

    await modal.present();

    const { data }: OverlayEventDetail<{ pin: string }> =
      await modal.onDidDismiss();

    if (!data?.pin) {
      // User cancelled or dismissed without entering a full PIN
      throw new Error('PIN entry cancelled');
    }

    return data.pin;
  }
}
