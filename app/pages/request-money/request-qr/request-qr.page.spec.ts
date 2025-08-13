import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestQrPage } from './request-qr.page';

describe('RequestQrPage', () => {
  let component: RequestQrPage;
  let fixture: ComponentFixture<RequestQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
