import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';


@Injectable()
export class SwipeServiceProvider {

  constructor(public http: HttpModule) {
    
  }

  changeCardStatue(swipeResult: boolean, currentCard: Card) {
    if (swipeResult) {
      currentCard.status = CardStatus.success
    }
    else {
      currentCard.status = CardStatus.failed
    }
  }

  getRandomCardBag(itemLength: number): number {
    return (Math.floor(Math.random() * itemLength))
  }

}
