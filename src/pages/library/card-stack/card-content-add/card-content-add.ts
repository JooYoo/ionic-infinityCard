import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';

@Component({
  selector: 'page-card-content-add',
  templateUrl: 'card-content-add.html',
})
export class CardContentAddPage {

  cardStack: any
  textCn: string
  textDe: string
  currentDate: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewControl: ViewController,
    public cardService: CardServiceProvider,) {

    this.cardStack = navParams.get('cardBagInfo')
  }

  ionViewDidLoad() {
    this.currentDate = new Date().toISOString()
  }

  dismiss() {
    this.viewControl.dismiss()
  }

  addCard() {
    this.cardService.addCard(this.cardStack, this.textCn, this.textDe)
  }

}