import { Component,ChangeDetectionStrategy  } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding, Platform } from 'ionic-angular';
import { CardsPage } from "../library/cards/cards"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardBagAddPage } from './card-bag-add/card-bag-add';
import { CardBagEditPage } from './card-bag-edit/card-bag-edit';
import { CubeBagEditPage } from '../library/cube-bag-edit/cube-bag-edit';
import { CubeListPage } from '../../pages/library/cube-list/cube-list';
import { CubeBagAddPage } from '../library/cube-bag-add/cube-bag-add';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {

  libraryMode: string = "swipe"
  isAndroid: boolean = false
  cubeWrapperColor: string

  constructor(public nav: NavController,
              public cardService: CardServiceProvider,
              public modalControl: ModalController,
              platform: Platform) {

    this.isAndroid = platform.is('android')
    this.libraryMode = "swipe"

    this.cubeWrapperColor = "#9C27B0"
  }

  // open specific card/cube Bag, display all cards or cubes
  openCardsPage(item) {
    this.nav.push(CardsPage, { itemInfo: item });
  }
  openCubeListPage(item){
    this.nav.push(CubeListPage, {itemInfo: item})
  }

  // right-top add button
  openCardBagAddPage() {
    const AddModal = this.modalControl.create(CardBagAddPage)
    AddModal.present()
  }
  openCubeBagAddPage(){
    const AddModal = this.modalControl.create(CubeBagAddPage)
    AddModal.present()
  }

  // swipe item: edit cardBag / cubeBag
  openCardBagEditPage(item) {
    const editModal = this.modalControl.create(CardBagEditPage, { itemInfo: item })
    editModal.present()
  }
  openCubeBagEditPage(item){
    const cubeEditModal = this.modalControl.create(CubeBagEditPage, {itemInfo:item})
    cubeEditModal.present()
  }

  cardBagDelete(item) {
    this.cardService.removeCardBag(item)
  }
  
  cubeBagDelete(item){
    console.log("inside cubeBagDelete")
    this.cardService.removeCubeBag(item)
  }

  getCubeStackColor(){
    return this.cardService.getRandomBgColor();
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
