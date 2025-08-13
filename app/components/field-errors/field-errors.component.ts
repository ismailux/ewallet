// src/app/shared/field-errors/field-errors.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-errors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ul *ngIf="control && (control.touched || control.dirty) && control.invalid" class="error-list">
      <li *ngFor="let msg of errors()">{{ msg }}</li>
    </ul>
  `,
  styles: [`
    .error-list {
      margin: 4px 16px 0;
      padding: 0;
      list-style: none;
      color: var(--ion-color-danger);
      font-size: 0.85rem;
    }
    .error-list li {
      margin: 2px 0;
    }
  `]
})
export class FieldErrorsComponent {
  /** The FormControl or FormGroup to inspect */
  @Input() control!: AbstractControl;

  /** Friendly field name for messages */
  @Input() fieldName = '';

  errors(): string[] {
    if (!this.control || !this.control.errors) return [];
    const errs = this.control.errors!;
    const messages: string[] = [];

    if (errs['required']) {
      messages.push(`${this.fieldName} is required.`);
    }
    if (errs['pattern']) {
      messages.push(`Invalid format for ${this.fieldName}.`);
    }
    if (errs['email']) {
      messages.push(`Please enter a valid email.`);
    }
    // ...add any custom error keys here...

    return messages;
  }
}
