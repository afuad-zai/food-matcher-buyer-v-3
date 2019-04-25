import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  password2: string;
  opt: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private accountPvdr: AccountProvider, private toastCtrl: ToastController) {
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.opt = 'signin';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doSignin() {
    if (!this.validEmail()) {
      this.displayToast("Please enter valid email address.")
      return;
    }

    if (this.password.length < 6) {
      this.displayToast("Password length must have more than 6 characters.")
      return;
    }

    this.accountPvdr.login(this.email, this.password).then(() => {
      this.displayToast("You have signed in.");
      this.navCtrl.pop();
    }).catch((status) => {
      this.displayToast(status);
    })
  }

  doSignup() {
    if (!this.validEmail()) {
      this.displayToast("Please enter valid email address.")
      return;
    }

    if (this.password.length < 6) {
      this.displayToast("Password length must have more than 6 characters.")
      return;
    }

    if (this.password != this.password2) {
      this.displayToast("Password does not match.")
      return;
    }

    this.accountPvdr.signup(this.email, this.password).then((status) => {
      return this.accountPvdr.login(this.email, this.password)
    }).then(() => {
      this.displayToast("You have signed up and logged in.");
      this.navCtrl.pop();
    }).catch((err) => {
      this.displayToast(err);
    })
  }

  displayToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  validEmail() {
    var emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (this.email && !emailRegexp.test(this.email)) {
      return false;
    } else {
      return true;
    }
  }

}
