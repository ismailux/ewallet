import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BillsService } from '../../../services/bills.service';

@Component({
  standalone: true,
  selector: 'app-bill-add',
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonSegment, IonSegmentButton, ReactiveFormsModule, FormsModule],
  templateUrl: './bill-add.page.html',
  styleUrls: ['./bill-add.page.scss']
})
export class BillAddPage {
  private bills = inject(BillsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  category: any = 'UTILITIES';
  carrierId?: string;
  form = this.fb.group({ nickname: [''] });
  fields: any[] = [];

  carriers = (cat: any) => this.bills.carriers().filter(c => c.category === cat);

  buildForm() {
    const c = this.bills.carriers().find(x => x.id === this.carrierId);
    this.fields = c?.fields || [];
    const group: any = { nickname: [''] };
    this.fields.forEach(f => group[f.key] = [ '', f.required ? Validators.required : [] ]);
    this.form = this.fb.group(group);
  }

  async save() {
    if (!this.carrierId) return;
    const { nickname, ...identity } = this.form.value as any;
    const acc = await this.bills.addAccount({ carrierId: this.carrierId, nickname, identity });
    this.router.navigate(['/bills', acc.id]);
  }
}