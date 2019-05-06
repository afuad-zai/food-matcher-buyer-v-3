import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private _api: string;

  constructor() {
    this._api = "http://35.247.136.6:3000"
  }

  get api(): string {
    return this._api;
  }

}
