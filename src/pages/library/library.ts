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
    // load Studys
    this.onDefaultStudyDb()
  }

  // load Studys Data
  onDefaultStudyDb(){
    this.dbService.list(TABLES.StudyDaily).then((data) => {
      this.cardService.studyDailys = data
      if (!this.cardService.studyDailys) {
        this.cardService.studyDailys = this.cardService.defaultStudyDailys()
        this.dbService.insert(this.cardService.defaultStudyDailys()[0],TABLES.StudyDaily)
      }
    }).then(()=>{
      this.dbService.list(TABLES.Study).then((data)=>{
        this.cardService.studys = data
        if (!this.cardService.studys) {
          this.cardService.studys = this.cardService.defaultStudys()
          this.dbService.insert(this.cardService.defaultStudys()[0],TABLES.Study)
        }
      })
    })
  }

  // load Cubes Data
  loadCubeDb() {
    //  this.dbService.list()
    this.dbService.list(TABLES.Cube).then(data => {
      this.cardService.cubes = data
      if (!this.cardService.cubes) {
        this.cardService.cubes = this.cardService.defaultCubes()
      //  console.log('[S1.5]:Library:loadCubeDb:defaultStack: ', this.cardService.cubeStacks)
      }
     // console.log('[S2]:Library:cubes: ', this.cardService.cubes)
    }).then(() => {
      this.cardService.cubeStackBuilder(this.cardService.cubeStacks, this.cardService.cubes)
     // console.log('[S3]:Library:cubeStackBuilder:CubeStacks: ', this.cardService.cubeStacks)
    })
  }
  onDefaultCubeStack() {
    this.dbService.list(TABLES.CubeStack).then(data => {
      this.cardService.cubeStacks = data
      if (!this.cardService.cubeStacks) {
        this.cardService.cubeStacks = this.cardService.defaultCubeStack()
      }
    //  console.log('[S1]:Library:cubeStacks: ', this.cardService.cubeStacks)
    }).then(() => {
      this.loadCubeDb()
    })
  }

  // load Cards Data
  loadCardDb() {
    this.dbService.list(TABLES.Card).then(data => {
      this.cardService.cards = data
      if (!this.cardService.cards) {
        this.cardService.cards = this.cardService.defaultCards()
      }
    }).then(() => {
      this.cardService.cardStackBuilder(this.cardService.cardStacks, this.cardService.cards)
    })
  }
  onDefaultCardStack() {
    this.dbService.list(TABLES.CardStack).then(data => {
      this.cardService.cardStacks = data
      if (!this.cardService.cardStacks) {
        this.cardService.cardStacks = this.cardService.defaultCardStack()
      }
    }).then(() => {
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
