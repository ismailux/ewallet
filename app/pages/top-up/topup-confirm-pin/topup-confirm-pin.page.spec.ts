import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupConfirmPinPage } from './topup-confirm-pin.page';

describe('TopupConfirmPinPage', () => {
  let component: TopupConfirmPinPage;
  let fixture: ComponentFixture<TopupConfirmPinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupConfirmPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
