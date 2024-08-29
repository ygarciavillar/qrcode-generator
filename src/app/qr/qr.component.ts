import { Component } from '@angular/core';
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
  imports: [QrRenderComponent, QrEditComponent, ...MAT_COMPONENTS, MatMenu],
  template: `
  <section>
    <div class="create">
      <mat-card appearance="outlined">
        <mat-card-content>
          <ng-content/>
        </mat-card-content>
      </mat-card>
    </div>

    <div class="qr-options">
        <app-qr-edit />
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
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    grid-template-rows: 1fr;
    grid-template-areas:
      "qr-create"
      "qr-render"
      "qr-option";
  }

  .create{
    grid-area: qr-create;
  }

  .qr-options {
    grid-area: qr-option;
  }

  .render{
    grid-area: qr-render;
  }

    mat-card{
      height: 100%
    }

    mat-card-content{
      height: 100%;
    }

    @media screen and (min-width: 600px){
      section {
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
        grid-template-rows: auto 1fr;
        grid-template-areas:
          "qr-create qr-render"
          "qr-option qr-render";
      }
    }




  `
})
export class QrComponent {}
