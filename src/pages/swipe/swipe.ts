import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, transition, useAnimation, state, style, animate, keyframes } from '@angular/animations';
import { CardServiceProvider } from '../../providers/card-service/card-service';


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

  frontSides = []
  backSides = []
  nextCardBag: number

  islike: boolean

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: { backgroundColor: '#28e93b' },
    dislike: { backgroundColor: '#e92828' }
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider) {

    this.startNewRound()
  }

  

  //todo: dont need Angular Animations
  onCardInteract(event) {

    console.log("onCardInteract:" + event);
    console.log("islike: " + this.islike)

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
    console.log('new bag index: ' + this.nextCardBag)
    this.startStack()
  }
  // todo: move to service
  getRandomCardBag(itemLength: number): number {
    return (Math.floor(Math.random() * itemLength))
  }

  // display cards
  startStack() {

    this.attendants = [];
    this.frontSides = this.cardService.cardBags[this.nextCardBag].cards
    this.backSides = this.cardService.cardBags[this.nextCardBag].cards

    for (let i = 0; i < this.frontSides.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        fronts: this.frontSides[i].textCn,
        backs: this.backSides[i].textDe
      });
    }
    this.ready = true;
  }

 

}
