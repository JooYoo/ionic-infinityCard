import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CardsPage } from "../library/cards/cards"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardBagAddPage } from './card-bag-add/card-bag-add';
import { CardBagEditPage } from './card-bag-edit/card-bag-edit';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {

  constructor(public nav: NavController, 
              public cardService: CardServiceProvider, 
              public modalControl:ModalController) {
  }

  openCardsPage(item) {
    this.nav.push(CardsPage, { itemInfo: item });
  }

  openCardBagAddPage(){
   const AddModal = this.modalControl.create(CardBagAddPage)
   AddModal.present()
  }
  openCardBagEditPage(item){
    const editModal = this.modalControl.create(CardBagEditPage,{itemInfo: item})
    editModal.present()
  }

  cardBagDelete(item){
   console.log(item)
   this.cardService.removeCardBag(item)
  }
}
