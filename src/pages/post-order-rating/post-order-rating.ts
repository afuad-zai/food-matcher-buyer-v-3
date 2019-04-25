import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { PostRating } from '../../interfaces/rating';
import { RatingProvider } from '../../providers/rating/rating';

/**
 * Generated class for the PostOrderRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-order-rating',
  templateUrl: 'post-order-rating.html',
})
export class PostOrderRatingPage {

  rating: PostRating;
  star: boolean[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ratingPvdr: RatingProvider,
    private alertCtrl: AlertController, private toastCtrl: ToastController, public viewCtrl: ViewController) {
    this.rating = {
      target: navParams.get("target"),
      ratedBy: navParams.get("ratedBy"),
      comment: "",
      date: "",
      rate: 0,
      orderId: navParams.get("orderId")
    }
    this.star = [false, false, false, false, false]
    console.log(this.rating)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostOrderRatingPage');
  }

  toggleStar(index) {
    this.star.forEach((star, i) => {
      if (i <= index) {
        this.star[i] = true;
      } else {
        this.star[i] = false;
      }
    })
  }

  confirmReview() {
    let count = 0;
    this.star.forEach(value => {
      if (value)
        count++;
    })

    if (count == 0) {
      this.displayToast("Please tap on the stars to rate your satisfaction on this order.")
      return;
    }

    this.alertCtrl.create({
      title: 'Submit Review',
      message: 'This action cannot be undone. Do you wish to submit this review?',
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
            this.submitReview(count);
          }
        }
      ]
    }).present();
  }

  submitReview(starCount: number) {
    this.rating.rate = starCount;
    this.ratingPvdr.postRating(this.rating).then((res: any) => {
      this.displayToast("Review has been submitted.")
      this.viewCtrl.dismiss({ status: "success", userRating: res.ratingId });
    }).catch((err) => {
      //this.displayToast("Something went wrong. Review has not been submitted.")
      this.displayToast("test")
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
