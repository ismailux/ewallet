import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton,
  IonProgressBar
} from '@ionic/angular/standalone';
import { TransferService, TransferMode } from '../../../services/transfer.service';

interface Mode {
  value: TransferMode;
  label: string;
  description: string;
  bgClass: string;
}

@Component({
  selector: 'app-mode-select',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonButton,
    IonProgressBar
  ],
  templateUrl: './mode-select.page.html',
  styleUrls: ['./mode-select.page.scss']
})
export class ModeSelectPage implements OnInit {
  public mode: TransferMode | null = null;

  public modes: Mode[] = [
    {
      value: 'mobile',
      label: 'Mobile Money',
      description: 'Quickly send to phone wallets.',
      bgClass: 'card-1'
    },
    {
      value: 'cash',
      label: 'Cash Pickup',
      description: 'Pick up cash at partner locations.',
      bgClass: 'card-2'
    },
    {
      value: 'bank',
      label: 'Direct to Bank',
      description: 'Deposit directly to a bank account.',
      bgClass: 'card-3'
    }
  ];

  constructor(
    private transferService: TransferService,
    private router: Router
  ) {}

  ngOnInit() {
    // Clear out any previously selected mode
    this.mode = null;
    this.transferService.setMode(null as any);
  }

  /** Called when a card is clicked */
  public onModeChange(m: TransferMode) {
    this.mode = m;
    this.transferService.setMode(m);
  }

  /** Only navigate once a mode has been chosen */
  public proceed() {
    if (this.mode) {
      this.router.navigate(['/tabs/transfer/details']);
    }
  }
}
