import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { trigger, transition, useAnimation, state, style, animate, keyframes } from '@angular/animations';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { SwipeServiceProvider } from '../../providers/swipe-service/swipe-service';
import { MistakePage } from '../swipe/mistake/mistake';
import { Storage } from '@ionic/storage';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';


@Component({
  selector: 'page-swipe',
  templateUrl: 'swipe.html',
  animations: []
})
export class SwipePage {

  cards = []
  studyCards: any
  randomIndex: number
  swipeIndex: number
  failedCardLength: any
  failedCards: any
  progressValue: number = 0
  cardStack: any

  cardBagMode: string = "standard"

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: { backgroundColor: '#008975' },
    dislike: { backgroundColor: '#e92828' }
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public swipeService: SwipeServiceProvider,
    private storage: Storage,
    private storageService: StorageServiceProvider,
    public platform: Platform,
    public modalCtrl: ModalController) {

    this.cardService.getAllCardStacks()


     }

  ionViewCanEnter() {
    
  }


  ionViewDidEnter() { // load data first then start the game
    this.studyCardSwitch()
  }

  studyCardSwitch() { // 1. come from library 2. this page random
    this.studyCards = this.navParams.get("cardStack")
    if (this.studyCards != undefined) {
      this.cardStack = this.studyCards
      this.initCards(this.studyCards.cards)
    }
    else {
      this.startNewRound()
    }
  }


  onCardInteract(event) {
    // swipe to change card status
    let swipeResult = event.like
    let currentCard = this.cards[this.swipeIndex]

    // change card status 
    this.swipeService.changeCardStatue(swipeResult, currentCard)

    // progress value
    this.progressValue += this.swipeService.onProgress(swipeResult, this.cards)
    this.cardStack.progress = this.progressValue

    this.swipeIndex++
    //TODO: save current card into new stack
    this.swipeService.addToFailedCardStack(event.like, currentCard)
    this.failedCardLength = this.cardService.failedCardBag.cards.length
  }

  onMistake() {
    let modal = this.modalCtrl.create(MistakePage)
    modal.present()
  }

  // review failed Btn
  reviewFailedCards() {
    this.initCards(this.cardService.failedCardBag.cards)
  }



  // new Round Btn
  startNewRound() {

    this.storage.length().then(cardStacksLength => {
      this.onDefaultStack(cardStacksLength)

      this.randomIndex = this.swipeService.getRandomNr(cardStacksLength)
      this.cardStack = this.cardService.cardStacks[this.randomIndex]
      console.log('swipe:randomIndex: ', this.randomIndex)
      console.log('swipe:cardStack:', this.cardStack)

      try {
        this.initCards(this.cardStack.cards)
      } catch (error) {
        console.log('no cards')
      }

      try {
        this.cardStack.progress = this.progressValue
      } catch (error) {
        console.log('no progress')
      }

    })

    // this.randomIndex = this.swipeService.getRandomNr(this.cardService.cardStacks.length)
    // this.cardStack = this.cardService.cardStacks[this.randomIndex]
    // console.log('swipe:',this.cardStack)
    // this.initCards(this.cardStack!.cards)
    // this.cardStack.progress = this.progressValue
  }

  onDefaultStack(cardStacksLength) {
    if (cardStacksLength === 0) {
      let defaultStack = this.cardService.defaultData()
      this.cardService.cardStacks.push(defaultStack)
      this.storageService.storageAddCardStack(defaultStack)
    }
  }

  // repeat Round Btn
  repeatRound() {
    this.cardStack.progress = this.progressValue
    this.initCards(this.cards)
  }

  // display cards
  initCards(cards: any[]) {
    this.swipeIndex = 0
    this.attendants = [];
    console.log('initCards:')
    this.cards = cards

    for (let i = 0; i < this.cards.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        fronts: this.cards[i].textCn,
        backs: this.cards[i].textDe
      });
    }
    this.ready = true;

    this.progressValue = 0
  }

}
