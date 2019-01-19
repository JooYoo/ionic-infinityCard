import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { SwipeServiceProvider } from '../../providers/swipe-service/swipe-service';
import { MistakePage } from '../swipe/mistake/mistake';
import { DbServiceProvider, TABLES } from '../../providers/db-service/db-service';

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
    public platform: Platform,
    public modalCtrl: ModalController,
    public dbService: DbServiceProvider) { }

  ionViewDidEnter() {
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
    this.dbService.update(this.cardStack, TABLES.CardStack)

    this.swipeIndex++
    
    this.swipeService.addToFailedCardStack(event.like, currentCard)
    this.failedCardLength = this.cardService.failedCardBag.cards.length

    // write to StudyDb
    this.cardService.addStudy(this.cardStack.titleCn, this.cardStack.progress)
    
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

    // this.storage.length().then(cardStacksLength => {
    //this.onDefaultStack(cardStacksLength)

    // let cardStacksLength = this.cardService.cardStacks.length
    // console.log('swipe:cardStacksLength:', cardStacksLength)
    // this.randomIndex = this.swipeService.getRandomNr(cardStacksLength)
    // this.cardStack = this.cardService.cardStacks[this.randomIndex]
    // console.log('swipe:randomIndex: ', this.randomIndex)
    // console.log('swipe:cardStack:', this.cardStack)

    // try {
    //   this.initCards(this.cardStack.cards)
    // } catch (error) {
    //   console.log('swipe:no cards')
    // }
    // try {
    //   this.cardStack.progress = this.progressValue
    // } catch (error) {
    //   console.log('swipe:no progress')
    // }
    // })

    this.randomIndex = this.swipeService.getRandomNr(this.cardService.cardStacks.length)
    this.cardStack = this.cardService.cardStacks[this.randomIndex]
    console.log('swipe:', this.cardStack)
    this.initCards(this.cardStack!.cards)
    this.cardStack.progress = this.progressValue
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
