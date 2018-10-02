import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-card-bag-add',
  templateUrl: 'card-bag-add.html',
})
export class CardBagAddPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

}
