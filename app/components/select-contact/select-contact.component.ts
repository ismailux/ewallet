import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonSearchbar, IonList, IonItem, IonLabel, IonAvatar, IonChip, IonBackButton } from '@ionic/angular/standalone';
import { Contact } from '../../models/contact';
import { star, starOutline, addOutline, chevronBackOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

type FilterType = 'All' | 'Recent' | 'Favourite';

@Component({
  selector: 'app-select-contact',
  templateUrl: './select-contact.component.html',
  styleUrls: ['./select-contact.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, IonSearchbar, IonList, IonItem, IonLabel, IonAvatar, IonChip, IonBackButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectContactComponent implements OnInit {
  @Output() contactSelected = new EventEmitter<Contact>();

  public contacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  public filters: FilterType[] = ['All', 'Recent', 'Favourite'];
  public activeFilter: FilterType = 'All';
  public searchTerm = '';

  /** Icon constants for template */
  public star = star;
  public starOutline = starOutline;
  public addOutline = addOutline;
  public chevronBack = chevronBackOutline;

  /** Filter options typed as union */


  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.contacts = [
      { id: '1', name: 'Alice Moore', info: 'alice.Moore@example.com', avatar: 'https://i.pravatar.cc/150?u=wade', isFavourite: true },
      { id: '2', name: 'James Allen', info: 'James.Allen@example.com', avatar: 'https://i.pravatar.cc/150?u=james', isFavourite: false },
      { id: '3', name: 'Ralph Edwards', info: 'Ralph.Edwards@example.com', avatar: 'https://i.pravatar.cc/150?u=ralph', isFavourite: false }
    ];

    this.applyFilters();
  }

  public onSearchChange(ev: CustomEvent) {
    this.searchTerm = ev.detail.value;
    this.applyFilters();
  }

  public onFilterSelect(filter: 'All' | 'Recent' | 'Favourite') {
    this.activeFilter = filter;
    this.applyFilters();
  }

  private applyFilters() {
    let list = [...this.contacts];
    if (this.activeFilter === 'Recent') {
      list = list.reverse();
    } else if (this.activeFilter === 'Favourite') {
      list = list.filter(c => c.isFavourite);
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(term));
    }
    this.filteredContacts = list;
  }

  public trackById(index: number, contact: Contact): string {
    return contact.id;
  }

  public cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }


  public selectContact(contact: Contact) {
    this.modalCtrl.dismiss(contact, 'confirm');
    this.contactSelected.emit(contact);
  }

  public toggleFavourite(contact: Contact, event: Event) {
    event.stopPropagation();
    contact.isFavourite = !contact.isFavourite;
    this.applyFilters();
  }

public dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public goToAddRecipientPage() {
    this.modalCtrl.dismiss(null, 'add');
    this.router.navigate(['/add-recipient']);
  }

  
  

}