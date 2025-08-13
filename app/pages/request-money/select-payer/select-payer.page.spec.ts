import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPayerPage } from './select-payer.page';

describe('SelectPayerPage', () => {
  let component: SelectPayerPage;
  let fixture: ComponentFixture<SelectPayerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
