import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BriefRating, DetailRating, PostRating } from '../../interfaces/rating';
import { AccountProvider } from '../account/account';

/*
  Generated class for the RatingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RatingProvider {
  url: string;
  constructor(public http: HttpClient, private accountPvdr: AccountProvider) {
    this.url = "http://35.247.136.6:3000/users";
  }

  getBriefRating(storeId: String) {
    let api = `${this.url}/${storeId}/rating-brief`;
    return new Promise((resolve, reject) => {
      this.http.get(api)
        .subscribe((data: any) => {
          if (data.err) {
            reject(data.err)
          }
          resolve(data)
        })
    })
  }

  getDetailRating(storeId: String) {
    let api = `${this.url}/${storeId}/rating`;
    return new Promise((resolve, reject) => {
      this.http.get(api)
        .subscribe((data: any) => {
          if (data.err) {
            reject(data.err)
          }
          resolve(data.ratingList)
        })
    })
  }

  postRating(rating: PostRating) {
    let api = `${this.url}/${this.accountPvdr.userId}/rating`;
    return new Promise((resolve, reject) => {
      this.http.post(api, rating)
        .subscribe((data: any) => {
          console.log(data)
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
    })
  }

}