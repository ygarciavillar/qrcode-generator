import { NgComponentOutlet } from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { QrHandlerService } from '@qr/qr-handler.service';
import { QR_TYPE } from '@qr/qr-model';
import {QrComponent} from "@qr/qr.component";
import {ToolbarComponent} from "@shared/toolbar.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QrComponent, MatButtonToggleModule, MatIcon, MatMenuTrigger, MatMenu, NgComponentOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  readonly qrHandlerService = inject(QrHandlerService);
  readonly qrTypes = this.qrHandlerService.getQrTypes()

  componentToRender = signal<QR_TYPE | null> (
    this.qrTypes() ? this.qrTypes()[0].component : null);


 selectQr(qrType: string) {
   const qrResult = this.qrTypes().find( qrTypes => qrTypes.value === qrType);
   if (qrResult) {
    this.componentToRender.update( () => qrResult.component);
   }
 }
}
