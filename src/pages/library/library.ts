import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { CardStackPage } from "./card-stack/card-stack"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardStackAddPage } from './card-stack-add/card-stack-add';
import { CubeStackPage } from './cube-stack/cube-stack';
import { Storage } from '@ionic/storage';
import { CubeStackAddPage } from '../library/cube-stack-add/cube-stack-add';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

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
    public modalCtrl: ModalController,
    private storageService: StorageServiceProvider,
    private storage: Storage) { }

  ionViewDidLoad() {
    // load Cubes data to app
    this.onDefaultCubeStack()

    // load Cards data to app
    this.onDefaultCardStack()
    this.storageService.storageGetAllCardStacks().then(data => {
      this.cardStacks = data
      this.cardService.cardStacks = data
      console.log('library:cardStacks:', this.cardStacks)
    })
  }

  onDefaultCubeStack() {
    
    if (this.storageService.sqlMode) { // SQLite
      this.storage.length().then(cubeStacksLength => {
        if (cubeStacksLength === 0) { // first time load
          let defaultCubeStack = this.cardService.defaultCubeData()
          this.cardService.cubeStacks.push(defaultCubeStack)
          this.storageService.storageAddCubeStack(defaultCubeStack)
          console.log('library:cubeStacks:', this.cardService.cubeStacks)
        } else { // normal load
          this.storageService.storageGetAllCubeStacks().then(data => {
            this.cardService.cubeStacks = data
            console.log('library:cubeStacks:', this.cardService.cubeStacks)
          })
        }
      })
    } else { // Web SQL
      let defaultCubeStack = this.cardService.defaultCubeData()
      this.cardService.cubeStacks.push(defaultCubeStack)
      console.log('library:cubeStacks:', this.cardService.cubeStacks)
    }

  }

  onDefaultCardStack() {
    this.storage.length().then(cardStacksLength => {
      if (cardStacksLength === 0) {
        let defaultStack = this.cardService.defaultData()
        this.cardService.cardStacks.push(defaultStack)
        this.storageService.storageAddCardStack(defaultStack)
      }
    })
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
