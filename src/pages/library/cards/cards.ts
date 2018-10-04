import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CardEditPage } from './card-edit/card-edit';
import { CardAddPage } from './card-add/card-add';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  cardBag: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cardService: CardServiceProvider) {
    this.cardBag = navParams.get('itemInfo')
  }

  openEditModal(card) {
    let editModal = this.modalCtrl.create(CardEditPage, { cardInfo: card });
    editModal.present()
  }

  openAddModal() {
    let addModal = this.modalCtrl.create(CardAddPage, { cardBagInfo: this.cardBag })
    addModal.present()
  }

  removeCard(card){
    this.cardService.removeCard(card,this.cardBag)
  }

}
