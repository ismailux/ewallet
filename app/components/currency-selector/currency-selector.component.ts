import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonAvatar ],
})
export class CurrencySelectorComponent implements OnInit {

  public currencies: any[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // Voici la liste des devises que la modale affichera
    this.currencies = [
      { code: 'EUR', name: 'Euro', flag: 'assets/icons/flags/eur.svg' },
      { code: 'USD', name: 'US Dollar', flag: 'assets/icons/flags/usd.svg' },
      { code: 'GBP', name: 'British Pound', flag: 'assets/icons/flags/gbp.svg' },
      { code: 'MAD', name: 'Moroccan Dirham', flag: 'assets/icons/flags/mad.svg' },
      { code: 'AED', name: 'Emirati Dirham', flag: 'assets/icons/flags/aed.svg' },
      { code: 'CAD', name: 'Canadian Dollar', flag: 'assets/icons/flags/cad.svg' },
    ];
  }

  // Cette fonction est appelée lorsqu'on choisit une devise
  selectCurrency(currency: any) {
    // Elle ferme la modale et renvoie la devise sélectionnée
    this.modalCtrl.dismiss(currency, 'confirm');
  }

  // Cette fonction ferme la modale si on annule
  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}