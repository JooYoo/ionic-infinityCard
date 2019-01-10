import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { CardStackPage } from "./card-stack/card-stack"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardStackAddPage } from './card-stack-add/card-stack-add';
import { CubeStackPage } from './cube-stack/cube-stack';
import { Storage } from '@ionic/storage';
import { CubeStackAddPage } from '../library/cube-stack-add/cube-stack-add';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

const win: any = window;
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage {
  libraryMode: string = 'swipe'
  sqlMode: boolean = false

  constructor(public nav: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public modalCtrl: ModalController,
    private storageService: StorageServiceProvider,
    private storage: Storage) {
    if (win.sqlitePlugin) {
      this.sqlMode = true
    } else {
      console.warn('SQLite plugin not installed. Falling back to regular Web Storage.')
    }
  }

  ionViewCanEnter() {
    // load Cubes
    this.onDefaultCubeStack()
    // load Cards 
    this.onDefaultCardStack()
  }


  onCubeSql() { //SQLite
    // this.storage.length().then(length => {
    // if (length < 1) {
    //   this.cardService.defaultCubeData()
    //   console.log('library:cubeStacks:length0', this.cardService.cubeStacks)
    // } else {
    this.storageService.storageGetAllCubeStacks().then(data => {
      this.cardService.cubeStacks = data
      // if (this.cardService.cubeStacks[0] === undefined) {
      //   this.cardService.cubeStacks.push(this.cardService.defaultCubeData())
      // }
      console.log('library:cubeStacks:length!0', this.cardService.cubeStacks)
    })

    // }
    // })
  }


  onDefaultCubeStack() {
    if (this.sqlMode) { // SQLite
      this.onCubeSql()
      console.log('library:cubeStacks:sqlite')
    } else { // Web SQL
      // if (this.cardService.cubeStacks.length === 0) {
      //   this.cardService.cubeStacks.push(this.cardService.defaultCubeData())
      // }
      console.log('library:cubeStacks:WebSQL', this.cardService.cubeStacks)
    }
  }


  onDefaultCardStack() {
    //this.storage.length().then(cardStacksLength => {
    // if (cardStacksLength === 0) {
    //   this.cardService.defaultCardData()
    //   this.storageService.storageAddCubeStack(this.cardService.cardStacks[0])
    //   console.log('library:cardStacks:length0', this.cardService.cardStacks)
    // } else {

    this.storageService.storageGetAllCardStacks().then(data => {
      this.cardService.cardStacks = data

      // if (this.cardService.cardStacks[0] === undefined) {
      //   this.cardService.cardStacks.push(this.cardService.defaultCardData())
      // }
      console.log('library:cardStacks:length!0', this.cardService.cardStacks)
    })


    // }
    //})
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

  // cubeBagDelete(item) {
  //   this.cardService.removeCubeStack(item)
  // }
  getCubeStackColor() {
    return this.cardService.getRandomBgColor();
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
