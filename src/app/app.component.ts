import {Component} from '@angular/core';
import {QrComponent} from "@qr/qr.component";
import {ToolbarComponent} from "@shared/toolbar.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToolbarComponent, QrComponent],
  template: `
    <header>
      <app-toolbar />
    </header>

    <main class="container">
      <h2>QR Code Generator </h2>
      <app-qr />
    </main>
  `,
  styles: `
    .container {
      margin: 0 auto;
      max-width: 1350px;

      h2 {
        margin: 2rem 0;
        text-align: center;
      }
    }
  `
})
export class AppComponent {
  title = 'yg-qrcode';
}
