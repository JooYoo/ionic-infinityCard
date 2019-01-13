import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, PopoverController, ViewController, App, ToastController } from 'ionic-angular';
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
  toast: any

  constructor(public nav: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public cardService: CardServiceProvider,
    private popoverCtrl: PopoverController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private app: App) {
    this.cardStack = navParams.get('itemInfo')
    console.log('cardStack:constructor:cardStack: ', this.cardStack)
  }

  toastSetting() {
    this.toast = this.toastCtrl.create({
      message: this.cardStack.titleCn + ' has been removed',
      duration: 3000,
      position: 'top',
      closeButtonText: 'X',
      showCloseButton: true,
      cssClass: 'toast-style'
    })
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, { cardStackInfo: this.cardStack });
    popover.present({
      ev: ev
    });

    this.toastSetting()

    popover.onDidDismiss(() => {
      this.cardService.removeCardStack(this.cardStack)
      this.toast.present()
      this.viewCtrl.dismiss()
    })
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
    // this.nav.setRoot(SwipePage, { cardStack: this.cardStack })
    this.nav.push(SwipePage, { cardStack: this.cardStack })
  }
}
