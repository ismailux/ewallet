import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupBankDetailsPage } from './topup-bank-details.page';

describe('TopupBankDetailsPage', () => {
  let component: TopupBankDetailsPage;
  let fixture: ComponentFixture<TopupBankDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupBankDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
