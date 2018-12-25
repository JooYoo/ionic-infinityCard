import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SwipeServiceProvider } from '../../../providers/swipe-service/swipe-service';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

@Component({
  selector: 'page-mistake',
  templateUrl: 'mistake.html',
})
export class MistakePage {

  cards: any
  failedCardLength: number
  failedCards: any
  progressValue: number = 0

  ready = false;
  attendants = [];
  cardDirection = "xy";
  swipeIndex: number
  cardOverlay: any = {
    like: { backgroundColor: '#008975' },
    dislike: { backgroundColor: '#e92828' }
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public swipeService: SwipeServiceProvider,
    public cardService: CardServiceProvider) {

    this.failedCardLength = this.cardService.failedCardBag.cards.length
    this.failedCards = this.cardService.failedCardBag.cards
    this.initCards(this.failedCards)
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  // repeat Round Btn
  repeatRound() {
    //this.cardStack.progress = this.progressValue
    this.failedCardLength = this.cardService.failedCardBag.cards.length
    this.initCards(this.cards)
  }

  onCardInteract(event) {
    // swipe to change card status
    let swipeResult = event.like
    let currentCard = this.cards[this.swipeIndex]

    // change card status 
    this.swipeService.changeCardStatue(swipeResult, currentCard)

    // // progress value
    this.progressValue += this.swipeService.onProgress(swipeResult, this.cards)
    console.log('progressbar:')
    console.log(this.progressValue)
    // this.cardStack.progress = this.progressValue

    this.swipeIndex++
    //TODO: save current card into new stack
    this.swipeService.addToFailedCardStack(event.like, currentCard)
    this.failedCardLength = this.cardService.failedCardBag.cards.length
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
