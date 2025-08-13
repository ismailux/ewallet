import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card';

@Injectable({ providedIn: 'root' })
export class CardService {
  private _cards = new BehaviorSubject<Card[]>([]);
  cards$ = this._cards.asObservable();

  cardTypes = ['Visa', 'Mastercard', 'Amex'];
  cardColors = ['blue','orange','black','purple'];


  addCard(newCard: Card) {
    this._cards.next([...this._cards.value, newCard]);
  }
}
