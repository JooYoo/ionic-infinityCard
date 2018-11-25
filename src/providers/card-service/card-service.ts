import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { CardBag } from '../../app/Model/CardBag';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';
import { CubeBag } from '../../app/Model/CubeBag';
import {Cube} from '../../app/Model/Cube';

@Injectable()
export class CardServiceProvider {

  cardBags: CardBag[]
  failedCardBag: CardBag
  cubeBags: CubeBag[]


  constructor(public http: HttpModule) {

    this.mockCardBages()
    this.getFailedCardBag()
    this.mockCubeBags()
  }

  getFailedCardBag(){
    let failedcards = []
    this.failedCardBag = new CardBag(0, '不记得', 'Failed Bag', failedcards,'iconX')
  }


  mockCardBages() {
    //todo: to getDate when new card generate
    var date = new Date();

    var cardsA = [
      new Card(0, this.getDateNow(), '第零包', 'hallo', CardStatus.failed),
      new Card(1, this.getDateNow(), '谢谢', 'danke', CardStatus.failed),
      new Card(2, this.getDateNow(), '再见', 'bye', CardStatus.failed),
      new Card(3, this.getDateNow(), '对不起', 'entschuldigung', CardStatus.notSure),
      new Card(4, this.getDateNow(), '没关系', 'kein Problem', CardStatus.success)
    ]
    var cardsB = [
      new Card(4, this.getDateNow(), '第一包', 'ok', CardStatus.success),
      new Card(4, this.getDateNow(), '不是', 'nein', CardStatus.success),
      new Card(4, this.getDateNow(), '早上好', 'morgen', CardStatus.success),
      new Card(4, this.getDateNow(), '晚安', 'nacht', CardStatus.success)
    ]
    var cardsC = [
      new Card(4, this.getDateNow(), '第二包', 'zeit', CardStatus.success)
    ]

    this.cardBags = [
      new CardBag(0, '卡包一', 'StackEins', cardsA, "iconA"),
      new CardBag(1, '卡包二', 'StackZwei', cardsB, 'iconB'),
      new CardBag(2, '卡包三', 'StackDrei', cardsC, 'iconC'),
    ]
  }

  mockCubeBags(){
    var date = new Date();

    var cubesA = [
      new Cube(0, this.getDateNow(), ['方块一一','cubeOne','cubeEins','cubeYi','cube1'] ),
      new Cube(1, this.getDateNow(), ['方块一二','cubeTwo','cubeZwei','cubeEr','cube2'] ),
      new Cube(2, this.getDateNow(), ['方块一三','cubeThree','cubeDrei','cubeSan','cube3'] ),
      new Cube(3, this.getDateNow(), ['方块一四','cubeFour','cubeVier','cubeSi','cube4'] ),
    ]
    var cubesB = [
      new Cube(0, this.getDateNow(), ['方块二一','cubeOne','cubeEins','cubeYi','cube1'] ),
      new Cube(1, this.getDateNow(), ['方块二二','cubeTwo','cubeZwei','cubeEr','cube2'] ),
      new Cube(2, this.getDateNow(), ['方块三三','cubeThree','cubeDrei','cubeSan','cube3'] )
    ]

    this.cubeBags = [
      new CubeBag(0, '第一方块包','CubeBagOne',cubesA, 'iconA'),
      new CubeBag(1, '第二方块包','CubeBagTwo',cubesB, 'iconB')
    ]
  }

  //CubeBag: add, remove, edit
  addCubeBag(titleCn: string, titleDe: string, icon: string) {
    let id = this.cubeBags.length
    let title_Cn = titleCn
    let title_De = titleDe
    var newCubes = null
    this.cubeBags.push(new CubeBag(id,title_Cn,title_De,newCubes,icon))
  }
  editCubeBag(cubeBag: CubeBag, newTitleCn: string, newTitleDe: string){
    var editCubeBag = this.cubeBags.find(x =>x == cubeBag)
    editCubeBag.titleCn = newTitleCn
    editCubeBag.titleDe = newTitleDe
  }
  removeCubeBag(cubeBag: any){
    this.cubeBags = this.cubeBags.filter(x=>x != cubeBag)
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
  }

  // Cube: add, remove, edit 
  //TODO: add different DeText for one Cube
  addCube(cubeBag: CubeBag, cubeTexts:string[]) {

    let _id = cubeBag.cubes.length;
    let _date = this.getDateNow()
    let _cubeTexts = cubeTexts

    cubeBag.cubes.push(new Cube(_id, _date, _cubeTexts))
  }
  removeCube(cube: any, cubeBag: any) {
    let targetCubeBag = this.cubeBags.find(x => x == cubeBag)
    targetCubeBag.cubes = targetCubeBag.cubes.filter(x => x != cube)
  }
  editCube(cube:Cube, newCubeTexts:string[]){
    cube.cubeTexts = newCubeTexts
  }
  
  // Card: add, remove, edit
  addCard(cardBag: CardBag, textCn: string, textDe: string) {

    let _id = cardBag.cards.length;
    let _date = this.getDateNow()
    let _textCn = textCn
    let _textDe = textDe
    let _status = CardStatus.failed

    cardBag.cards.push(new Card(_id, _date, _textCn, _textDe, _status))
  }
  removeCard(card: any, cardBag: any) {
    let targetCardBag = this.cardBags.find(x => x == cardBag)
    targetCardBag.cards = targetCardBag.cards.filter(x => x != card)
  }
  editCard(card:Card, newTextCn:string, newTextDe:string){
    card.textCn = newTextCn
    card.textDe = newTextDe
  }



  // get current date
  getDateNow(): string {

    let date = new Date()
    let dd
    let mm

    let rawDd = date.getDate()
    let rawMm = date.getMonth() + 1
    let yyyy = date.getFullYear()

    // number always two digits
    if (rawDd < 10) {
      dd = '0' + rawDd.toString()
    }
    else {
      dd = rawDd.toString()
    }
    if (rawMm < 10) {
      mm = '0' + rawMm.toString()
    }
    else {
      mm = rawMm.toString()
    }

    return yyyy.toString() + '/' + mm.toString() + '/' + dd.toString()
  }

}
