import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRecipientPage } from './add-recipient.page';

describe('AddRecipientPage', () => {
  let component: AddRecipientPage;
  let fixture: ComponentFixture<AddRecipientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
