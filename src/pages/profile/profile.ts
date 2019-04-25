import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar, Platform, ToastController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { CameraProvider } from '../../providers/camera/camera';
import { User } from '../../interfaces/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('navbar') navBar: Navbar;

  name: string;
  email: string;
  image: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  changes: boolean;
  changePassword: boolean;

  unregisterBackButton: any;
  alert: any;

  profile: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountPvdr: AccountProvider,
    public alertCtrl: AlertController, public platform: Platform, public toastCtrl: ToastController, private cameraPvdr: CameraProvider) {
    this.changes = false;
    this.changePassword = false;

    this.password = "";
    this.newPassword = "";
    this.confirmPassword = "";
    this.image = "";

    this.profile = {
      email: "",
      id: "",
      image: "",
      name: "",
      password: ""
    }

  }

  ionViewDidLoad() {
    this.init();
    this.unregisterBackButton = this.platform.registerBackButtonAction(() => this.backButtonClick(), 3);
    this.navBar.backButtonClick = () => this.backButtonClick();
  }

  ionViewWillLeave() {
    this.unregisterBackButton();
  }

  init() {
    this.profile.email = this.accountPvdr.email;
    this.profile.name = this.accountPvdr.name;
    this.profile.password = "";
    this.profile.image = this.accountPvdr.image;
    this.profile.id = this.accountPvdr.userId;
    this.image = this.profile.image;
  }

  getPhoto() {
    this.cameraPvdr.getPhoto().then(image => {
      this.accountPvdr.uploadProfileImage(image.path).then((res) => {
        this.image = image.webPath;
        this.profile.image = res.response.toString();
      })
    })
    // this.image = "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1551322674.3587_Y2azAt_n.jpg";
    // this.profile.image = this.image;
  }

  saveChanges() {
    if (!this.validEmail()) {
      this.displayToast("Please enter valid email address.")
      return;
    }

    if (this.profile.password != this.accountPvdr.password) {
      this.displayToast("Please enter your current password.")
      return;
    }

    if (this.changePassword) {

      if (!this.newPassword.length ) {
        this.displayToast("Please enter a new password")
        return;
      }

      if (this.newPassword.length < 6) {
        this.displayToast("Password length must have more than 6 characters.")
        return;
      }

      if (this.newPassword != this.confirmPassword) {
        this.displayToast("New password does not match.")
        return;
      }

      this.profile.password = this.newPassword;

    }

    this.alertCtrl.create({
      title: 'Profile Update',
      message: 'Update profiles?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.accountPvdr.updateProfile(this.profile).then(() => {
              this.toastCtrl.create({
                message: 'Profile information updated!',
                duration: 3000,
                position: 'bottom'
              }).present();

              this.navCtrl.pop();
            })
          }
        }
      ]
    }).present();

  }

  backButtonClick() {
    if (this.alert) {
      this.alert.dismiss();
      this.alert = null;
      //this.navCtrl.pop();
    } else {
      if (this.changes) {
        this.changes = false;
        this.showAlert();
      } else {
        this.navCtrl.pop();
      }
    }
  }

  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Unsaved changes',
      message: 'You have unsaved changes. Are you sure you wish to leave?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert = null;
            //this.navCtrl.pop();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //this.accountPvdr.updateProfile("profile data")
            this.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

  valueChanged() {
    this.changes = true;
  }

  toggleChangePassword() {
    this.changePassword = !this.changePassword;
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
    if (this.profile.email && !emailRegexp.test(this.profile.email)) {
      return false;
    } else {
      return true;
    }
  }

}
