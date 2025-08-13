import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.page.html',
  styleUrls: ['./request-money.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonRouterOutlet],
})
export class RequestMoneyPage implements OnInit {

  constructor() {     console.log('🔧 [RequestMoney] constructor called');
}

  ngOnInit() {
     console.log('🟢 [RequestMoney] ngOnInit start');
  }

}