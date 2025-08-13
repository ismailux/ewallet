import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonAvatar, IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';

// Imports pour le Stepper
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { ModalController } from '@ionic/angular/standalone';
import { CurrencySelectorComponent } from '../../components/currency-selector/currency-selector.component';


@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.page.html',
  styleUrls: ['./send-money.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons,
    IonBackButton, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonAvatar, 
    MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatOptionModule,
    CurrencySelectorComponent,
    IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton, IonModal
  ],
})
export class SendMoneyPage implements OnInit {

  public recipient: any;
  public transferForm: FormGroup;
  public today: string = new Date().toISOString();
  public currencies: any[] = [
    { code: 'EUR', name: 'Euro', flag: 'assets/icons/flags/eur.svg' },
    { code: 'USD', name: 'US Dollar', flag: 'assets/icons/flags/usd.svg' },
    { code: 'GBP', name: 'British Pound', flag: 'assets/icons/flags/gbp.svg' },
    { code: 'MAD', name: 'Moroccan Dirham', flag: 'assets/icons/flags/mad.svg' },
    { code: 'CAD', name: 'Canadian Dollar', flag: 'assets/icons/flags/cad.svg' },
    { code: 'AED', name: 'Emirati Dirham', flag: 'assets/icons/flags/aed.svg' }
  ];
  public selectedCurrency: any;

  public transferCategories: string[] = [
    'Refund',
    'Rent',
    'Gift',
    'Shared Expenses',
    'Family',
    'Other'
  ];

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.recipient = navigation?.extras?.state?.['recipientDetails'];

    this.selectedCurrency = this.currencies.find(c => c.code === 'USD');

    this.transferForm = this.fb.group({
      step1: this.fb.group({
        amount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]],
        currency: ['USD', Validators.required]
      }),
      step2: this.fb.group({
        category: ['', Validators.required]
      }),
      step3: this.fb.group({
        note: ['', Validators.maxLength(150)]
      }),
      step4: this.fb.group({
        scheduleType: ['now', Validators.required],
        scheduleDate: [new Date().toISOString().split('T')[0], Validators.required]
        //scheduleDate: [new Date(), Validators.required]
      }),
    });

  }

  ngOnInit() {
    if (!this.recipient) {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }

  async openCurrencyModal() {
    const modal = await this.modalCtrl.create({
      component: CurrencySelectorComponent,
      // Vous pouvez ajouter des breakpoints pour un affichage "feuille"
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
    });
    await modal.present();

    // On récupère la donnée quand la modale est fermée
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.selectedCurrency = data;
      // On met à jour la valeur dans notre formulaire
      this.step1.get('currency')?.setValue(data.code);
    }
  }

  // On corrige les getters pour garantir qu'ils ne sont jamais null
  get step1() { return this.transferForm.get('step1') as FormGroup; }
  get step2() { return this.transferForm.get('step2') as FormGroup; }
  get step3() { return this.transferForm.get('step3') as FormGroup; }
  get step4() { return this.transferForm.get('step4') as FormGroup; }

  public validateStep(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
  }


  sendMoney(): void {
    this.transferForm.markAllAsTouched(); // Valide tous les champs
    if (this.transferForm.valid) {

      const dataToSend = {
      recipientDetails: this.recipient,
      transferDetails: this.transferForm.value
    };
      console.log('Final Data:', this.transferForm.value);

          console.log('--- Send Money Page: Sending data ---', dataToSend);

      this.router.navigate(['/tabs/transfer-summary'], {
        state: {
          recipientDetails: this.recipient,
          transferDetails: this.transferForm.value
        }
      });
    }
  }
}