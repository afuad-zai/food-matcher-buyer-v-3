import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Injectable } from '@angular/core';

/*
  Generated class for the QrcodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrcodeProvider {

  constructor(private barcodeScanner: BarcodeScanner) {
    console.log('Hello QrcodeProvider Provider');
  }

  scan() {
    return new Promise((resolve, reject) => {
      this.barcodeScanner.scan().then(barcodeData => {
        resolve(barcodeData)
      }).catch(err => {
        reject(err)
      });
    })
  }

  generate(message: string) {
    return new Promise((resolve, reject) => {
      this.barcodeScanner.encode(this.barcodeScanner.Encode.PHONE_TYPE, message).then((qrcode) => {
        resolve(qrcode);
      }).catch((err) => {
        reject(err)
      })
    })

  }
}
