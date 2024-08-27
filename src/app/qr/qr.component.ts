import { Component } from '@angular/core';
import {QrCreateComponent} from "@qr/qr-create/qr-create.component";
import {QrRenderComponent} from "@qr/qr-render/qr-render.component";
import {QrEditComponent} from "@qr/qr-edit/qr-edit.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

export const MAT_COMPONENTS = [MatCard, MatCardContent, MatButtonModule,MatIcon, MatMenuTrigger, MatMenuItem];
@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [QrCreateComponent, QrRenderComponent, QrEditComponent, ...MAT_COMPONENTS, MatMenu],
  template: `
  <section>
    <div class="create">
      <mat-card appearance="outlined">
        <mat-card-content>
          <app-qr-create />
        </mat-card-content>
      </mat-card>

      <div class="qr-options">
        <app-qr-edit />
      </div>
    </div>

    <div class="render">
        <mat-card appearance="outlined">
          <mat-card-content>
            <app-qr-render />
          </mat-card-content>
        </mat-card>
    </div>
  </section>

  `,
  styles: `
    section {
      display: flex;
      width: 100%;
      gap: 2rem;
      justify-content: space-between;
    }

    .create{
      flex-basis: 60%;
    }

    .render {
      flex-basis: 40%;
    }


    .qr-options {
      margin-top: 2rem;
    }

  `
})
export class QrComponent {}
