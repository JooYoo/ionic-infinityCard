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
    //todo: to getDate when new card generate
    var date = new Date();

    var cardsA = [
      new Card(0, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '你好', 'hallo', CardStatus.failed),
      new Card(1, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '谢谢', 'danke', CardStatus.failed),
      new Card(2, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '再见', 'diedersehen', CardStatus.failed),
      new Card(3, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '对不起', 'entschuldigung', CardStatus.notSure),
      new Card(4, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '没关系', 'kein Problem', CardStatus.success)
    ]
    var cardsB = [
      new Card(4, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '好的', 'ok', CardStatus.success),
      new Card(4, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '不是', 'nein', CardStatus.success),
      new Card(4, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '早上好', 'morgen', CardStatus.success),
      new Card(4, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '晚安', 'gute Nacht', CardStatus.success)
    ]
    var cardsC = [
      new Card(4, date.getUTCFullYear().toString() + ' / ' + date.getUTCMonth(), '好胃口', 'mahlzeit', CardStatus.success)
    ]

    this.cardBags = [
      new CardBag(0, '卡包一', 'StackEins', cardsA, "iconA"),
      new CardBag(1, '卡包二', 'StackZwei', cardsB, 'iconB'),
      new CardBag(2, '卡包三', 'StackDrei', cardsC, 'iconC'),
    ]
  }

  // CardBag: add, remove, edit
  addCardBag(titleCn: string, titleDe: string, icon: string) {

    let id = this.cardBags.length
    let title_Cn = titleCn
    let title_De = titleDe
    var newCards = null

    this.cardBags.push(new CardBag(id, title_Cn, title_De, newCards, icon))
  }
  removeCardBag(cardBag: any) {
    this.cardBags = this.cardBags.filter(x => x != cardBag)
  }

  editCardBag(cardBag: CardBag, newTitleCn: string, newTitleDe: string) {
    var editCardBag = this.cardBags.find(x => x == cardBag)
    editCardBag.titleCn = newTitleCn
    editCardBag.titleDe = newTitleDe

    console.log(this.cardBags)
  }

}
