import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, Platform, Modal } from 'ionic-angular';
import { CardStackPage } from "./card-stack/card-stack"
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
  cardStacks: any

  constructor(public nav: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public modalCtrl: ModalController,
    private zone: NgZone) {

    //this.isAndroid = platform.is('android')
    //this.tabInfo = navParams.get("tabInfo")

    // CubeStackEditPage: hit save Btn go back to CubeStackPage
    // if (this.tabInfo != undefined) {
    //   this.libraryMode = this.tabInfo
    //   return
    // }

    this.cardStacks = this.cardService.cardStacks;

    this.libraryMode = "swipe"
  }

  // open specific card/cube Bag, display all cards or cubes
  openCardsPage(item) {
    this.nav.push(CardStackPage, { itemInfo: item });
  }
  openCubeListPage(item) {
    this.nav.push(CubeStackPage, { itemInfo: item })
  }

  // right-top add button
  openCardBagAddPage() {
    let addCardModal = this.modalCtrl.create(CardStackAddPage)

    addCardModal.onDidDismiss(() => {
      this.cardStacks = this.cardService.cardStacks
    })

    addCardModal.present()

  }

  openCubeBagAddPage() {
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
