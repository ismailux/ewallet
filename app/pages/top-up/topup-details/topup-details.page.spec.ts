import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupDetailsPage } from './topup-details.page';

describe('TopupDetailsPage', () => {
  let component: TopupDetailsPage;
  let fixture: ComponentFixture<TopupDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
