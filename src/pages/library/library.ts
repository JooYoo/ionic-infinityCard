import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, Platform } from 'ionic-angular';
import { CardsPage } from "../library/cards/cards"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardBagAddPage } from './card-bag-add/card-bag-add';
import { CardBagEditPage } from './card-bag-edit/card-bag-edit';
import { CubeListPage } from '../../pages/library/cube-list/cube-list';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {

  libraryMode: string = "swipe"
  isAndroid: boolean = false

  constructor(public nav: NavController,
              public cardService: CardServiceProvider,
              public modalControl: ModalController,
              platform: Platform) {

    this.isAndroid = platform.is('android')
    this.libraryMode = "swipe"
  }

  openCardsPage(item) {
    this.nav.push(CardsPage, { itemInfo: item });
  }
  openCubeListPage(item){
    this.nav.push(CubeListPage, {itemInfo: item})
  }

  openCardBagAddPage() {
    const AddModal = this.modalControl.create(CardBagAddPage)
    AddModal.present()
  }
  openCardBagEditPage(item) {
    const editModal = this.modalControl.create(CardBagEditPage, { itemInfo: item })
    editModal.present()
  }
  cardBagDelete(item) {
    this.cardService.removeCardBag(item)
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
