import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CardEditPage } from './card-edit/card-edit';
import { CardAddPage } from './card-add/card-add';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  cardBag: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
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

}
