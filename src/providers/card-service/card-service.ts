import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { CardStack } from '../../app/Model/CardStack';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';
import { CubeBag } from '../../app/Model/CubeBag';
import { Cube } from '../../app/Model/Cube';
import { StorageServiceProvider } from '../storage-service/storage-service';

@Injectable()
export class CardServiceProvider {

  cardStacks: any
  failedCardBag: CardStack
  cubeStacks: CubeBag[]


  constructor(public http: HttpModule,
    public storageService: StorageServiceProvider) {

    //this.mockCardStacks()
    //this.getAllCardStacks()
    this.getFailedCardBag()
    this.mockCubeStack()
  }

  getFailedCardBag() {
    let failedcards = []
    this.failedCardBag = new CardStack(0, '不记得', 'Failed Bag', failedcards, 'iconX', 0)
  }

  // defaultData
  defaultData() {
    var dafaultCards = [
      new Card(0, this.getDateNow(), '你好', 'hallo', CardStatus.failed),
      new Card(1, this.getDateNow(), '谢谢', 'danke', CardStatus.failed),
      new Card(2, this.getDateNow(), '再见', 'bye', CardStatus.failed),
      new Card(3, this.getDateNow(), '对不起', 'entschuldigung', CardStatus.notSure),
      new Card(4, this.getDateNow(), '没关系', 'kein Problem', CardStatus.success)
    ]
    return new CardStack(0, '你好再见', 'Hallo', dafaultCards, "iconA", 0)
  }

