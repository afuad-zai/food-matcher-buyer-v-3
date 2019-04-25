import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, ItemSliding } from 'ionic-angular';

import { Order } from '../../interfaces/order';

import { OrderProvider } from '../../providers/order/order'
import { StoreProvider } from '../../providers/store/store';
import { QrcodeProvider } from '../../providers/qrcode/qrcode';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  totalPrice: number[];
  orderList: Order[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderPvdr: OrderProvider,
    public storePvdr: StoreProvider, private qrPvdr: QrcodeProvider, private toastCtrl: ToastController,
    private alertCtrl: AlertController, private popoverCtrl: PopoverController) {
    this.orderList = [];
    this.totalPrice = []
  }

  ionViewDidLoad() {
    console.log("test")
    this.orderPvdr.getOrder().then((orderList: Order[]) => {
      if (orderList && !orderList.length) {
        return;
      }
      this.orderList = orderList;
      console.log(this.orderList)
      this.orderList.forEach(order => {
        let total = 0;
        order.menus.forEach(menu => {
          total = total + menu.price;
        })
        this.totalPrice.push(total);
        if (order.userRating)
          console.log("test")
        if (!order.userRating.length)
          console.log("test2")

      })
    }).catch(err => console.log())
  }

  completeOrder(order: Order, index, slidingItem: ItemSliding) {
    this.qrPvdr.scan().then((scannedId) => {
      if (scannedId == order.orderId) {
        this.orderPvdr.updateOrderStatus(order.orderId, "Completed").then((res) => {
          this.displayToast("Order has been completed.")
          this.orderList[index].status = "Completed";
          slidingItem.close();
        }).catch((err) => {
          this.displayToast("Something went wrong. Order status has not been updated.")
        })
      } else {
        this.displayToast("Incorrect QR code for this order.")
      }
    })
  }

  deleteItem(order: Order, index, slidingItem: ItemSliding) {
    this.alertCtrl.create({
      title: 'Cancel Order',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.orderPvdr.updateOrderStatus(order.orderId, "Cancelled").then((res) => {
              this.displayToast("Order has been cancelled.")
              this.orderList[index].status = "Cancelled";
              slidingItem.close();
            }).catch((err) => {
              this.displayToast("Something went wrong. Order status has not been updated.")
            })
          }
        }
      ]
    }).present();
  }

  openRating(order: Order, index, slidingItem: ItemSliding) {
    if (order.status == "Incomplete")
      this.displayToast("Please complete your order before reviewing this order.")
    else {
      let popover = this.popoverCtrl.create('PostOrderRatingPage', {
        target: order.storeId,
        ratedBy: order.userId,
        orderId: order.orderId
      })

      popover.present();

      popover.onDidDismiss((data) => {
        if (data) {
          this.orderList[index].userRating = data.userRating;
          slidingItem.close();
        }
      })
    }

  }

  displayToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}
