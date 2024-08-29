import {Component, inject, signal} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, StatusChangeEvent, Validators, ValueChangeEvent} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs";
import {JsonPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {QrHandlerService} from "@qr/qr-handler.service";


export const matComponents = [MatFormField, MatIcon, MatInput, MatLabel, MatError, MatButton];

@Component({
  selector: 'qr-url',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ...matComponents],
  templateUrl: 'qr-url.component.html',
  styles: `
    mat-form-field {
      width: 100%;
      padding: 1rem 0;
    }
  `
})
export class QrUrlComponent {

  private readonly qrHandlerService = inject(QrHandlerService);

  readonly url = new FormControl('', {nonNullable: true, validators: Validators.required});
  errorMessage = signal('');

  constructor() {
    this.url.events
      .pipe(
        filter( event =>
          event instanceof StatusChangeEvent || event instanceof  ValueChangeEvent),
        takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.url.hasError('required')) {
      this.errorMessage.set('You must enter a valid url value');
    } else {
      this.errorMessage.set('');
    }
  }

  generate() {
    if(this.url.invalid) {
      return
    }

   this.qrHandlerService.setQRData(this.url.value);

  }

}
