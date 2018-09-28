import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardServiceProvider } from '../../providers/card-service/card-service';

@Component({
  selector: 'page-standard',
  templateUrl: 'standard.html',
})
export class StandardPage {

  testString: string

  constructor(cardService:CardServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.testString = cardService.cardBags[0].title
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandardPage');
  }

}
