import {Component, inject} from '@angular/core';
import {QrHandlerService} from "@qr/qr-handler.service";

import {DOCUMENT, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-qr-render',
  standalone: true,
  imports: [
    NgOptimizedImage, NgIf, NgClass, MatProgressSpinner, MatButton, MatIcon
  ],
  template: `
      <div class="qrContainer">
        <div class="image-container" [ngClass]="isRendered() ? '' : 'placeholder'">
          <img [ngSrc]="qrCodeToRender()" width="270" height="270" alt="Qr Placeholder" priority>
        </div>

        <div class="qr-actions">
          <button mat-raised-button (click)="download('svg')">
            <mat-icon>download</mat-icon>.SVG
          </button>

          <button mat-raised-button (click)="download('png')">
            <mat-icon>download</mat-icon>.PNG
          </button>
        </div>
      </div>
  `,
  styles: `
    .qrContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-height: 350px;

    }

    .image-container {
      border: 1px solid rgba(0,0,0,0.4);
      display: inline-block;
    }

    .image-container img{
      display: block;
    }

    .placeholder {
      position: relative;
    }

    .placeholder::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(100, 100, 100, 0.5); /* Grey color with 60% opacity */
    }

    .qr-actions {
      width: 90%;
      gap: 1rem;
      display: flex;
      justify-items: center;
      align-items: center;
      margin-top: 2rem;

    }
    .qr-actions > * {
      flex: 1;
    }
  `
})
export class QrRenderComponent {

  private readonly document = inject(DOCUMENT);
  private readonly qrHandlerService = inject(QrHandlerService);
  qrCodeToRender = this.qrHandlerService.getPngUrlCode();
  isRendered = this.qrHandlerService.isRender();

  download (format: 'svg' | 'png') {
    const link = this.document.createElement('a');
    switch(format){
      case "png":
        link.href = this.qrCodeToRender();
        link.download = `qr-code.${format}`;
        link.click();
        break;
      case "svg":
       this.qrHandlerService.getSvgUrlCode().then( qrCodeToRender => {
           const blob = new Blob([qrCodeToRender], { type: 'image/svg+xml' });
           link.href = URL.createObjectURL(blob);
           link.download = `qr-code.${format}`;
           link.click();
            URL.revokeObjectURL(link.href);
       })
    }


  }

}
