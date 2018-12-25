import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

@Component({
  selector: 'page-card-stack-add',
  templateUrl: 'card-stack-add.html',
})
export class CardStackAddPage {

  titleCn: string
  titleDe: string
  tabInfo: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public cardService: CardServiceProvider) {
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  addCardBag() {
    this.cardService.addCardBag(this.titleCn, this.titleDe, "icon", 0)
  }
}
