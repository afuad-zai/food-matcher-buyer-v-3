import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { User } from '../../interfaces/user';

import { ApiProvider } from '../api/api'

/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {
  private _loggedIn: boolean;
  private _userInfo: User;
  private _url: string;

  constructor(public http: HttpClient, public transfer: FileTransfer, public apiPvdr: ApiProvider) {
    this.init();
    this._url = `${this.apiPvdr.api}/users`;
  }

  init() {
    this._userInfo = {
      name: "User",
      image: './assets/imgs/user.png',
      id: "",
      email: "",
      password: ""
    }
    this._loggedIn = false;
  }

  loginStatus() {
    // return true if logged
    return this._loggedIn;
  }

  login(username, password) {
    let api = `${this._url}/login/${username}/${password}`;

    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((res: any) => {
        console.log(res)
        if (res.err) {
          reject(res.err)
        } else {

          let newInfo = res.userInfo
          this._userInfo = {
            id: newInfo.id,
            name: newInfo.name,
            image: newInfo.imageUrl,
            email: newInfo.email,
            password: newInfo.password
          }

          this._loggedIn = true;

          resolve(true)
        }
      })
    })
  }

  signup(username, password) {
    let api = `${this._url}/signup/${username}/${password}`;

    return new Promise((resolve, reject) => {
      this.http.post(api, {}).subscribe((res: any) => {
        if (res.err) {
          reject("Email is already registered")
        } else {
          resolve("Sign up successful.");
        }
      })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.init();
      this._loggedIn = false;
      resolve(true)
    })
  }

  updateProfile(profileData: User) {
    let api = `${this._url}/${this._userInfo.id}/user`;

    let updateField: any = {};

    if (profileData.email != this._userInfo.email) {
      updateField.email = profileData.email;
      this._userInfo.email = profileData.email;
    }

    if (profileData.password != this._userInfo.password) {
      updateField.password = profileData.password;
      this._userInfo.password = profileData.password;
    }

    if (profileData.name != this._userInfo.name) {
      updateField.name = profileData.name;
      this._userInfo.name = profileData.name;
    }

    if (profileData.image != this._userInfo.image) {
      updateField.image = profileData.image;
      this._userInfo.image = profileData.image;
    }

    console.log(updateField)
    return new Promise((resolve, reject) => {
      this.http.put(api, updateField).subscribe((res: any) => {
        if (res.err) {
          reject(res.err)
        } else {
          resolve(res.status)
        }
      })
    })
  }

  get name(): string {
    return this._userInfo.name;
  }
  set name(name: string) {
    this._userInfo.name = name;
  }

  get image(): string {
    return this._userInfo.image;
  }

  set image(imageUrl: string) {
    this._userInfo.image = imageUrl;
  }

  get userId(): string {
    return this._userInfo.id;
  }

  get email(): string {
    return this._userInfo.email;
  }
  get password(): string {
    return this._userInfo.password;
  }

  uploadProfileImage(imgSrc: string) {
    // Destination URL
    let url = `${this.apiPvdr.api}/uploadfile`;

    // File for Upload
    var targetPath = imgSrc;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        desc: "desc"
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);

  }

}
