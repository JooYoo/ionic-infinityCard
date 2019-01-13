import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ItemSliding } from 'ionic-angular';
import { CardStackPage } from "./card-stack/card-stack"
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { CardStackAddPage } from './card-stack-add/card-stack-add';
import { CubeStackPage } from './cube-stack/cube-stack';
import { Storage } from '@ionic/storage';
import { CubeStackAddPage } from '../library/cube-stack-add/cube-stack-add';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { DbServiceProvider, TABLES } from '../../providers/db-service/db-service';

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
    private dbService: DbServiceProvider) {
    if (win.sqlitePlugin) {
      this.sqlMode = true
    } else {
      console.warn('SQLite plugin not installed. Falling back to regular Web Storage.')
    }
  }

  ionViewDidLoad() {


    // load CardStack 
    this.onDefaultCardStack()

    // load Cubes
    this.onDefaultCubeStack()
  }

  onCubeSql() { //SQLite
    this.storageService.storageGetAllCubeStacks().then(data => {
      this.cardService.cubeStacks = data

      //console.log('library:cubeStacks:', this.cardService.cubeStacks)
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
    // if (this.sqlMode) { // SQLite
    //   this.onCubeSql()
    //   console.log('library:cubeStacks:sqlite')
    // } else { // Web SQL
    //   this.cardService.cubeStacks = this.cardService.defaultCubeData()
    //   console.log('library:cubeStacks:WebSQL', this.cardService.cubeStacks)
    // }
    this.dbService.list(TABLES.Cube).then(data => {
      this.cardService.cubeStacks = data
      if (!this.cardService.cubeStacks) {
        this.cardService.cubeStacks = this.cardService.defaultCubeData()
      }
      //console.log('Library:cubeStack: ', this.cardService.cubeStacks)
    })
  }

  loadCardDb() {
    this.dbService.list(TABLES.Card).then(data => {
      this.cardService.cards = data
      if(!this.cardService.cards){
      //TODO: [DefaultCards]
         this.cardService.cards = this.cardService.defaultCards()
        //this.cardService.cardStackBuilder(this.cardService.defaultCardStack(), this.cardService.defaultCards())

        console.log('[S1.5]:Library:loadCardDb:defaultStack: ', this.cardService.cardStacks)
      }
      console.log('[S2]:Library:cards: ', this.cardService.cards)
    }).then(()=>{
      this.cardService.cardStackBuilder(this.cardService.cardStacks, this.cardService.cards)
      console.log('[S3]:Library:cardStackBuilder:CardStacks: ', this.cardService.cardStacks)
    })
  }
  
  onDefaultCardStack() {
    
    this.dbService.list(TABLES.CardStack).then(data => {
      this.cardService.cardStacks = data
      if (!this.cardService.cardStacks) {
        this.cardService.cardStacks = this.cardService.defaultCardStack()
      }
      console.log('[S1]:Library:cardStacks: ', this.cardService.cardStacks)
    }).then(() => {
      // load Cards
      this.loadCardDb()
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
  getCubeStackColor() {
    return this.cardService.getRandomBgColor();
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }
}
