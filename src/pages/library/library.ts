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
    this.storageService.storageGetAllCubeStacks().then(data => {
      this.cardService.cubeStacks = data
      console.log('library:cubeStacks:', this.cardService.cubeStacks)
    })

    //FIXME: first load show example data
    // this.storage.length().then(cubeStacksLength =>{
    //   if(cubeStacksLength === 0){
    //     this.cardService.cubeStacks = this.cardService.defaultCubeData()
    //     //this.storageService.storageAddCubeStack(this.cardService.cubeStacks[0])
    //   }
    // })
  }

  onDefaultCubeStack() {
    if (this.sqlMode) { // SQLite
      this.onCubeSql()
      console.log('library:cubeStacks:sqlite')
    } else { // Web SQL
      this.cardService.cubeStacks = this.cardService.defaultCubeData()
      console.log('library:cubeStacks:WebSQL', this.cardService.cubeStacks)
    }
  }

  onDefaultCardStack() {
    this.storageService.storageGetAllCardStacks().then(data => {
      this.cardService.cardStacks = data
      console.log('library:cardStack: ', this.cardService.cardStacks)
    })

    //FIXME: first load show example data
    // this.storage.length().then(cardStackLength => {
    //   if (cardStackLength === 0) {
    //     this.cardService.cardStacks = this.cardService.defaultCardData()
    //     //this.storageService.storageAddCardStack(this.cardService.cardStacks[0])
    //   }
    // })
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
  getCubeStackColor() {
    return this.cardService.getRandomBgColor();
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
