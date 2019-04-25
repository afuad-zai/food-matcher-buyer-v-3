import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { MenuInfo } from '../../interfaces/menu';
import { PostOrder } from '../../interfaces/order';
import { StoreInfo } from '../../interfaces/store';
/**
 * Generated class for the ConfirmOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  orders: { menu: MenuInfo, quantity: number }[];
  newOrder: PostOrder
  storeInfo: StoreInfo;
  userId: string;
  totalPrice: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderPvdr: OrderProvider,
    private toastCtrl: ToastController, public viewCtrl: ViewController) {
    this.orders = this.navParams.get('orderInfo');
    this.storeInfo = this.navParams.get('storeInfo');
    this.userId = this.navParams.get('userId');
    this.totalPrice = 0;

    this.initOrder();
  }

  initOrder() {
    let menus = {};

    this.orders.forEach(el => {
      menus[el.menu.menuId] = el.quantity;
      this.totalPrice = this.totalPrice + el.menu.price * el.quantity;
    })

    this.newOrder = {
      userId: this.userId,
      storeId: this.storeInfo.id,
      status: "Incomplete",
      timestamp: "",
      menus: menus,
      storeRating: "",
      userRating: ""
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmOrderPage');
  }

  submitOrder() {
    console.log(this.newOrder)
    this.orderPvdr.postOrder(this.newOrder).then((res) => {
      this.createToast("Order has been placed!")
      this.viewCtrl.dismiss();
    }).catch((err) => {
      this.createToast("Failed to place order!")
    })
  }

  createToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }


}
