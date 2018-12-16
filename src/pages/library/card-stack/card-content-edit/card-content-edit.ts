import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';


@Component({
  selector: 'page-card-content-edit',
  templateUrl: 'card-content-edit.html',
})
export class CardContentEditPage {

  card: any
  cardBag: any
  cardStatus: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public viewCtrl: ViewController,
    public cardService: CardServiceProvider) {

    this.card = navParams.get('cardInfo')
    this.cardBag = navParams.get('cardBagInfo')
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

  editCard(){
    this.cardService.editCard(this.card, this.card.textCn, this.card.textDe)
  }

  removeCard(){
    this.cardService.removeCard(this.card,this.cardBag)
  }

}
