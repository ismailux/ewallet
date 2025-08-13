import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonList, IonItem, IonLabel, IonAvatar, IonBackButton, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonList, IonItem, IonLabel, IonAvatar, IonBackButton, IonButton ],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    console.log('User logging out...');
  }
}