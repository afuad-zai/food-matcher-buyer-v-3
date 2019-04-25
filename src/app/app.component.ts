import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccountProvider } from '../providers/account/account';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public accountPvdr: AccountProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    //Home, Order, Setting, Support
    this.pages = [
      { title: 'Order', component: 'OrderPage' },
      { title: 'Setting', component: 'SettingPage' },
      { title: 'Support', component: 'SupportPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if ("HomePage" == page) {
      this.nav.popToRoot()
    } else {
      this.nav.push(page);
    }
  }

  login() {
    this.nav.push('LoginPage');
  }

  logout() {
    this.alertCtrl.create({
      title: 'Sign out',
      message: 'Do you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sign out',
          handler: () => {
            this.accountPvdr.logout().then(() => {
              this.toastCtrl.create({
                message: 'You have signed out!',
                duration: 3000,
                position: 'top'
              }).present();
            })
          }
        }
      ]
    }).present();
  }
}
