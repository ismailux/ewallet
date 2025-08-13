import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonIcon, IonButton } from '@ionic/angular/standalone';
import { cardOutline } from 'ionicons/icons';
import { CardStoreService } from '../../services/Card-store.service';
import type { Card } from '../../models/payment';

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonIcon, IonButton],
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})
export class CardSelectorComponent implements OnInit {

  public cardOutline = cardOutline;

  /** List of cards to choose from */
  @Input() cards: Card[] = [];

  /** Emits the selected Card when user taps */
  @Output() selected = new EventEmitter<Card>();

  /** Emits if user cancels without selection */
  @Output() canceled = new EventEmitter<void>();

  constructor(private cardSvc: CardStoreService) {}

  ngOnInit() {
    this.cards = this.cardSvc.physicalCards; 
  }


  onSelect(card: Card) {
    this.selected.emit(card);
  }

  onCancel() {
    this.canceled.emit();
  }
}
