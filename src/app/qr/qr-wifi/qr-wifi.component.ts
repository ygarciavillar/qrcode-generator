import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, StatusChangeEvent, Validators, ValueChangeEvent } from '@angular/forms';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { QrHandlerService } from '@qr/qr-handler.service';
import { filter } from 'rxjs';

@Component({
  selector: 'qr-wifi',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, MatIconModule, MatLabel, MatCheckbox, MatRadioGroup, ReactiveFormsModule, JsonPipe, MatError, MatRadioButton],
  templateUrl: 'qr-wifi.component.html',
  styles: `

  .form_container {

    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

      .form_control {

        mat-form-field {
          width: 100%;
        }

        mat-checkbox{
          width: 100%;
          margin-top: 0;
          margin-bottom: 0.5rem;
       }

       mat-radio-group{
        display: flex;
        flex-direction: column;
       }
      }
    }

    button{
        margin-top: 2rem;
    }

    @media screen and (min-width: 600px){
      .form_container{
        .form_control{
        mat-radio-group{
        display: flex;
        flex-direction: row;
       }
      }
    }
    }

    `
})
export class QrWifiComponent {

  private fb = inject(FormBuilder);
  errorMessage = signal('');
  private qrHandlerService = inject(QrHandlerService);

  wifiForm = this.fb.group({
    ssid: ['', Validators.required],
    hidden: false,
    password: '',
    encryption: 'WPA'
  });

  constructor() {
    this.wifiForm.events.pipe(
      filter( event => event instanceof ValueChangeEvent || event instanceof StatusChangeEvent),
         takeUntilDestroyed()
    ).subscribe( () => this.updateErrorMessage())
  }

  updateErrorMessage() {
    if (this.wifiForm?.get('networkName')?.hasError('required')) {
      this.errorMessage.set('The network name is required');
    } else {
      this.errorMessage.set('');
    }
  }

  generateQR(){
    if(!this.wifiForm.valid) {
      return;
    }
    const {ssid, password, hidden, encryption} = this.wifiForm.getRawValue();
    const qrData = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};`;
    this.qrHandlerService.setQRData(qrData);

  }


}
