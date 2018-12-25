import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,App } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { LibraryPage } from '../library';

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
    public cardService: CardServiceProvider,
    public appCtrl: App) {
  }

  dismiss() {
     this.tabInfo = "swipe"
     this.navCtrl.push(LibraryPage, { tabInfo: this.tabInfo })
    
    this.viewCtrl.dismiss()
   
    
    console.log(this.cardService.cardStacks.length)
  }

  addCardBag() {
    this.cardService.addCardBag(this.titleCn, this.titleDe, "icon", 0)
  }

}
