import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StoreInfo } from '../../interfaces/store';
import { rejects } from 'assert';
import { ApiProvider } from '../api/api';
/*
  Generated class for the StoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoreProvider {

  url: string

  constructor(public http: HttpClient, public apiPvdr: ApiProvider) {
    this.url = `${this.apiPvdr.api}/users`;
  }

  getNearbyStores(latitude: number, longitude: number) {
    let api = `${this.url}/nearby-stores/${latitude}/${longitude}`;

    //return this.getNearbyBrowser();
    return this.getNearbyDevice(latitude, longitude, api);
  }

  getNearbyDevice(latitude: number, longitude: number, api: string) {
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((data: any) => {
        if (data.status) {
          reject(data.status)
          return;
        }
        let nearbyStores: StoreInfo[] = []
        data.store.forEach(element => {
          let storeInfo: StoreInfo = {
            id: element.id,
            name: element.name,
            imageUrl: element.imageURL,
            openTime: element.openTime,
            closeTime: element.closeTime,
            location: {
              lat: element.location._latitude,
              lon: element.location._longitude
            },
            categories: element.categories
          }

          nearbyStores.push(storeInfo)
        });
        resolve(nearbyStores)
      })

    })
  }

  filterNearbyStores(latitude: number, longitude: number, distance: number, categories: string) {
    let api = `${this.url}/nearby-stores/${latitude}/${longitude}/${distance}/${categories}`;
    return new Promise((resolve, reject) => {
      this.http.get(api)
        .subscribe((data: any) => {
          console.log(data)
          if (data.err) {
            reject([])
          } else {

            let nearbyStores: StoreInfo[] = [];

            data.store.forEach(element => {
              let storeInfo: StoreInfo = {
                id: element.id,
                name: element.name,
                imageUrl: element.imageURL,
                openTime: element.openTime,
                closeTime: element.closeTime,
                location: {
                  lat: element.location._latitude,
                  lon: element.location._longitude
                },
                categories: element.categories
              }

              nearbyStores.push(storeInfo)
            });

            resolve(nearbyStores)
          }

        })

    })
  }

}
