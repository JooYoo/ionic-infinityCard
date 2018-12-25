import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardStackAddPage } from '../library/card-stack-add/card-stack-add';
import { CubeStackAddPage } from '../library/cube-stack-add/cube-stack-add';
import { CardStackPage } from '../library/card-stack/card-stack';
import { CubeStackPage } from '../library/cube-stack/cube-stack';

@Component({
  selector: 'page-card-hub',
  templateUrl: 'card-hub.html',
})
export class CardHubPage {

  cardStacks: any
  libraryMode: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public modalCtrl: ModalController) {

    this.cardStacks = this.cardService.cardStacks;
    this.libraryMode = 'swipe'
  }

  // Fab Btn: add card/cub stack
  onCardStackAddPage() {
    let addCardStackMdl = this.modalCtrl.create(CardStackAddPage)
    addCardStackMdl.present()
  }

  onCubeStackAddPage() {
    const AddModal = this.modalCtrl.create(CubeStackAddPage)
    AddModal.present()
  }

  // open specific card/cube Bag, display all cards or cubes
  openCardsPage(item) {
    this.navCtrl.push(CardStackPage, { itemInfo: item });
  }
  openCubeListPage(item) {
    this.navCtrl.push(CubeStackPage, { itemInfo: item })
  }



  cardBagDelete(item) {
    this.cardService.removeCardBag(item)
  }

  cubeBagDelete(item) {
    this.cardService.removeCubeBag(item)
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

}
