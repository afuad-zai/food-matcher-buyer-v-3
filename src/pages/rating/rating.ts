import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RatingProvider } from '../../providers/rating/rating';
import { DetailRating } from '../../interfaces/rating'
/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  storeId: string;
  ratingList: DetailRating[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ratingPvdr: RatingProvider) {
    this.storeId = navParams.get("storeId");
    this.ratingList = [];
  }

  ionViewDidLoad() {
    this.ratingPvdr.getDetailRating(this.storeId).then((ratingList:DetailRating[])=>{
      this.ratingList = ratingList;
      console.log(this.ratingList)
    }).catch(()=>{

    });
  }

}
