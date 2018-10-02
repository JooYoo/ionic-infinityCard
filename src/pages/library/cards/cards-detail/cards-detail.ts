import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-cards-detail',
  templateUrl: 'cards-detail.html',
})
export class CardsDetailPage {

  card: any
  cardStatus: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController) {

    this.card = navParams.get('cardInfo')

    // get enum key
    this.cardStatus = this.getCardStatus(this.card.status)
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }


  // todo: pack to service provider
  getCardStatus(value: number) {
    if (value == 0) {
      return "success"
    }
    else if (value == 1) {
      return "failed"
    }
    else if (value == 2) {
      return "notSure"
    }
  }


}





