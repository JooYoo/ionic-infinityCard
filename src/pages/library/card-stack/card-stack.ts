import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, PopoverController } from 'ionic-angular';
import { CardContentEditPage } from '../card-stack/card-content-edit/card-content-edit';
import { CardContentAddPage } from '../card-stack/card-content-add/card-content-add';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { LibraryPage } from '../library';
import { PopoverComponent } from '../../../components/popover/popover';

@Component({
  selector: 'page-card-stack',
  templateUrl: 'card-stack.html',
})
export class CardStackPage {

  cardBag: any

  constructor(public nav: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cardService: CardServiceProvider,
    private popoverCtrl: PopoverController) {
    this.cardBag = navParams.get('itemInfo')
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, { cardStackInfo: this.cardBag });
    popover.present({
      ev: ev
    });
  }

  openEditModal(card) {
    let editModal = this.modalCtrl.create(CardContentEditPage, { cardInfo: card, cardBagInfo: this.cardBag });
    editModal.present()
  }

  openAddModal() {
    let addModal = this.modalCtrl.create(CardContentAddPage, { cardBagInfo: this.cardBag })
    addModal.present()
  }

  // removeCardBag(item) {
  //   this.cardService.removeCardBag(item)
  //   this.nav.push(LibraryPage)
  // }

  editCardBag() {
    this.cardService.editCardBag(this.cardBag, this.cardBag.titleCn, this.cardBag.titleDe)
    this.nav.push(LibraryPage)
  }

  removeCard(card) {
    this.cardService.removeCard(card, this.cardBag)
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
