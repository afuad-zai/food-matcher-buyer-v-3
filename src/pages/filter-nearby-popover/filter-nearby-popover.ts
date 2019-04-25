import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { StoreProvider } from '../../providers/store/store';

/**
 * Generated class for the FilterNearbyPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-nearby-popover',
  templateUrl: 'filter-nearby-popover.html',
})
export class FilterNearbyPopoverPage {

  distance: number;
  categories: string;
  location: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private storePvdr: StoreProvider, private viewCtrl: ViewController) {
    this.location = this.navParams.get('location');
    this.distance = 10;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterNearbyPopoverPage');
  }

  search() {
    if (this.distance != undefined && this.distance) {
      if (this.categories && this.categories.length) {
        this.viewCtrl.dismiss({ categories: this.categories, distance: this.distance });
      }
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
