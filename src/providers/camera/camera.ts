import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins, CameraSource, CameraResultType, CameraPhoto } from '@capacitor/core';

const { Camera } = Plugins;
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CameraProvider Provider');
  }

  getPhoto() {
    return Camera.getPhoto({
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri
    })
  }

}
