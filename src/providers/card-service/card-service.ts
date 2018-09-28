import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { CardBag } from '../../app/Model/CardBag';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';

@Injectable()
export class CardServiceProvider {

  cardBags: CardBag[]

  constructor(public http: HttpModule) {
    console.log('Hello CardServiceProvider Provider');

    this.mockCardBages()
  }


  mockCardBages() {
    var date = new Date();

    var cardsA = [
      new Card(0, date.getDate().toString(), '你好', 'hallo', CardStatus.failed),
      new Card(1, date.getDate().toString(), '谢谢', 'danke', CardStatus.failed),
      new Card(2, date.getDate().toString(), '再见', 'diedersehen', CardStatus.failed),
      new Card(3, date.getDate().toString(), '对不起', 'entschuldigung', CardStatus.notSure),
      new Card(4, date.getDate().toString(), '没关系', 'kein Problem', CardStatus.success)
    ]
    var cardsB = [
      new Card(4, date.getDate().toString(), '好的', 'ok', CardStatus.success),
      new Card(4, date.getDate().toString(), '不是', 'nein', CardStatus.success),
      new Card(4, date.getDate().toString(), '早上好', 'morgen', CardStatus.success),
      new Card(4, date.getDate().toString(), '晚安', 'gute Nacht', CardStatus.success)
    ]
    var cardsC = [
      new Card(4, date.getDate().toString(), '好胃口', 'mahlzeit', CardStatus.success)
    ]

    this.cardBags = [
      new CardBag(0, '卡包一', cardsA, "iconA"),
      new CardBag(1, '卡包二', cardsB, 'iconB'),
      new CardBag(2, '卡包三', cardsC, 'iconC'),
    ]
  }
}
