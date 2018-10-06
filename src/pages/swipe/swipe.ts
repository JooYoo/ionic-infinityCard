import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, transition, useAnimation, state, style, animate, keyframes } from '@angular/animations';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';


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
  // backSides = []
  nextCardBag: number
  swipeIndex: number

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: { backgroundColor: '#008975' },
    dislike: { backgroundColor: '#e92828' }
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider) {

    this.startNewRound()
  }

  changeCardStatue(swipeResult: boolean, currentCard: Card) {
    if (swipeResult) {
      currentCard.status = CardStatus.success
    }
    else {
      currentCard.status = CardStatus.failed
    }
  }

  onCardInteract(event) {
    // swipe to change card status
    console.log("swipeResult:" + event.like);
    let swipeResult = event.like
    let currentCard = this.cards[this.swipeIndex]
    this.changeCardStatue(swipeResult, currentCard)
    console.log(this.cards)
    this.swipeIndex++
    console.log('------')

    // back flip to front
    if (this.isFlip == 'goFlip') {
      this.isFlip = 'goQuickBack';
    }
  }

  isFlip: string = 'goBack';
  toggleFlip() {
    this.isFlip = (this.isFlip == 'goBack') ? 'goFlip' : 'goBack';
  }

  // new round Btn
  startNewRound() {
    this.nextCardBag = this.getRandomCardBag(this.cardService.cardBags.length)
    this.startStack()
  }
  // todo: move to service
  getRandomCardBag(itemLength: number): number {
    return (Math.floor(Math.random() * itemLength))
  }

  // display cards
  startStack() {
    this.swipeIndex = 0

    this.attendants = [];
    this.cards = this.cardService.cardBags[this.nextCardBag].cards
    // this.backSides = this.cardService.cardBags[this.nextCardBag].cards

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
  }

}
