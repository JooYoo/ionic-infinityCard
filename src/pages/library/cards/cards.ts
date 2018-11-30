import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { CardEditPage } from './card-edit/card-edit';
import { CardAddPage } from './card-add/card-add';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { LibraryPage } from '../library';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  cardBag: any

  constructor(public nav: NavController,
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

  removeCardBag(item) {
    this.cardService.removeCardBag(item)
    this.nav.push(LibraryPage)
  }
  
  editCardBag(){
    this.cardService.editCardBag(this.cardBag,this.cardBag.titleCn,this.cardBag.titleDe)
    this.nav.push(LibraryPage)
  }

  removeCard(card){
    this.cardService.removeCard(card,this.cardBag)
  }

  closeSlidingItem(slidingItem: ItemSliding){
    slidingItem.close()
  }
}
