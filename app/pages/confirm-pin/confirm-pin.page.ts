import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonBackButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.page.html',
  styleUrls: ['./confirm-pin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonBackButton, IonGrid, IonRow, IonCol],
})
export class ConfirmPinPage implements OnInit{

  public transferData: any;
  public pin: string = '';
  public pinDigits: string[] = ['', '', '', ''];

  constructor(private navCtrl: NavController, private router: Router, private location: Location) {

    const navigation = this.router.getCurrentNavigation();
    this.transferData = navigation?.extras?.state;

    // VÉRIFICATION 2 : On vérifie ce qu'on reçoit
    console.log('--- Confirm PIN Page: Received data ---', this.transferData);

   }

  ngOnInit() {
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
      console.log('Confirming Transfer with data:', this.transferData);

            console.log('--- Confirm PIN Page: Forwarding data ---', this.transferData);

      this.router.navigate(['/tabs/receipt'], {
        state: this.transferData
      });
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}