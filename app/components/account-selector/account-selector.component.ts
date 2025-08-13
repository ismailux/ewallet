import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonAvatar, IonButton } from '@ionic/angular/standalone';
import { Account } from '../../models/payment';

@Component({
  selector: 'app-account-selector',
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonAvatar, IonButton],
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements OnInit {
  /** List of accounts to choose from */
  @Input() accounts: Account[] = [];

  /** Emits the selected Account when user taps */
  @Output() selected = new EventEmitter<Account>();

  /** Allows “Cancel” button to dismiss without selection */
  @Output() canceled = new EventEmitter<void>();

  ngOnInit() {
    // Could load accounts here if not passed in
  }

  /**
   * User tapped on an account item.
   */
  onSelect(acc: Account) {
    this.selected.emit(acc);
  }

  /**
   * User tapped Cancel.
   */
  onCancel() {
    this.canceled.emit();
  }
}
