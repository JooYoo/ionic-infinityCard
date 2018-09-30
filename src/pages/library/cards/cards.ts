import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CardsDetailPage } from './cards-detail/cards-detail';


@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  item: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.item = navParams.get('itemInfo')
  }

  
  openModal(card) {
  
    let modal = this.modalCtrl.create(CardsDetailPage,{cardInfo:card});
    modal.present();
  }

}
