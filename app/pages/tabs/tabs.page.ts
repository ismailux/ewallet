import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonFab, IonFabButton],
})
export class TabsPage {
  constructor(private router: Router) {}

  // Cette fonction sera appelée par le clic sur le bouton central
  goToScanPage() {
    this.router.navigate(['/tabs/scan']);
  }
}