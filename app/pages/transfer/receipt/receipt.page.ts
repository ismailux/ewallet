import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonAvatar,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { TransferService, TransferMode, MobileDetails, CashDetails } from '../../../services/transfer.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonAvatar,
    DecimalPipe,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel
    ],
})
export class ReceiptPage implements OnInit {
  public mode: TransferMode | null = null;
  public mobileDetails: MobileDetails | null = null;
  public cashDetails: CashDetails | null = null;
  public totalAmount = 0;
  public today = new Date();

  constructor(
    private router: Router,
    private location: Location,
    private transferSvc: TransferService
  ) {
    // Try to pull state from navigation first, then fallback to service
    const nav = this.router.getCurrentNavigation()?.extras.state as any;
    if (nav?.transferDetails) {
      // now transferDetails is exactly the form.value object from TransferDetailsPage
      this.mode = nav.transferDetails.recipient ? 'mobile' : 'cash';
      if (this.mode === 'mobile') {
        this.mobileDetails = nav.transferDetails as MobileDetails;
      } else {
        this.cashDetails = nav.transferDetails as CashDetails;
      }
    }

  }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation()?.extras.state as any;
    const transferDetails = nav?.transferDetails;

    // Optional fallback from TransferService
    const fallback = this.transferSvc.getMobileDetails() || this.transferSvc.getCashDetails();
    const details = transferDetails || fallback;

    if (details?.recipient) {
      this.mode = 'mobile';
      this.mobileDetails = details;
    } else {
      this.mode = 'cash';
      this.cashDetails = details;
    }

    // Compute total
    if (this.mode === 'mobile' && this.mobileDetails) {
      this.totalAmount = this.mobileDetails.amount;
    } else if (this.mode === 'cash' && this.cashDetails) {
      this.totalAmount = this.cashDetails.amount;
    }

  }

  done() {
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }

}
