import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-cards-detail',
  templateUrl: 'cards-detail.html',
})
export class CardsDetailPage {



  card: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController) {

    this.card = navParams.get('cardInfo')
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }






}





