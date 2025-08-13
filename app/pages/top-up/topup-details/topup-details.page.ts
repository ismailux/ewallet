import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel,
  IonInput, IonButton, IonModal, IonProgressBar, IonIcon, IonAvatar, IonChip
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import { Account, Card } from '../../../models/payment';
import { AccountSelectorComponent } from '../../../components/account-selector/account-selector.component';
import { CardSelectorComponent } from '../../../components/card-selector/card-selector.component';
import { FieldErrorsComponent } from 'src/app/components/field-errors/field-errors.component';
import { CardStoreService } from '../../../services/Card-store.service';
import {TopupFlowService} from '../../../services/topup-flow.service'

@Component({
  selector: 'app-topup-details',
  standalone: true,
  imports: [
    CommonModule,  
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel,
    IonInput, IonButton, IonModal, IonProgressBar, IonIcon, IonAvatar, IonChip,
    AccountSelectorComponent, CardSelectorComponent, FieldErrorsComponent
  ],
  templateUrl: './topup-details.page.html',
  styleUrls: ['./topup-details.page.scss']
})
export class TopupDetailsPage implements OnInit {
  public form!: FormGroup;
  public mode!: 'bank' | 'card';
  public isSelectorOpen = false;

  // In-memory placeholder; swap for API calls if needed
  private _availableAccounts: Account[] = [];
  private _availableCards: Card[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private cardStore: CardStoreService,
    private flow: TopupFlowService 
  ) { }

  /**
   * Build the form and restore navigation state.
   */
  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation()?.extras.state as any;
    this.mode = nav?.mode || (history.state as any)?.mode;
    if (this.mode !== 'bank' && this.mode !== 'card') {
      this.router.navigate(['/tabs/top-up/mode']);
      return;
    }

    if (this.mode === 'card') {
     this._availableCards = [
       ...this.cardStore.physicalCards,
       ...this.cardStore.virtualCards
     ];
   } 

    this.form = this.fb.group({
      source: [null, Validators.required],     // Account or Card
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ionViewWillEnter(): void {
    this.buildForm();           // clear out old values
    this.isSelectorOpen = false;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      source: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }
  /**
   * Open the appropriate selector modal.
   */
  openSelector(): void {
    this.isSelectorOpen = true;
  }

  /**
   * Handle dismissal of the selector modal.
   */
  onSelectorDismiss(detail: { data?: Account | Card }): void {
    this.isSelectorOpen = false;
      console.log('🟡 [TopUpDetails] modal dismissed with:', detail.data);
    const selected = detail.data;
    if (selected) {
      this.form.get('source')!.setValue(detail.data);
          console.log('🟡 [TopUpDetails] form.source now:', this.form.get('source')!.value);
    }
  }

  /**
   * Navigate back one step.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Called when user taps “Next”. 
   * Validates and forwards to Summary.
   */
  sendDetails(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { source, amount } = this.form.value;
    console.log('🟡 [sendDetails] form.source now:', this.form.get('source')!.value);
    this.flow.set(this.mode, source, amount);
    this.router.navigate(['/tabs/top-up/summary']);
  }

  public get availableAccounts(): Account[] {
    return this._availableAccounts;
  }
  public get availableCards(): Card[] {
    return this._availableCards;
  }
}
