import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

@Component({
  selector: 'page-card-bag-edit',
  templateUrl: 'card-bag-edit.html',
})
export class CardBagEditPage {

  cardBag: any
  newTitleCn:string
  newTitleDe:string

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController,
              public cardService: CardServiceProvider) {

          this.cardBag = navParams.get('itemInfo')
  }


  dismiss(){
    this.viewControl.dismiss()
  }

  editCardBag(){
    this.cardService.editCardBag(this.cardBag,this.cardBag.titleCn,this.cardBag.titleDe)
  }

}
