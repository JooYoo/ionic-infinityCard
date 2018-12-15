import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, Platform } from 'ionic-angular';
import { CardsPage } from "../library/cards/cards"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardStackAddPage } from './card-stack-add/card-stack-add';
import { CubeStackPage } from './cube-stack/cube-stack';
import { CubeStackAddPage } from '../library/cube-stack-add/cube-stack-add';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {

  libraryMode: string
  isAndroid: boolean = false
  cubeWrapperColor: string
  tabInfo: any

  constructor(public nav: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public modalControl: ModalController,
    platform: Platform) {

    this.isAndroid = platform.is('android')
    this.tabInfo = navParams.get("tabInfo")

    // CubeStackEditPage: hit save Btn go back to CubeStackPage
    console.log("libaray.tabInfo:" + this.tabInfo)
    if (this.tabInfo != undefined) {
      this.libraryMode = this.tabInfo
      return
    }

    this.libraryMode = "swipe"
  }

  // open specific card/cube Bag, display all cards or cubes
  openCardsPage(item) {
    this.nav.push(CardsPage, { itemInfo: item });
  }
  openCubeListPage(item) {
    this.nav.push(CubeStackPage, { itemInfo: item })
  }

  // right-top add button
  openCardBagAddPage() {
    const AddModal = this.modalControl.create(CardStackAddPage)
    AddModal.present()
  }
  openCubeBagAddPage() {
    const AddModal = this.modalControl.create(CubeStackAddPage)
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
