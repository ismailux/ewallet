import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillHistoryPage } from './bill-history.page';

describe('BillHistoryPage', () => {
  let component: BillHistoryPage;
  let fixture: ComponentFixture<BillHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
