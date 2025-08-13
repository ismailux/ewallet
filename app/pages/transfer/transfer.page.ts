import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonAvatar,
  IonRadioGroup,
  IonRadio,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonIcon, 
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

import { MatStepperModule }       from '@angular/material/stepper';
import { MatFormFieldModule }     from '@angular/material/form-field';
import { MatInputModule }         from '@angular/material/input';
import { MatButtonModule }        from '@angular/material/button';
import { MatIconModule }          from '@angular/material/icon';
import { MatSelectModule }        from '@angular/material/select';
import { MatOptionModule }        from '@angular/material/core';

import { ModalController }        from '@ionic/angular/standalone';
import { CurrencySelectorComponent } from '../../components/currency-selector/currency-selector.component';
import { SelectContactComponent } from '../../components/select-contact/select-contact.component';
import { walletOutline, cashOutline, homeOutline, chevronDownOutline } from 'ionicons/icons';
import { Contact } from '../../models/contact';

type TransferMode = 'mobile' | 'cash' | 'direct';

interface Mode {
  value: TransferMode;
  label: string;
  icon: any;
}

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton,
    IonGrid, IonRow, IonCol, IonCard,
    IonItem, IonLabel, IonInput, IonCheckbox,
    IonSelect, IonSelectOption, IonAvatar,
    IonRadioGroup, IonRadio,
    IonDatetime, IonDatetimeButton, IonModal,
    IonIcon, IonCardHeader, IonCardTitle, IonCardContent,
    MatStepperModule, MatFormFieldModule,
    MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule, MatOptionModule,
    CurrencySelectorComponent,
    SelectContactComponent
  ]
})
export class TransferPage implements OnInit {

  /** Bound in the template for the minimum selectable date */
  public today: string = new Date().toISOString().split('T')[0];
  
  // Step 1: mode selector
  public modes: Mode[] = [
    { value: 'mobile', label: 'Mobile Money',   icon: walletOutline },
    { value: 'cash',   label: 'Cash Pickup',     icon: cashOutline  },
    { value: 'direct', label: 'Direct to Bank',  icon: homeOutline  }
  ];

  // Step 1 & 2 form groups
  public transferForm: FormGroup;

