import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountProvider } from '../../providers/account/account';
import { Order, PostOrder } from '../../interfaces/order';


/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

    private url: string

    constructor(public http: HttpClient, public accountPvdr: AccountProvider) {
        this.url = "http://35.247.136.6:3000/users";
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
