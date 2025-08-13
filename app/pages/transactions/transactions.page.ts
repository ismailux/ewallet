import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonSearchbar, IonButton, IonProgressBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton, IonSearchbar, DecimalPipe, IonButton, IonProgressBar],
})
export class TransactionsPage implements OnInit {

  public showProgress = false;
  
  // Cette variable contiendra nos données groupées
  public groupedTransactions: { [key: string]: any[] } = {};

  constructor(private location: Location) { }

  ngOnInit() {
    // 1. On rajoute des dates à vos données
    const transactions = [
      { name: 'Adidas Store Paris', date: '2025-07-03', category: 'Shopping', amount: -85.50 },
      { name: 'Virement de John Doe', date: '2025-07-01', category: 'Incomming funds', amount: 1200.00 },
      { name: 'Pharmacie Monge', date: '2025-06-28', category: 'Medicine', amount: -22.30 },
      { name: 'Netflix Subscription', date: '2025-06-15', category: 'Online Payment', amount: -15.99 },
      { name: 'Carrefour Express', date: '2025-06-12', category: 'Groceries', amount: -45.10 },
    ];

    // 2. On appelle la fonction de groupement
    this.groupedTransactions = this.groupTransactionsByMonth(transactions);
  }

  ionViewWillEnter() {
    // show the progress bar
    this.showProgress = true;

    // hide progress bar after 2 seconds
    setTimeout(() => {
      this.showProgress = false;
    }, 2000);
  }

  // 3. La fonction qui fait le travail de groupement
  private groupTransactionsByMonth(transactions: any[]): { [key: string]: any[] } {
    const groups: { [key: string]: any[] } = {};
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      // Crée une clé "July 2025", "June 2025", etc.
      const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(tx);
    });
    return groups;
  }

  // La fonction pour les icônes ne change pas
  getIconForCategory(category: string): string {
    const basePath = 'assets/icons/transaction_icons/';
    switch (category) {
      case 'Shopping': return basePath + 'shopping.svg';
      case 'Incomming funds': return basePath + 'transfer-in.svg';
      case 'Groceries': return basePath + 'groceries.svg';
      case 'Online Payment': return basePath + 'merchant_online.svg';
      case 'Medicine': return basePath + 'medicine.svg';
      default: return basePath + 'default.svg';
    }
  }

  goBack(): void {
    this.location.back();
  }
}