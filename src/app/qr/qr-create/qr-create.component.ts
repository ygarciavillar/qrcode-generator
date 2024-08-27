import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MatIcon} from "@angular/material/icon";
import {NgComponentOutlet, NgFor} from "@angular/common";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {QrHandlerService} from "../qr-handler.service";
import {QR_TYPE} from "../qr-model";
import {QrUrlComponent} from "@qr/qr-url/qr-url.component";

export const MAT_COMPONENTS = [MatButtonToggleGroup, MatButtonToggle, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger];

@Component({
  selector: 'app-qr-create',
  standalone: true,
  imports: [NgFor, NgComponentOutlet, FormsModule, QrUrlComponent,  ...MAT_COMPONENTS],
  template: `
    <div class="types_selectors">
      <mat-button-toggle-group name="qrTypes" aria-label="Font Style" [hideSingleSelectionIndicator]="true">
        @for (type of qrTypes(); track type.key; let first = $first) {
          <mat-button-toggle  [value]="type.value" [checked]="first" (change)="selectQr($event.value)" >
            <mat-icon [fontIcon]="type.icon"></mat-icon>&nbsp;{{ type.label }}&nbsp;
          </mat-button-toggle>
        }

        <mat-button-toggle  value="other" [matMenuTriggerFor]="menu">
          <mat-icon fontIcon="more_vert"></mat-icon>&nbsp;Others&nbsp;
        </mat-button-toggle>

      </mat-button-toggle-group>
    </div>

    <div class="form_container">
      <ng-container *ngComponentOutlet="componentToRender();"></ng-container>
    </div>


    <mat-menu #menu="matMenu">
      <button mat-menu-item value="test" (click)="selectQr('test')">
        <mat-icon>dialpad</mat-icon>
        <span>Redial</span>
      </button>
      <button mat-menu-item disabled>
        <mat-icon>voicemail</mat-icon>
        <span>Check voice mail</span>
      </button>
      <button mat-menu-item>
        <mat-icon>notifications_off</mat-icon>
        <span>Disable alerts</span>
      </button>
    </mat-menu>



  `,
  styles: `
    .types_selectors {
      display: flex;
      justify-content: center;
      padding-bottom: 2rem;
    }

    mat-button-toggle-group{
      margin: 0 auto;
    }

  `
})
export class QrCreateComponent {
  readonly qrHandlerService = inject(QrHandlerService);
  readonly qrTypes = this.qrHandlerService.getQrTypes();
  componentToRender = signal<QR_TYPE | null> (
    this.qrTypes() ? this.qrTypes()[0].component : null);


 selectQr(qrType: string) {
   const qrResult = this.qrTypes().find( qrTypes => qrTypes.value === qrType);
   if (qrResult) {
    this.componentToRender.update( () => qrResult.component);
   }
 }

}
