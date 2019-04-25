import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MenuInfo } from '../../interfaces/menu'

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {

  url: string

  constructor(public http: HttpClient) {
    this.url = "http://35.247.136.6:3000/users";
  }

  getStoreMenus(storeId: String) {
    let api = `${this.url}/${storeId}/menu`;

    return new Promise(resolve => {
      this.http.get(api).subscribe((data: any) => {
        let menuList: MenuInfo[] = [];
        data.menus.forEach(element => {
          let menu: MenuInfo = {
            menuId: element.menuId,
            storeId: element.storeId,
            name: element.name,
            imageURL: element.imageURL,
            preparation_time: element.preparation_time,
            available: element.available,
            price: element.price
          }
          menuList.push(menu);
        })
        resolve(menuList)
      })
    })


  }

}
