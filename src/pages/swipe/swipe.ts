import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, transition, useAnimation, state, style, animate, keyframes } from '@angular/animations';


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

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
    like: { backgroundColor: '#28e93b' },
    dislike: { backgroundColor: '#e92828' }
  };
  images = ["01", "02", "03", "04", "05", "06"]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i < this.images.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        asBg: this.images[i]
      });
    }
    this.ready = true;
  }

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

    this.ready = false;
    this.attendants = [];
    this.cardDirection = "xy";
    this.cardOverlay = {
      like: { backgroundColor: '#28e93b' },
      dislike: { backgroundColor: '#e92828' }
    };
    this.images = ["nihao", "xiexie", "zaijian", "haode", "duibuqi", "meiguanxi"]


    for (let i = 0; i < this.images.length; i++) {
      this.attendants.push({
        id: i + 1,
        likeEvent: new EventEmitter(),
        destroyEvent: new EventEmitter(),
        asBg: this.images[i]
      });
    }
    this.ready = true;
  }

}
