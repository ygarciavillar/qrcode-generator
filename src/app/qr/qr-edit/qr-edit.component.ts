import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {QrHandlerService} from "@qr/qr-handler.service";

export const MatComponents = [MatIcon, MatInput, MatLabel, MatAccordion, MatExpansionPanel,
  MatExpansionPanelTitle, MatExpansionPanelHeader, MatExpansionPanelDescription, MatFormField];

@Component({
  selector: 'app-qr-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ...MatComponents],
  template: `
    <mat-accordion class="example-headers-align" multi>
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon>settings</mat-icon>
            &nbsp;Options
          </mat-panel-title>
        </mat-expansion-panel-header>

        <form [formGroup]="qrEditorFom">
            <mat-form-field appearance="outline">
              <mat-label>Background color</mat-label>
              <input matInput type="color" formControlName="backgroundColor" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Dots color</mat-label>
              <input matInput type="color" formControlName="dotColor"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Margin</mat-label>
              <input matInput type="number" min="1" formControlName="margin"/>
            </mat-form-field>
        </form>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: `
    mat-form-field {
      width: 100%;
      padding-top: 2rem;
    }
  `
})
export class QrEditComponent {
  private fb = inject(NonNullableFormBuilder);
  private qrHandlerService = inject(QrHandlerService);
  qrEditorFom = this.fb.group({
    backgroundColor: '#ffffff',
    dotColor: '#000',
    margin: 1,
  });

  constructor() {
    this.qrEditorFom.valueChanges.subscribe(value => {

     this.qrHandlerService.setQROptions(value)
    })
  }
}
