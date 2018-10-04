import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';

@Component({
  selector: 'page-card-add',
  templateUrl: 'card-add.html',
})
export class CardAddPage {

  cardBag: any
  textCn: string
  textDe: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewControl: ViewController,
    public cardService: CardServiceProvider) {

    this.cardBag = navParams.get('cardBagInfo')
  }

  dismiss() {
    this.viewControl.dismiss()
  }

  addCard() {

    this.cardService.addCard(this.cardBag, this.textCn, this.textDe)
    console.log('cardBagInfo: ' + this.cardBag.titleCn)
  }

}