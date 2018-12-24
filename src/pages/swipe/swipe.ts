import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { trigger, transition, useAnimation, state, style, animate, keyframes } from '@angular/animations';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { SwipeServiceProvider } from '../../providers/swipe-service/swipe-service';


@Component({
  selector: 'page-swipe',
  templateUrl: 'swipe.html',
  animations: [
    trigger('FlipAnim', [
      state('goFlip', style({
        transform: 'rotateY(180deg)'
      })),
      state('goBack', style({
        transform: 'rotateY(0)'
      })),
      transition('goFlip => goBack', animate('200ms ease-out')),
      transition('goBack => goFlip', animate('400ms ease-in')),

      // if display back to swipe, then show font 
      state('goQuickBack', style({
        transform: 'rotateY(0deg)'
      })),
      transition('goFlip => goQuickBack', animate('0.000001ms ease-out'))
    ]),
  ]
})
export class SwipePage {

  cards = []
  studyCards: any
  nextCardBag: number
  swipeIndex: number
  failedCardLength: any
  progressValue: number = 0
  cardStack:any

  cardBagMode: string = "standard"
  isAndroid: boolean = false

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
    platform: Platform) {
    this.isAndroid = platform.is('android')

    this.studyCardSwitch()
  }

  onFiling(){
    console.log('in Filing')
  }

  studyCardSwitch() { // 1. come from library 2. this page random
    this.studyCards = this.navParams.get("cardStack")
    if (this.studyCards != undefined) {
      this.cardStack=this.studyCards
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
    this.cardStack.progress=this.progressValue
    this.swipeIndex++

    //TODO: save current card into new stack
    this.swipeService.addToFailedCardStack(event.like, currentCard)
    this.failedCardLength = this.cardService.failedCardBag.cards.length
  }

  isFlip: string = 'goBack';
  toggleFlip() {
    this.isFlip = (this.isFlip == 'goBack') ? 'goFlip' : 'goBack';
  }

  // review failed Btn
  reviewFailedCards() {
    this.initCards(this.cardService.failedCardBag.cards)
  }

  // new Round Btn
  startNewRound() {
   
    this.nextCardBag = this.swipeService.getRandomCardBag(this.cardService.cardStacks.length)
    this.cardStack=this.cardService.cardStacks[this.nextCardBag]
    this.initCards(this.cardStack.cards)
    this.cardStack.progress=this.progressValue
  }

  // repeat Round Btn
  repeatRound() {
    this.cardStack.progress=this.progressValue
    this.initCards(this.cards)
  }

  // display cards
  initCards(cards: any[]) {
    this.swipeIndex = 0
    this.attendants = [];
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
