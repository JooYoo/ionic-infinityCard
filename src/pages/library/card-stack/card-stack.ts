import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, PopoverController, ViewController } from 'ionic-angular';
import { CardContentEditPage } from '../card-stack/card-content-edit/card-content-edit';
import { CardContentAddPage } from '../card-stack/card-content-add/card-content-add';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { LibraryPage } from '../library';
import { PopoverComponent } from '../../../components/popover/popover';
import { SwipePage } from '../../../pages/swipe/swipe';

@Component({
  selector: 'page-card-stack',
  templateUrl: 'card-stack.html',
})
export class CardStackPage {

  cardStack: any

  constructor(public nav: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cardService: CardServiceProvider,
    private popoverCtrl: PopoverController,
    private viewCtrl: ViewController) {
    this.cardStack = navParams.get('itemInfo')
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, { cardStackInfo: this.cardStack });
    popover.present({
      ev: ev
    });

    popover.onDidDismiss(() => {
       this.cardService.removeCardBag(this.cardStack)
      this.viewCtrl.dismiss()
    })
  }

  testRemove() {
    this.cardService.removeCardBag(this.cardStack)
    this.viewCtrl.dismiss()
    console.log(this.cardService.cardStacks.length)
  }

  openEditModal(card) {
    let editModal = this.modalCtrl.create(CardContentEditPage, { cardInfo: card, cardBagInfo: this.cardStack });
    editModal.present()
  }

  openAddModal() {
    let addModal = this.modalCtrl.create(CardContentAddPage, { cardBagInfo: this.cardStack })
    addModal.present()
  }

  editCardBag() {
    this.cardService.editCardBag(this.cardStack, this.cardStack.titleCn, this.cardStack.titleDe)
    this.nav.push(LibraryPage)
  }

  removeCard(card) {
    this.cardService.removeCard(card, this.cardStack)
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

  toSwipePage() {
    this.nav.push(SwipePage, { cardStack: this.cardStack })
  }
}
