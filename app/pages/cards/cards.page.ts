import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonFab, IonFabButton, IonFabList } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CardStoreService } from '../../services/Card-store.service';
import type { Card } from '../../models/payment';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonFab, IonFabButton, IonFabList,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
  ],
})
export class CardsPage implements OnInit {

  public selectedSegment: string = 'physical';
  //public physicalCards: any[] = [];
  //public virtualCards: any[] = [];

  // Variable pour suivre l'état de chargement
  public isAdding: boolean = false;
  // Variable pour la couleur du bouton (optionnel, mais présent dans votre exemple)
  public cardColor: string = 'var(--ion-color-primary)';

  constructor(private location: Location, private cardSvc: CardStoreService) { }

  ngOnInit() {
    /*
        this.physicalCards = [
          {
            brand: 'BANK OF AFRICA',
            number: '1234 6788 2324 9877',
            holderName: 'Karim ALAOUI',
            expiryDate: '05/25',
            type: 'Mastercard', // Changed to Mastercard for clarity
            logo: 'assets/images/Mastercard/logo.png',
            chip: 'assets/images/Mastercard/chip.png',
            bg: 'assets/images/Mastercard/bg.png',
          },
          // NOUVELLE CARTE VISA
          {
            brand: 'SOCIETE GENERALE',
            number: '5355 1234 0000 9999',
            holderName: 'Karim ALAOUI',
            expiryDate: '03/27',
            type: 'VISA', // The type we will check against
            logo: 'assets/images/Visa/visa.svg',
            chip: 'assets/images/Visa/chip.svg',
            contactless: 'assets/images/Visa/contactless.svg',
            bg: 'assets/images/Visa/default.jpg',
          }
        ];
    
        this.virtualCards = [
          {
            bank: 'bank',
            chip: 'assets/images/Visa/chip.png', // Vous devrez fournir ces images
            indicator: 'assets/images/Visa/contactless-indicator.png',
            number: '4100 1234 5678 9010',
            holderName: 'Karim ALAOUI',
            expiryDate: '20/30',
            logo: 'assets/images/Visa/visa.png'
          }
        ];
    */
  }

  get physicalCards(): Card[] {
    return this.cardSvc.physicalCards;
  }
  get virtualCards(): Card[] {
    return this.cardSvc.virtualCards;
  }

  goBack(): void {
    this.location.back();
  }

  segmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
  }

  addCard() {
    // On passe en mode "chargement"
    this.isAdding = true;
    console.log('Adding card...');

    // Simule une opération qui prend 2 secondes
    setTimeout(() => {
      console.log('Card added!');
      // On repasse en mode normal
      this.isAdding = false;
    }, 2000);
  }
}