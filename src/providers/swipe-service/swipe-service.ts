import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';
import { CardServiceProvider } from '../card-service/card-service';


@Injectable()

export class SwipeServiceProvider {
  constructor(public http: HttpModule,
    public cardService: CardServiceProvider) {
  }


  onProgress(swipeResult: boolean, attents: any) {
    return 1 / attents.length * 100
  }

  changeCardStatue(swipeResult: boolean, currentCard: Card) {
    if (swipeResult) {
      currentCard.status = CardStatus.success
    }
    else {
      currentCard.status = CardStatus.failed
    }
  }

  getRandomCardBag(itemLength: number) {
    return (Math.floor(Math.random() * itemLength))
  }

  addToFailedCardStack(isOk: boolean, currentCard: Card) {

    let isExist = this.cardService.failedCardBag.cards.filter(x => x == currentCard).length > 0

    if (!isOk && !isExist) {
      this.cardService.failedCardBag.cards.push(currentCard)
    }
    else if (isOk) {
      this.cardService.failedCardBag.cards = this.cardService.failedCardBag.cards.filter(x => x != currentCard)
    }
  }




}
