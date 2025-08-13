// src/app/components/mode-selector/mode-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol, IonCard, IonIcon } from '@ionic/angular/standalone';
import { walletOutline, cashOutline, homeOutline } from 'ionicons/icons';
import { TransferMode } from '../../services/transfer.service';


interface Mode {
  value: TransferMode;
  label: string;
  icon: any;
}

@Component({
  selector: 'app-mode-selector',
  standalone: true,
  imports: [CommonModule,IonGrid, IonRow, IonCol, IonCard, IonIcon],
  template: `
    <ion-grid>
      <ion-row>
        <ion-col size="4" *ngFor="let m of modes">
          <ion-card
            class="mode-card"
            [class.selected]="m.value===mode"
            (click)="select(m.value)"
          >
            <ion-icon [icon]="m.icon" size="large"></ion-icon>
            <div class="mode-label">{{ m.label }}</div>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styles: [`
    ion-card { text-align: center; cursor: pointer; }
    ion-card.selected { border: 2px solid var(--ion-color-primary); }
    .mode-label { margin-top: 8px; font-size: 0.9rem; }
  `]
})
export class ModeSelectorComponent {
  @Input() mode: TransferMode | null = null;
  @Output() modeChange = new EventEmitter<TransferMode>();

  modes: Mode[] = [
    { value: 'mobile', label: 'Mobile Money',   icon: walletOutline },
    { value: 'cash',   label: 'Cash Pickup',    icon: cashOutline },
    { value: 'bank', label: 'Direct to Bank', icon: homeOutline }
  ];

  select(m: TransferMode) {
    this.modeChange.emit(m);
  }
}
