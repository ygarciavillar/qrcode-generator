import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";

 const materialToolbarComponents = [MatIcon, MatIconButton, MatToolbar]

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [...materialToolbarComponents],
  template: `
<!--    <mat-toolbar class="my-toolbar ">-->
<!--      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">-->
<!--        <mat-icon>menu</mat-icon>-->
<!--      </button>-->
<!--      <span>QR Code Handler</span>-->
<!--      <span class="example-spacer"></span>-->
<!--      <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">-->
<!--        <mat-icon>favorite</mat-icon>-->
<!--      </button>-->
<!--      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">-->
<!--        <mat-icon>share</mat-icon>-->
<!--      </button>-->
<!--    </mat-toolbar>-->
  `,
  styles: `
    .example-spacer {
      flex: 1 1 auto;
    }
  `
})
export class ToolbarComponent {
}
