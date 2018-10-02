import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CardsPage } from "../library/cards/cards"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardBagAddPage } from './card-bag-add/card-bag-add';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})



export class LibraryPage {

  items = [];

  constructor(public nav: NavController, cardService: CardServiceProvider, public modalControl:ModalController) {

    this.items = cardService.cardBags
    
  }

  openCardsPage(item) {
    this.nav.push(CardsPage, { itemInfo: item });
  }

  openCardBagAddPage(){
   const modal = this.modalControl.create(CardBagAddPage)
   modal.present()
    
  }
}
