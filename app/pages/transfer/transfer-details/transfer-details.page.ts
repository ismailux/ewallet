// src/app/pages/transfer/transfer-details/transfer-details.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import type { OverlayEventDetail } from '@ionic/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonItem, IonLabel, IonInput,
  IonSelect, IonSelectOption, IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton, IonModal, IonAvatar, IonIcon, IonTextarea,
  IonNote, IonSegment, IonSegmentButton, IonGrid, IonRow, IonCol, IonList, IonProgressBar, ModalController
} from '@ionic/angular/standalone';
import { CurrencySelectorComponent } from '../../../components/currency-selector/currency-selector.component';
import { SelectContactComponent } from '../../../components/select-contact/select-contact.component';
import { FieldErrorsComponent } from '../../../components/field-errors/field-errors.component';
import { TransferService, TransferMode, MobileDetails, CashDetails } from '../../../services/transfer.service';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.page.html',
  styleUrls: ['./transfer-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton,
    IonItem, IonLabel, IonInput,
    IonSelect, IonSelectOption,
    IonRadioGroup, IonRadio, IonTextarea, IonNote, IonSegment, IonSegmentButton, IonList,
    IonDatetime, IonDatetimeButton, IonModal, IonAvatar, IonIcon, IonGrid, IonRow, IonCol, IonProgressBar,
    CurrencySelectorComponent, FieldErrorsComponent, 
    SelectContactComponent
  ]
})
export class TransferDetailsPage implements OnInit {
  public mode: TransferMode | null = null;
  public form!: FormGroup;
  public today = new Date().toISOString().split('T')[0];
  //public today = new Date().toISOString();
  public isScheduleModalOpen = false;
  public pickedMode: 'now' | 'date' = 'now'
  public currencies = [
    { code: 'EUR', name: 'Euro', flag: 'assets/icons/flags/eur.svg' },
    { code: 'USD', name: 'US Dollar', flag: 'assets/icons/flags/usd.svg' },
    { code: 'GBP', name: 'British Pound', flag: 'assets/icons/flags/gbp.svg' }
  ];
  public selectedCurrency = this.currencies[1];
  public isContactModalOpen = false;
  public isCurrencyModalOpen = false;
  public transferCategories: string[] = [
    'Refund',
    'Rent',
    'Gift',
    'Shared Expenses',
    'Family',
    'Other'
  ];
  


  constructor(
    private fb: FormBuilder,
    private transferService: TransferService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  ionViewWillEnter(): void {
    // grab the latest mode
    this.mode = this.transferService.getMode();
    if (!this.mode) {
      this.router.navigate(['/tabs/transfer/mode']);
      return;
    }
    // re‐build the form for the current mode
    this.buildForm();
  }

  private buildForm() {
    if (this.mode === 'mobile') {
      this.form = this.fb.group({
        amount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]],
        currency: ['MAD', Validators.required],
        recipient: [null, Validators.required],
        category: ['', Validators.required],
        note: ['', Validators.maxLength(150)],
        scheduleType: ['now', Validators.required],
       // scheduleDate: [this.today, Validators.required],
        scheduleDate: [new Date().toISOString(), Validators.required],
      });
    } else if (this.mode === 'cash') {
      this.form = this.fb.group({
        amount: ['', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]],
        currency: ['MAD', Validators.required],
        pickupLocation: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        idNumber: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.email],
        paymentMethod: ['', Validators.required]
        
      });
    }
  }

  // Mobile: open contact modal
  public onContactModalDismiss(event: OverlayEventDetail<any>) {
    this.isContactModalOpen = false;
    const { data, role } = event;
    if (role === 'confirm' && data) {
      this.form.get('recipient')!.setValue(data);
    }
  }

  // open currency modal
  public async openCurrencyModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CurrencySelectorComponent,
      breakpoints: [0, 0.4, 0.8],
      initialBreakpoint: 0.8,
    });
    await modal.present();

    // now you get the full `onDidDismiss()` payload,
    // with a real IonModal wrapper and scrollable content
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm' && data) {
      this.selectedCurrency = data;
      this.form.get('currency')!.setValue(data.code);
    }
  }

  public onCurrencyModalDismiss(detail: OverlayEventDetail<any>) {
    const { data, role } = detail;
    if (role === 'confirm' && data) {
      this.selectedCurrency = data;
      this.form.get('currency')!.setValue(data.code);
    }
  }

  public handleCurrencyWillDismiss(detail: OverlayEventDetail<any>) {
    // always close the modal
    this.isCurrencyModalOpen = false;

    // then process data if they hit “confirm”
    const { data, role } = detail;
    if (role === 'confirm' && data) {
      this.selectedCurrency = data;
      this.form.get('currency')!.setValue(data.code);
    }
  }

  // Save & go to summary
  public proceed(): void {
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.mode === 'mobile') {
      this.transferService.setMobileDetails(this.form.value as MobileDetails);
    } else {
      this.transferService.setCashDetails(this.form.value as CashDetails);
    }
    this.router.navigate(['/tabs/transfer/summary']);
  }

  openScheduleModal() {
    this.pickedMode = this.form.value.scheduleType;
    this.isScheduleModalOpen = true;
  }

  // WillDismiss handler (in case user drags down or taps backdrop)
  onScheduleDismiss(detail: OverlayEventDetail<any>) {
    this.isScheduleModalOpen = false;
  }

  // User taps “Now”
  selectSchedule(mode: 'now' | 'date') {
    this.form.get('scheduleType')!.setValue(mode);
    this.pickedMode = mode;

    // Immediately close when “Now” is chosen
    if (mode === 'now') {
      this.isScheduleModalOpen = false;
    }
    // if mode==='date', we leave it open so they can pick a date
  }

  // User picks a date from the calendar
  selectDate(ev: any) {
    const iso = ev.detail.value;
    this.form.patchValue({
      scheduleDate: iso,
      scheduleType: 'date'
    });

    // Now that they’ve picked, close the sheet
    this.isScheduleModalOpen = false;
  }

   /** Convenience getters for template */
  get mobile() { return this.form.get('mobile') as FormGroup; }
  get cash()   { return this.form.get('cash') as FormGroup; }
}
