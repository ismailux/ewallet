import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonToggle, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { BillsService } from '../../../services/bills.service';

@Component({
  standalone: true,
  selector: 'app-bill-details',
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonToggle, IonSelect, IonSelectOption, RouterLink, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './bill-details.page.html',
  styleUrls: ['./bill-details.page.scss']
})
export class BillDetailsPage {
  private route = inject(ActivatedRoute);
  private bills = inject(BillsService);
  id = this.route.snapshot.paramMap.get('id')!;
  account = this.bills.accounts().find(a => a.id === this.id)!;
  name = this.bills.carriers().find(c => c.id === this.account.carrierId)?.name || 'Bill';

  unpaid = this.bills.listUnpaid(this.id);
  autopay = this.account.autopay;
  frequency = this.account.frequency;

  async pay(itemId: string) { await this.bills.payNow(this.id, itemId); this.unpaid = this.bills.listUnpaid(this.id); }
  async remove() { await this.bills.removeAccount(this.id); history.back(); }
  async updateSchedule() { await this.bills.setSchedule(this.id, this.frequency, this.autopay); }
}