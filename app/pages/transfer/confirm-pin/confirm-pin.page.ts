import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonBackButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { CashDetails, MobileDetails, TransferMode, TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.page.html',
  styleUrls: ['./confirm-pin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonBackButton, IonGrid, IonRow, IonCol],
})
export class ConfirmPinPage implements OnInit {
  public mode!: TransferMode;
  public mobileDetails: MobileDetails | null = null;
  public cashDetails: CashDetails | null = null;
  public totalAmount = 0;
  public today = new Date();
  public pin: string = '';
  public pinDigits: string[] = ['', '', '', ''];
  public transferDetails: any;


  constructor(
    private router: Router,
    private transferSvc: TransferService
  ) {
    console.log('🟠 [ConfirmPin] constructor — navigation extras:',
      this.router.getCurrentNavigation()?.extras);
  }

  ngOnInit(): void {
    // 1) Try to pull the transferDetails from Navigation State
    const nav = this.router.getCurrentNavigation()?.extras.state as any;

    // 2) Fallback to whatever was saved in the service
    const fallback = this.transferSvc.getMobileDetails() || this.transferSvc.getCashDetails();

    // 3) Use whichever exists
    const details = nav?.transferDetails || fallback;
    if (!details) {
      // Nothing to show — go back to start
      this.router.navigate(['/tabs/transfer/mode']);
      return;
    }

    // 4) Assign mode and details
    if ((details as MobileDetails).recipient) {
      this.mode = 'mobile';
      this.mobileDetails = details as MobileDetails;
      this.totalAmount = this.mobileDetails.amount;
    } else {
      this.mode = 'cash';
      this.cashDetails = details as CashDetails;
      this.totalAmount = this.cashDetails.amount;
    }
  }

  ionViewWillEnter() {
    console.log('🔵 [ConfirmPin] ionViewWillEnter — view is now active');
  }



  onNumberPress(digit: string) {
    if (this.pin.length < 4) {
      this.pin += digit;
      this.pinDigits[this.pin.length - 1] = '*';
    }
  }

  onBackspace() {
    if (this.pin.length > 0) {
      this.pin = this.pin.slice(0, -1);
      this.pinDigits[this.pin.length] = '';
    }
  }

  onConfirm(): void {
    if (this.pin.length === 4) {
      console.log('PIN Entered:', this.pin);
      this.router.navigate(['/tabs/transfer/receipt'], {
        state: { transferDetails: this.transferDetails }
      });

    }
  }

  public onPinError(err: any) {
    console.warn('⚠️ [ConfirmPin] PIN error:', err);
  }
}
