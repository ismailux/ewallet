import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Importez Location
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonList, IonItem, IonLabel, IonFooter, IonAvatar, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonList, IonItem, IonLabel, IonFooter, IonAvatar, DecimalPipe, IonAccordionGroup, IonAccordion],
})
export class ReceiptPage implements OnInit {

  public recipient: any;
  public transferDetails: any;
  public totalAmount: number = 0;
  public today: Date = new Date();


  constructor(private router: Router, private location: Location) {
    const state = this.router.getCurrentNavigation()?.extras.state || this.location.getState() as any;

    console.log('--- Receipt Page: Final state received ---', state);

    if (state && state.recipientDetails) {
      this.recipient = state.recipientDetails;
      this.transferDetails = state.transferDetails;
      if (this.transferDetails && this.transferDetails.step1) {
        this.totalAmount = this.transferDetails.step1.amount;
      }
    }
  }

  ngOnInit() {
    if (!this.transferDetails) {
      console.error('Receipt page: No transfer data found!');
      this.router.navigate(['/tabs/home']);
    }
  }

  done() {
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }
}