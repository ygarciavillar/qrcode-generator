import {computed, effect, Injectable, Signal, signal} from '@angular/core';
import * as QRCode from 'qrcode';
import {qrTypes} from "./qr-model";

export interface QROptions  {
  type: 'svg',
  width: number,
  backgroundColor: string;
  dotColor: string;
  margin: number;
}

export const defaultOptions: Partial<QROptions> = {
  type: 'svg',
  width: 270,
  margin: 1,
}


@Injectable({
  providedIn: 'root'
})
export class QrHandlerService {

  private readonly qrTypes= signal(qrTypes);
  private readonly qrOptions = signal<Partial<QROptions>>(defaultOptions);
  private readonly qrData = signal<string>('');
  private readonly qrCodeUrl = signal<string>('/images/default-preview-qr.svg');
  private readonly isLoaded = signal<boolean>(false);


  e = effect( () => {
    const data = this.qrData();
    const options = this.qrOptions();
    if (data) {
      this.generateQR(data, options);
    }
  });

  setQROptions(option: Partial<QROptions>) {
    this.qrOptions.update( options => ({...options, ...option}));
  }

  setQRData(data: string) {
    this.qrData.set(data);
  }

  private generateQR (data: string, options: Partial<QROptions>): void{
    QRCode.toDataURL(data, {
        color: {dark: options.dotColor, light: options.backgroundColor},
        margin: options.margin,
        width: options.width,
        })
      .then( qrCode => {
        this.qrCodeUrl.set(qrCode);
        this.isLoaded.set(true);
      })
      .catch( err => console.log(err));
    }


  getQrTypes() {
    return this.qrTypes.asReadonly() ;
  }

  getPngUrlCode(){
    return this.qrCodeUrl.asReadonly();
  }

  getSvgUrlCode() {
    const {dotColor, backgroundColor, margin, width} = this.qrOptions();
     return QRCode.toString(this.qrData(), {
      color: {dark: dotColor, light: backgroundColor}, margin
    });
  }

  isRender() {
    return this.isLoaded.asReadonly()
  }







}