  // For Mobile branch
  public recipient: Contact | null = null;
  public currencies = [
    { code: 'EUR', name: 'Euro', flag: 'assets/icons/flags/eur.svg' },
    { code: 'USD', name: 'US Dollar', flag: 'assets/icons/flags/usd.svg' },
    { code: 'GBP', name: 'British Pound', flag: 'assets/icons/flags/gbp.svg' }
  ];
  public selectedCurrency = this.currencies[1];

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private router: Router,
    private location: Location
  ) {
    this.transferForm = this.fb.group({
      // Step 1: choose mode
      step0: this.fb.group({
        mode: ['', Validators.required]
      }),
      // Step 2: amount & currency (same as old step1)
      step1: this.fb.group({
        amount: [
          '',
          [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]
        ],
        currency: ['USD', Validators.required]
      }),
      // ===== Mobile nested =====
      stepMobileRecipient: this.fb.group({
        recipient: [null, Validators.required]
      }),
      step2: this.fb.group({ category: ['', Validators.required] }),
      step3: this.fb.group({
        note: ['', Validators.maxLength(150)]
      }),
      step4: this.fb.group({
        scheduleType: ['now', Validators.required],
        scheduleDate: [
          new Date().toISOString().split('T')[0],
          Validators.required
        ]
      }),
      // ===== Cash nested =====
      stepCashConfirmAmount: this.fb.group({
        confirm: [false, Validators.requiredTrue]
      }),
      stepCashLocation: this.fb.group({
        pickupLocation: ['', Validators.required]
      }),
      stepCashContact: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        idNumber: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.email]
      }),
      stepCashPayment: this.fb.group({
        paymentMethod: ['', Validators.required]
      })
      // Direct-to-bank to be added later...
    });
  }

  ngOnInit() {
    // Reset form on load
    this.transferForm.reset({
      step0: { mode: '' },
      step1: { amount: '', currency: 'USD' }
    });
    this.recipient = null;
  }

  // ----- getters for strong typing -----
  get step0()                 { return this.transferForm.get('step0')               as FormGroup; }
  get step1()                 { return this.transferForm.get('step1')               as FormGroup; }
  get stepMobileRecipient()   { return this.transferForm.get('stepMobileRecipient') as FormGroup; }
  get step2()                 { return this.transferForm.get('step2')               as FormGroup; }
  get step3()                 { return this.transferForm.get('step3')               as FormGroup; }
  get step4()                 { return this.transferForm.get('step4')               as FormGroup; }
  get stepCashConfirmAmount() { return this.transferForm.get('stepCashConfirmAmount') as FormGroup; }
  get stepCashLocation()      { return this.transferForm.get('stepCashLocation')      as FormGroup; }
  get stepCashContact()       { return this.transferForm.get('stepCashContact')       as FormGroup; }
  get stepCashPayment()       { return this.transferForm.get('stepCashPayment')       as FormGroup; }

  // Mobile: launch contact-picker modal
  async openSelectContact() {
    const m = await this.modalCtrl.create({
      component: SelectContactComponent
    });
    await m.present();
    const { data, role } = await m.onDidDismiss<Contact>();
    if (role === 'confirm' && data) {
      this.recipient = data;
      this.stepMobileRecipient.get('recipient')!.setValue(data);
    }
  }

  // Mobile: launch currency selector
  async openCurrencyModal() {
    const m = await this.modalCtrl.create({
      component: CurrencySelectorComponent,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
    await m.present();
    const { data, role } = await m.onWillDismiss<any>();
    if (role === 'confirm') {
      this.selectedCurrency = data;
      this.step1.get('currency')!.setValue(data.code);
    }
  }

  // Mark controls as touched to show errors
  public validateStep(form: FormGroup) {
    form.markAllAsTouched();
  }

  // After Step 2, branch into nested Mobile or Cash flows
  public proceedFromAmount(stepper: any) {
    const mode: TransferMode = this.step0.get('mode')!.value;
    if (mode === 'mobile' || mode === 'cash') {
      stepper.next();
    }
    // else Direct-to-bank later...
  }

  // Final “Send” in Mobile flows → TransferSummary
  public sendMobile() {
    // touch all mobile groups
    [ this.stepMobileRecipient, this.step2, this.step3, this.step4 ]
      .forEach(g => g.markAllAsTouched());
    if (
      this.stepMobileRecipient.invalid ||
      this.step2.invalid ||
      this.step3.invalid ||
      this.step4.invalid
    ) return;

    const payload = {
      mode: 'Mobile Money',
      recipient: this.recipient,
      amountInfo: this.step1.value,
      category:  this.step2.value.category,
      note:      this.step3.value.note,
      schedule:  this.step4.value
    };
    this.router.navigate(['/tabs/transfer-summary'], { state: payload });
  }

  // Final “Send” in Cash flows → TransferSummary
  public sendCash() {
    [ this.stepCashConfirmAmount,
      this.stepCashLocation,
      this.stepCashContact,
      this.stepCashPayment
    ].forEach(g => g.markAllAsTouched());
    if (
      this.stepCashConfirmAmount.invalid ||
      this.stepCashLocation.invalid ||
      this.stepCashContact.invalid ||
      this.stepCashPayment.invalid
    ) return;

    const payload = {
      mode: 'Cash Pickup',
      amountInfo: this.step1.value,
      location:   this.stepCashLocation.value.pickupLocation,
      contact:    this.stepCashContact.value,
      payment:    this.stepCashPayment.value.paymentMethod
    };
    this.router.navigate(['/tabs/transfer-summary'], { state: payload });
  }
}
