import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { StoreInfo } from '../../interfaces/store';
import { MenuProvider } from '../../providers/menu/menu';
import { MenuInfo } from '../../interfaces/menu';
import { RatingProvider } from '../../providers/rating/rating';
import { BriefRating } from '../../interfaces/rating';
import { OrderProvider } from '../../providers/order/order';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  menuList: MenuInfo[];
  storeInfo: StoreInfo;
  briefRating: BriefRating;
  quantity: number[];
  totalPrice: number;

  stars: boolean[];
  reviewCount: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuPvdr: MenuProvider,
    private ratingPvdr: RatingProvider, private orderPvdr: OrderProvider, private accountPvdr: AccountProvider,
    private toastCtrl: ToastController, private popoverCtrl: PopoverController) {
    this.storeInfo = this.navParams.get("storeInfo")
    this.storeInfo.openTime
    this.menuList = [];
    this.briefRating = { averageRate: 0, reviewCount: 0 }
    this.stars = [false, false, false, false, false]
    this.reviewCount = "";
    this.quantity = [];
    this.totalPrice = 0;
    console.log(this.storeInfo)
  }

  ionViewWillEnter() {
    this.initRating();
    this.initMenuList();
  }

  async initMenuList() {
    this.menuPvdr.getStoreMenus(this.storeInfo.id).then((menuList: any) => {
      this.menuList = menuList;
      this.menuList.forEach(el => {
        this.quantity.push(0)
      })
      console.log(this.menuList)
    }).catch(err => console.log(err))
  }

  async initRating() {
    this.ratingPvdr.getBriefRating(this.storeInfo.id).then((res: any) => {
      this.briefRating = res;

      for (let i = 0; i < 5; i++) {
        if (i < this.briefRating.averageRate) {
          this.stars[i] = true
        }
      }
      console.log(this.briefRating)

      if (this.briefRating.reviewCount == 0) {
        this.reviewCount = "No review";
      } else {
        if (this.briefRating.reviewCount == 0) {
          this.reviewCount = "1 review";
        } else {
          this.reviewCount = this.briefRating.reviewCount + " reviews";
        }
      }
    }).catch(err => this.reviewCount = "No review")
  }

  increment(index) {
    this.totalPrice = this.totalPrice + this.menuList[index].price;
    this.quantity[index]++;
  }

  reduction(index) {
    if (this.quantity[index] == 0) {

    } else {
      this.totalPrice = this.totalPrice - this.menuList[index].price;
      this.quantity[index]--;
    }
  }

  placeOrder() {
    if (!this.accountPvdr.loginStatus()) {
      this.displayToast('You need to be signed in to place order.')
      this.navCtrl.push('LoginPage');
      return;
    }

    if (!this.totalPrice) {
      this.displayToast('You have not selected any menu.')
      return;
    }

    let menu: { menu: MenuInfo, quantity: number }[] = [];

    this.quantity.forEach((value, index) => {
      if (value) {
        menu.push({
          menu: this.menuList[index],
          quantity: value
        })
      }
    })

    this.popoverCtrl.create('ConfirmOrderPage', {
      orderInfo: menu,
      storeInfo: this.storeInfo,
      userId: this.accountPvdr.userId
    }, { cssClass: 'contact-popover' }).present();

  }

  displayToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  openRatingPage() {
    if (this.briefRating.reviewCount == 0) {

    } else {
      this.navCtrl.push('RatingPage', { storeId: this.storeInfo.id })
    }
  }

}
