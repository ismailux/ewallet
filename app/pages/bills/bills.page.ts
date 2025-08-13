import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-bills-shell',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterOutlet]
})
export class BillsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
