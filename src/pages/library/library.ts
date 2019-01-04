import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { CardStackPage } from "./card-stack/card-stack"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardStackAddPage } from './card-stack-add/card-stack-add';
import { CubeStackPage } from './cube-stack/cube-stack';
import { CubeStackAddPage } from '../library/cube-stack-add/cube-stack-add';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {
  libraryMode: string = 'swipe'
  cardStacks: any

  constructor(public nav: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.cardStacks = this.cardService.cardStacks;
  }

  // open specific card/cube Bag, display all cards or cubes
  openCardsPage(item) {
    this.nav.push(CardStackPage, { itemInfo: item });
  }
  openCubeListPage(item) {
    this.nav.push(CubeStackPage, { itemInfo: item })
  }

  // right-top add button
  onCardStackAddPage() {
    let addCardModal = this.modalCtrl.create(CardStackAddPage)
    addCardModal.present()
  }

  onCubeStackAddPage() {
    const AddModal = this.modalCtrl.create(CubeStackAddPage)
    AddModal.present()
  }


  cardBagDelete(item) {
    this.cardService.removeCardBag(item)
  }

  cubeBagDelete(item) {
    this.cardService.removeCubeBag(item)
  }

  getCubeStackColor() {
    return this.cardService.getRandomBgColor();
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
