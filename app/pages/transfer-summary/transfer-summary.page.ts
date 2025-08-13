import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonBackButton, IonButtons, IonButton, IonList, IonItem, IonLabel, IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transfer-summary',
  templateUrl: './transfer-summary.page.html',
  styleUrls: ['./transfer-summary.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonBackButton, IonButtons, IonButton, IonList, IonItem, IonLabel, IonFooter, DecimalPipe ],
})
export class TransferSummaryPage implements OnInit {

  public transferData: any;
  public recipient: any;
  public transferDetails: any;
  public totalAmount: number = 0;
  public today: Date = new Date();

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    this.transferData = navigation?.extras?.state;
  }

  ngOnInit() {
    if (this.transferData) {
      this.recipient = this.transferData.recipientDetails;
      this.transferDetails = this.transferData.transferDetails;
      // On calcule le montant total (pour l'instant, juste le montant car les frais sont "Free")
      this.totalAmount = this.transferDetails.step1.amount;
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToConfirmPin(): void {
    // On passe les données à la page suivante
    this.router.navigate(['/tabs/confirm-pin'], {
      state: this.transferData
    });
  }
}