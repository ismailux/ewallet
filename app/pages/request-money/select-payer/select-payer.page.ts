import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonSearchbar, IonChip, IonLabel, IonList, IonItem, IonAvatar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-select-payer',
  templateUrl: './select-payer.page.html',
  styleUrls: ['./select-payer.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonSearchbar, IonChip, IonLabel, IonList, IonItem, IonAvatar, IonButton ],
})
export class SelectPayerPage implements OnInit {

  public recipients: any[] = [];
  public filters: string[] = ['All', 'Recent', 'Favourite', 'Bank'];
  public activeFilter: string = 'All';

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
    this.recipients = [
      { name: 'James Allen', account: '**** 9874 678*', isFavourite: false, avatar: 'https://i.pravatar.cc/150?u=james' },
      { name: 'Wade Warren', account: '**** 7895 239*', isFavourite: true, avatar: 'https://i.pravatar.cc/150?u=wade' },
      { name: 'Ralph Edwards', account: '**** 7836 451*', isFavourite: false, avatar: 'https://i.pravatar.cc/150?u=ralph' },
    ];
  }

  goBack(): void {
    this.location.back();
  }
  
  selectFilter(filter: string): void {
    this.activeFilter = filter;
  }

  toggleFavourite(recipient: any): void {
    recipient.isFavourite = !recipient.isFavourite;
  }

  public goToAddRecipientPage(): void {
    this.router.navigate(['/tabs/add-recipient']);
  }

  goToRequestDetails(payer: any) {
    this.router.navigate(['/tabs/request-money/details'], {
      state: {
        payerDetails: payer
      }
    });
  }
}