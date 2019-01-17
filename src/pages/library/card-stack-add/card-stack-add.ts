import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service';

@Component({
  selector: 'page-card-stack-add',
  templateUrl: 'card-stack-add.html',
})
export class CardStackAddPage {

  titleCn: string
  titleDe: string
  tabInfo: string
  currentDate: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public cardService: CardServiceProvider,
    private storage: StorageServiceProvider) { }

  ionViewDidLoad() {
    this.currentDate = new Date().toISOString()
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  addCardStack() {
    this.cardService.addCardStack(this.titleCn, this.titleDe, 0)
    //  let newCardStack = this.cardService.cardStacks[this.cardService.cardStacks.length - 1]

    // this.storage.storageAddCardStack(newCardStack)
  }



}
