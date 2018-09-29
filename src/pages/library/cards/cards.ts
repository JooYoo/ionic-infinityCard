import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  item: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('itemInfo')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }

}
