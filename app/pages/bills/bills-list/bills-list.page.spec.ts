import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillsListPage } from './bills-list.page';

describe('BillsPage', () => {
  let component: BillsListPage;
  let fixture: ComponentFixture<BillsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
