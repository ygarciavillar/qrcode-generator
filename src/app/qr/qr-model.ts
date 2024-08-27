import {QrUrlComponent} from './qr-url/qr-url.component';
import {QrTextComponent} from "./qr-text/qr-text.component";
import {QrWifiComponent} from "./qr-wifi/qr-wifi.component";

export type QR_TYPE = typeof QrUrlComponent | typeof QrTextComponent | typeof QrWifiComponent;

export class QRGenerator<T> {
  constructor(
    public key: string,
    public label: string,
    public value: string,
    public icon: string,
    public component: T ) {}
}

const QR_URL = new QRGenerator('qr_url', 'Url', 'url','http', QrUrlComponent);
const QR_TEXT = new QRGenerator('qr_text', 'Text', 'text','notes', QrTextComponent);
const QR_WIFI = new QRGenerator('qr_wifi', 'Wifi', 'wifi','wifi', QrWifiComponent);


export const qrTypes: QRGenerator<QR_TYPE>[] = [QR_URL, QR_TEXT, QR_WIFI];


