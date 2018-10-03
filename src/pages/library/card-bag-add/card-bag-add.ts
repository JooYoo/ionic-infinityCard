import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

@Component({
  selector: 'page-card-bag-add',
  templateUrl: 'card-bag-add.html',
})
export class CardBagAddPage {

  titleCn:string
  titleDe:string

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public cardService: CardServiceProvider) {
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  addCardBag(){
    this.cardService.addCardBag(this.titleCn, this.titleDe, "icon")
  }

}
