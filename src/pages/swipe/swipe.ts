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
  
  frontSides =[]
  backSides=[]

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

   this.startStack()
  }

  //todo: dont need Angular Animations
  onCardInteract(event) {

    console.log("onCardInteract:" + event);

    // back flip to front
    if (this.isFlip == 'goFlip') {
      this.isFlip = 'goQuickBack';
    }
  }
  isFlip: string = 'goBack';
  toggleFlip() {
    this.isFlip = (this.isFlip == 'goBack') ? 'goFlip' : 'goBack';
  }

  startStack() {

    console.log("clicked startStack")

    this.attendants = [];
    this.frontSides = this.cardService.cardBags[1].cards
    this.backSides = this.cardService.cardBags[1].cards

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
