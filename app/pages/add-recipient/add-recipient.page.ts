import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonFooter, IonButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipient',
  templateUrl: './add-recipient.page.html',
  styleUrls: ['./add-recipient.page.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonFooter, IonButton ],
})
export class AddRecipientPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}