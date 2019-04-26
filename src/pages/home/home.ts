import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { GoogleMapsComponent } from '../../components/google-maps/google-maps';

import { StoreProvider } from '../../providers/store/store'

import { StoreInfo } from '../../interfaces/store';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(GoogleMapsComponent) mapComponent: GoogleMapsComponent;

  constructor(public navCtrl: NavController, public storePvdr: StoreProvider, public events: Events,
    public alertCtrl: AlertController, public popoverCtrl: PopoverController, private toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
    this.events.subscribe('map:loaded', () => {
      this.getNearbyStore();
    })
  }

  resetCamera() {
    this.mapComponent.resetCamera()
  }


  getNearbyStore() {
    let location = this.mapComponent.getCurrentLocation();
    this.storePvdr.getNearbyStores(location.lat, location.lon).then((data: StoreInfo[]) => {
      this.mapComponent.removeMarker();

      data.forEach((store: StoreInfo) => {
        this.mapComponent.addMarker(store);
      })

    }).catch(()=>{})

  }
  filterNearbyStore(data) {
    let location = this.mapComponent.getCurrentLocation();

    this.storePvdr.filterNearbyStores(location.lat, location.lon, data.distance, data.categories).then((data: StoreInfo[]) => {
      this.mapComponent.removeMarker();
      let count = 0;
      data.forEach((store: StoreInfo) => {
        this.mapComponent.addMarker(store);
        count++;
      })
      if (count == 1)
        this.displayToast(`There is a store nearby.`)
      else {
        this.displayToast(`There are ${count} stores nearby.`)
      }

    }).catch(err => {
      this.displayToast("No nearby store fits search query.")
    })
  }

  showPopover() {
    let popover = this.popoverCtrl.create('FilterNearbyPopoverPage', { location: location })

    popover.present();

    popover.onDidDismiss((data) => {
      console.log(data)
      if (data)
        this.filterNearbyStore(data);
    })

  }

  displayToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
}
