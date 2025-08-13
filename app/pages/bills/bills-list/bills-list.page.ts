// app/pages/bills/bills-list.page.ts
import { Component, inject, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { BillsService } from '../../../services/bills.service';
import { addOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-bills-list',
  imports: [IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './bills-list.page.html',
  styleUrls: ['./bills-list.page.scss'],
})
export class BillsListPage {
  private bills = inject(BillsService);
  add = addOutline;
  accounts = this.bills.accounts.asReadonly();
  carriers = this.bills.carriers.asReadonly();

  carrierName = (id: string) => this.carriers().find(c => c.id === id)?.name || 'Carrier';

  constructor(private router: Router, private route: ActivatedRoute) {}
  
  async payNow(a: any) {
    await this.bills.payNow(a.id);
    // you can reuse your ConfirmPinService before calling payNow
  }

  async pay(a: any) { await this.bills.payNow(a.id); }

  goAdd() {
    this.router.navigate(['add'], { relativeTo: this.route }); // → /tabs/home/bill/add
  }
}