  // MockData: mocakCards, mockCubes
  mockCardStacks() {
    var cardsA = [
      new Card(0, this.getDateNow(), '你好', 'hallo', CardStatus.failed),
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



    this.cardStacks = [
      new CardStack(0, '卡包零', 'StackEins', cardsA, "iconA", 0),
      //new CardStack(1, '卡包一', 'StackZwei', cardsB, 'iconB', 0),
      //new CardStack(2, '卡包二', 'StackDrei', cardsC, 'iconC', 0),
    ]
  }
  mockCubeStack() {
    var date = new Date();
    var cubesA = [
      new Cube(0, this.getDateNow(), '问好', 'Greeting', ['hello', 'hallo', 'hey', 'hi', 'yo']),
      new Cube(1, this.getDateNow(), '告别', 'farewell', ['bye', 'byebye', 'see you', 'good bye', 'see you later']),
      new Cube(2, this.getDateNow(), '抱歉', 'apology', ['sorry', 'really sorry', 'Im sorry', 'my bad', 'my fault']),
      new Cube(3, this.getDateNow(), '感激', 'appreciate', ['thanks', 'thank you', 'thank you very much', 'thanks a lot', 'im appreciate']),
    ]
    var cubesB = [
      new Cube(0, this.getDateNow(), '中二一', '德二一', ['方块二一', 'cubeOne', 'cubeEins', 'cubeYi', 'cube1']),
      new Cube(1, this.getDateNow(), '中二二', '德二二', ['方块二二', 'cubeTwo', 'cubeZwei', 'cubeEr', 'cube2']),
      new Cube(2, this.getDateNow(), '中二三', '德二三', ['方块二三', 'cubeThree', 'cubeDrei', 'cubeSan', 'cube3'])
    ]
    var cubesC = [
      new Cube(0, this.getDateNow(), '中三一', '德三一', ['方块三一', 'cubeOne', 'cubeEins', 'cubeYi', 'cube1']),
      new Cube(1, this.getDateNow(), '中三二', '德三二', ['方块三二', 'cubeTwo', 'cubeZwei', 'cubeEr', 'cube2']),
      new Cube(2, this.getDateNow(), '中三三', '德三三', ['方块三三', 'cubeThree', 'cubeDrei', 'cubeSan', 'cube3'])
    ]

    this.cubeStacks = [
      new CubeBag(0, '问候与告别', 'Hello & Bye', cubesA, 'iconA'),
      new CubeBag(1, '第二块包', 'CubeBagTwo', cubesB, 'iconB'),
      new CubeBag(2, '第三块包', 'CubeBagThree', cubesC, 'iconA'),
    ]
  }

  

  // CardStack: all, add, remove, edit
  getAllCardStacks() {
    //this.cardStacks = this.storageService.storageGetAllCardStacks()
    this.storageService.storageGetAllCardStacks().then(cardSs => this.cardStacks = cardSs)
  }
  addCardStack(titleCn: string, titleDe: string, icon: string, onProgress: number) {
    let id = this.cardStacks.length + 1
    let title_Cn = titleCn
    let title_De = titleDe
    var newCards = []
    var newCardStack = new CardStack(id, title_Cn, title_De, newCards, icon, onProgress)
    this.cardStacks.push(newCardStack)

    this.storageService.storageAddCardStack(newCardStack)
  }
  removeCardBag(cardStack: any) {
    let index = this.cardStacks.indexOf(cardStack)
    if (index > -1) {
      this.cardStacks.splice(index, 1)
    }

    this.storageService.storageRemoveCardStack(cardStack)
  }
  editCardBag(cardStack: CardStack, newTitleCn: string, newTitleDe: string) {
    var editcardStack = this.cardStacks.find(x => x == cardStack)
    editcardStack.titleCn = newTitleCn
    editcardStack.titleDe = newTitleDe

    this.storageService.storageEditCardStack(cardStack)
  }

  // Card: add, remove, edit
  addCard(cardStack: CardStack, textCn: string, textDe: string) {
    let _id = cardStack.cards.length;
    let _date = this.getDateNow()
    let _textCn = textCn
    let _textDe = textDe
    let _status = CardStatus.failed
    cardStack.cards.push(new Card(_id, _date, _textCn, _textDe, _status))

    this.storageService.storageAddCard(cardStack)
  }
  removeCard(card: any, cardStack: any) {
    let targetcardStack = this.cardStacks.find(x => x == cardStack)
    targetcardStack.cards = targetcardStack.cards.filter(x => x != card)

    this.storageService.storageRemoveCard(cardStack, card)
  }
  editCard(cardStack: CardStack, card: Card, newTextCn: string, newTextDe: string) {
    card.textCn = newTextCn
    card.textDe = newTextDe

    this.storageService.storageEditCard(cardStack)
  }


  //CubeBag: add, remove, edit
  addCubeStack(titleCn: string, titleDe: string, icon: string) {
    let id = this.cubeStacks.length
    let title_Cn = titleCn
    let title_De = titleDe
    var newCubes = []
    this.cubeStacks.push(new CubeBag(id, title_Cn, title_De, newCubes, icon))
  }
  editCubeBag(cubeBag: CubeBag, newTitleCn: string, newTitleDe: string) {
    var editCubeBag = this.cubeStacks.find(x => x == cubeBag)
    editCubeBag.titleCn = newTitleCn
    editCubeBag.titleDe = newTitleDe
  }
  removeCubeBag(cubeStack: any) {
    let index = this.cubeStacks.indexOf(cubeStack)
    if (index > -1) {
      this.cubeStacks.splice(index, 1)
    }
  }
  // Cube: add, remove, edit 
  addCube(cubeBag: CubeBag, title_Cn: string, title_De: string, cubeTexts: string[]) {
    let _id = cubeBag.cubes.length;
    let _date = this.getDateNow()

    cubeBag.cubes.push(new Cube(_id, _date, title_Cn, title_De, cubeTexts))
  }
  removeCube(cube: any, cubeBag: any) {
    let targetCubeBag = this.cubeStacks.find(x => x == cubeBag)
    targetCubeBag.cubes = targetCubeBag.cubes.filter(x => x != cube)
  }
  editCube(cube: Cube, newCubeTexts: string[]) {
    cube.cubeTexts = newCubeTexts
  }





  getRandomBgColor() {
    var colors = ["#0fbcf9",
      "#0097e6",
      "#ff5e57",
      "#00d8d6",
      "#05c46b",
      "#ffa801",
      "#ef5777",
      "#575fcf",
      "#4bcffa",
      "#0be881",
      "#485460",
      "#ffdd59",
      "#ffd32a",
      "#ff3f34",
      "#808e9b",
      "#1e272e"
    ]
    var randomNum = Math.floor(Math.random() * colors.length)
    console.log("randomNum:" + randomNum)
    return colors[randomNum]
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
