import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { QRCodeComponent } from 'angularx-qrcode';
import { addOutline, shareSocialOutline, downloadOutline } from 'ionicons/icons';


@Component({
  selector: 'app-request-qr',
  templateUrl: './request-qr.page.html',
  styleUrls: ['./request-qr.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonButton, QRCodeComponent ],
})
export class RequestQrPage implements OnInit {

  public payer: any;
  public requestDetails: any;
  public qrCodeString: string = '';

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as any;

    if (state && state.payerDetails && state.requestDetails) {
      this.payer = state.payerDetails;
      this.requestDetails = state.requestDetails;

      // On combine toutes les infos en une seule chaîne pour le QR code
      this.qrCodeString = JSON.stringify({
        requestTo: this.payer.name,
        amount: this.requestDetails.amount || 'Not specified',
        message: this.requestDetails.message,
      });
    }
  }

  ngOnInit() {
    if (!this.payer) {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }

  shareQrCode() {
    console.log('Sharing QR Code...');
  }

  downloadQrCode() {
    console.log('Downloading QR Code...');
  }

  shareLink() {
    console.log('Sharing secure link...');
  }

  done() {
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }
}