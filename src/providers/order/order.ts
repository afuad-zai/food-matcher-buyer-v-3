import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { PostOrder } from '../../interfaces/order';
import { ApiProvider } from '../api/api';


/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

    private url: string

    constructor(public http: HttpClient, public accountPvdr: AccountProvider, public apiPvdr: ApiProvider) {
        this.url = `${this.apiPvdr.api}/users`;
    }

    getOrder() {
        let api = `${this.url}/${this.accountPvdr.userId}/order`;
        return new Promise((resolve, reject) => {
            this.http.get(api)
                .subscribe((data: any) => {
                    console.log(data)
                    if (data.err) {
                        reject(data.err)
                    }
                    console.log(data.orders)
                    resolve(data.orders)
                })
        })
    }

    postOrder(newOrder: PostOrder) {
        let api = `${this.url}/${this.accountPvdr.userId}/order`;
        return new Promise((resolve, reject) => {
            this.http.post(api, newOrder)
                .subscribe((res: any) => {
                    if (res.err) {
                        reject(res.err)
                    } else {
                        resolve(res.status)
                    }

                })
        })
    }

    updateOrderStatus(orderId: string, statusUpdate: string) {
        let api = `${this.url}/${this.accountPvdr.userId}/order`;
        let updateOrder = {
            "orderId": orderId,
            "status": statusUpdate
        }
        return new Promise((resolve, reject) => {
            this.http.put(api, updateOrder)
                .subscribe((res: any) => {
                    if (res.err) {
                        reject(res.err)
                    } else {
                        resolve(res.status)
                    }

                })
        })
    }




}
