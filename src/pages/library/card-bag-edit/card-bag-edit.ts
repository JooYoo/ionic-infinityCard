import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-card-bag-edit',
  templateUrl: 'card-bag-edit.html',
})
export class CardBagEditPage {

  cardBag: any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController) {

          this.cardBag = navParams.get('itemInfo')
  }


  dismiss(){
    this.viewControl.dismiss()
  }

}
