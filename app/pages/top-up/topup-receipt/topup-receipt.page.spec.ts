import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupReceiptPage } from './topup-receipt.page';

describe('TopupReceiptPage', () => {
  let component: TopupReceiptPage;
  let fixture: ComponentFixture<TopupReceiptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
