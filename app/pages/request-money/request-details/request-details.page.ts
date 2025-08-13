import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, 
  IonInput, IonTextarea, IonButton, IonNote, IonProgressBar, IonAvatar, IonModal, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Contact } from '../../../models/contact';     
import { SelectContactComponent } from '../../../components/select-contact/select-contact.component';
import { FieldErrorsComponent } from '../../../components/field-errors/field-errors.component';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, 
    IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonNote, IonProgressBar, IonAvatar, IonModal, IonGrid, IonRow, IonCol, FieldErrorsComponent, SelectContactComponent ],
})
export class RequestDetailsPage implements OnInit {
  public requestForm!: FormGroup;
  public isContactModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    console.log('🔧 [RequestDetails] ngOnInit start');
    this.requestForm = this.fb.group({
      payer: [null as Contact | null, Validators.required],
      amount: [null, [Validators.min(0.01)]],
      message: ['', [Validators.maxLength(150)]]
    });
    console.log('🟢 [RequestDetails] form initialized', this.requestForm.value);

    const nav = this.router.getCurrentNavigation()?.extras.state as any;
    const hist = history.state;
    console.log('🟢 [RequestDetails] nav state:', nav, 'history state:', hist);

    if (nav?.payer || hist?.payer) {
      this.requestForm.patchValue({ payer: nav.payer || hist.payer });
      console.log('🟢 [RequestDetails] restored payer:', this.requestForm.get('payer')?.value);
    }
    if (nav?.requestDetails || hist?.requestDetails) {
      this.requestForm.patchValue(nav.requestDetails || hist.requestDetails);
      console.log('🟢 [RequestDetails] restored details:', this.requestForm.value);
    }
  }

  goBack(): void {
    console.log('🔙 [RequestDetails] goBack called');
    this.location.back();
  }

  openPayerSelector(): void {
    console.log('🟡 [RequestDetails] openPayerSelector');
    this.isContactModalOpen = true;
  }

  onContactModalDismiss(detail: any): void {
    console.log('🟡 [RequestDetails] onContactModalDismiss', detail);
    this.isContactModalOpen = false;
    const selected: Contact = detail.data;
    if (selected) {
      const control = this.requestForm.get('payer');
      if (control) {
        control.setValue(selected);
        console.log('🟡 [RequestDetails] payer set to:', selected);
      }
    }
  }

  sendRequest(): void {
    console.log('🟡 [RequestDetails] sendRequest invoked, form value:', this.requestForm.value);
    if (this.requestForm.invalid) {
      console.warn('⚠️ [RequestDetails] form invalid', this.requestForm.errors, this.requestForm.controls);
      this.requestForm.markAllAsTouched();
      return;
    }
    const { payer, amount, message } = this.requestForm.value;
    console.log('🟡 [RequestDetails] prepared navigation payload:', { payer, amount, message });
    this.router.navigate(['/tabs/request-money/qr'], {
      state: {
        payerDetails:payer,
        requestDetails: { amount, message }
      }
    }).then(success => console.log('🟡 [RequestDetails] navigation success:', success))
      .catch(err => console.error('❌ [RequestDetails] navigation error:', err));
  }
}


