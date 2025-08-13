import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { BillsService } from '../../../services/bills.service';

@Component({
  standalone: true,
  selector: 'app-bill-history',
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './bill-history.page.html',
  styleUrls: ['./bill-history.page.scss']
})
export class BillHistoryPage {
  private route = inject(ActivatedRoute);
  private bills = inject(BillsService);
  id = this.route.snapshot.paramMap.get('id')!;
  history = this.bills.history(this.id);

  download(url?: string) { if (url) window.open(url, '_blank'); }
}