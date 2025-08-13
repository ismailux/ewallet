import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { Card } from '../../../models/card';
import { DebitCardComponent } from '../../../components/debit-card/debit-card.component';
import { RouterModule } from '@angular/router';


interface AddCardForm {
  type: string;
  colorKey: string;
  description: string;
  number: string;
  secret: string;
  expiry: string;
  balance: number;
}

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule, DebitCardComponent, IonicModule, RouterModule,],
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage {
  form = this.fb.group({
    type:        [this.cards.cardTypes[0], Validators.required],
    colorKey:    [this.cards.cardColors[0], Validators.required],
    description: ['', Validators.required],
    number:      ['1234 1234 1234 1234', Validators.required],
    secret:      ['123', Validators.required],
    expiry:      ['01/25', Validators.required],
    balance:     [0, [Validators.required, Validators.min(0)]],
  });

  adding = false;

  constructor(
    private fb: FormBuilder,
    public cards: CardService,
    private nav: NavController
  ) {}

  /** 
   *  Narrowly type our form.value so the template can bind without null/undefined errors
   */
  get v(): AddCardForm {
    return this.form.value as AddCardForm;
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.adding = true;

    const newCard: Card = {
      id:          Date.now(),
      type:        this.v.type,
      color:       this.v.colorKey,
      description: this.v.description,
      number:      this.v.number,
      secret:      this.v.secret,
      expiry:      this.v.expiry,
      balance:     this.v.balance,
      transactions: [
        { name: 'Starting Balance', amount: this.v.balance, deposit: true }
      ]
    };

    this.cards.addCard(newCard);

    setTimeout(() => {
      this.adding = false;
      this.nav.back();
    }, 500);
  }
}
