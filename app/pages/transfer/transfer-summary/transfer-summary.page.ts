import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonProgressBar
} from '@ionic/angular/standalone';

import {
  TransferService,
  TransferMode,
  MobileDetails,
  CashDetails
} from '../../../services/transfer.service';

@Component({
  selector: 'app-transfer-summary',
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
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonProgressBar
  ],
  templateUrl: './transfer-summary.page.html',
  styleUrls: ['./transfer-summary.page.scss']
})
export class TransferSummaryPage implements OnInit {
  public mode!: TransferMode;
  public mobileDetails: MobileDetails | null = null;
  public cashDetails: CashDetails | null = null;
  public transferData: any;
  public today = new Date();
  public transferDetails: any;

  constructor(
    private transferService: TransferService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    // grab the mode
    this.mode = this.transferService.getMode()!;

    if (this.mode === 'mobile') {
      this.mobileDetails = this.transferService.getMobileDetails();
      if (!this.mobileDetails) {
        this.router.navigate(['/tabs/transfer/mode']);
        return;               // void return
      }
    }
    else if (this.mode === 'cash') {
      this.cashDetails = this.transferService.getCashDetails();
      if (!this.cashDetails) {
        this.router.navigate(['/tabs/transfer/mode']);
        return;
      }
    }
    else {
      // no mode at all
      this.router.navigate(['/tabs/transfer/mode']);
      return;
    }

  }

  goBack(): void {
    this.location.back();
  }

  goToConfirmPin(): void {
    const transferDetails = this.mode === 'mobile'
      ? this.mobileDetails
      : this.cashDetails;
    this.router.navigate(['/tabs/transfer/confirm-pin'], {
      state: { transferDetails }
    });
  }
  ionViewWillEnter() {
    console.log('🔵 [Summary] ionViewWillEnter (view about to appear)');
  }
}
