import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { CardStack } from '../../app/Model/CardStack';
import { Card } from '../../app/Model/Card';
import { CardStatus } from '../../app/Model/CardStatus';
import { CubeStack } from '../../app/Model/CubeStack';
import { Cube } from '../../app/Model/Cube';
import { StorageServiceProvider } from '../storage-service/storage-service';
import { DbServiceProvider, TABLES } from '../db-service/db-service';
import { StudyDaily } from '../../app/Model/StudyDaily';
import { Study } from '../../app/Model/Study'
import { StackType } from '../../app/Model/StackType';

@Injectable()
export class CardServiceProvider {

  cardStacks: CardStack[] = []
  cards: any = []
  cubeStacks: any = []
  cubes: Cube[] = []
  failedCardBag: CardStack

  studyDailys: StudyDaily[] = []
  studys: Study[] = []

  constructor(public http: HttpModule,
    public storageService: StorageServiceProvider,
    public dbService: DbServiceProvider) {
    this.getFailedCardBag()
    // this.mockCardStacks()
    //this.mockCubeStack()
  }

  defaultStudyDailys() {
    return [
      new StudyDaily(1, this.defaultStudys(), this.getDateNow(), 10, 0)
    ]
  }
  defaultStudys() {
    return [
      new Study(1, 1, "HelloWorld", 0)
    ]
  }


  // defaultData: mocakCards, mockCubes
  defaultCardStack() {
    return [new CardStack(1, '你好世界', 'HelloWorld', this.defaultCards(), this.getDateNow(), 0)]
  }
  defaultCards() {
    return [
      new Card(1, 1, this.getDateNow(), '你好', 'hallo', CardStatus.failed),
      new Card(2, 1, this.getDateNow(), '谢谢', 'danke', CardStatus.failed),
      new Card(3, 1, this.getDateNow(), '再见', 'bye', CardStatus.failed),
      new Card(4, 1, this.getDateNow(), '对不起', 'entschuldigung', CardStatus.notSure),
      new Card(5, 1, this.getDateNow(), '没关系', 'kein Problem', CardStatus.success)
    ]
  }
  defaultCubeStack() {
    return [new CubeStack(1, '你好方块', 'HelloCube', this.defaultCubes(), this.getDateNow(), 0)]
  }
  defaultCubes() {
    return [
      new Cube(1, 1, this.getDateNow(), '问好', 'Greeting', 'hello', 'hallo', 'hey', 'hi'),
      new Cube(2, 1, this.getDateNow(), '告别', 'farewell', 'bye', 'byebye', 'see you', 'good bye'),
      new Cube(3, 1, this.getDateNow(), '抱歉', 'apology', 'sorry', 'really sorry', 'Im sorry', 'my bad'),
      new Cube(4, 1, this.getDateNow(), '感激', 'appreciate', 'thanks', 'thank you', 'thank you very much', 'thanks a lot'),
    ]
  }

  mockCardStacks() {
    var cardsA = [
      new Card(0, 0, this.getDateNow(), '你好', 'hallo', CardStatus.failed),
      new Card(1, 0, this.getDateNow(), '谢谢', 'danke', CardStatus.failed),
      new Card(2, 0, this.getDateNow(), '再见', 'bye', CardStatus.failed),
      new Card(3, 0, this.getDateNow(), '对不起', 'entschuldigung', CardStatus.notSure),
      new Card(4, 0, this.getDateNow(), '没关系', 'kein Problem', CardStatus.success)
    ]
    var cardsB = [
      new Card(0, 1, this.getDateNow(), '第一包', 'ok', CardStatus.success),
      new Card(1, 1, this.getDateNow(), '不是', 'nein', CardStatus.success),
      new Card(2, 1, this.getDateNow(), '早上好', 'morgen', CardStatus.success),
      new Card(3, 1, this.getDateNow(), '晚安', 'nacht', CardStatus.success)
    ]
    var cardsC = [
      new Card(0, 2, this.getDateNow(), '第二包', 'zeit', CardStatus.success)
    ]

    this.cardStacks = [
      new CardStack(0, '卡包零', 'StackEins', cardsA, this.getDateNow(), 0),
      //new CardStack(1, '卡包一', 'StackZwei', cardsB, 'iconB', 0),
      //new CardStack(2, '卡包二', 'StackDrei', cardsC, 'iconC', 0),
    ]
  }
  mockCubeStack() {
    var date = new Date();
    var cubesA = [
      new Cube(0, 0, this.getDateNow(), '问好', 'Greeting', 'hello', 'hallo', 'hey', 'hi'),
      new Cube(1, 0, this.getDateNow(), '告别', 'farewell', 'bye', 'byebye', 'see you', 'good bye'),
      new Cube(2, 0, this.getDateNow(), '抱歉', 'apology', 'sorry', 'really sorry', 'Im sorry', 'my bad'),
      new Cube(3, 0, this.getDateNow(), '感激', 'appreciate', 'thanks', 'thank you', 'thank you very much', 'thanks a lot'),
    ]
    var cubesB = [
      new Cube(0, 1, this.getDateNow(), '中二一', '德二一', '方块二一', 'cubeOne', 'cubeEins', 'cubeYi'),
      new Cube(1, 1, this.getDateNow(), '中二二', '德二二', '方块二二', 'cubeTwo', 'cubeZwei', 'cubeEr'),
      new Cube(2, 1, this.getDateNow(), '中二三', '德二三', '方块二三', 'cubeThree', 'cubeDrei', 'cubeSan')
    ]
    var cubesC = [
      new Cube(0, 2, this.getDateNow(), '中三一', '德三一', '方块三一', 'cubeOne', 'cubeEins', 'cubeYi'),
      new Cube(1, 2, this.getDateNow(), '中三二', '德三二', '方块三二', 'cubeTwo', 'cubeZwei', 'cubeEr'),
      new Cube(2, 2, this.getDateNow(), '中三三', '德三三', '方块三三', 'cubeThree', 'cubeDrei', 'cubeSan')
    ]

    this.cubeStacks = [
      new CubeStack(0, '问候与告别', 'Hello & Bye', cubesA, 'iconA', 0),
      new CubeStack(1, '第二块包', 'CubeBagTwo', cubesB, 'iconB', 0),
      new CubeStack(2, '第三块包', 'CubeBagThree', cubesC, 'iconA', 0),
    ]
  }
  getFailedCardBag() {
    let failedcards = []
    this.failedCardBag = new CardStack(0, '不记得', 'Failed Bag', failedcards, 'iconX', 0)
  }

  // Studys: all, add, remove, edit
  addStudy(stack: any, stackType: StackType) {
    let stackAmount = 0
    // console.log('CardService:addStudy:studyDailys: ', this.studyDailys)
    let existStudyDaily = this.studyDailys.find(x => x.date == this.getDateNow())
    console.log('CardService:addStudy:studyDailys: ', this.studyDailys)

    if (!existStudyDaily) { // insert
      console.log('CardService:addStudy: !existDaily')
      let idStudyDaily = this.studyDailys.length + 1
      let planAmount = this.studyDailys[this.studyDailys.length - 1].planAmount
      let actualAmount = 0


      let existStudy = this.studys.find(x => x.stackTitle == stack.titleDe)
      if (!existStudy) {
        let idStudy = this.studys.length +1;
        stackAmount++
        let newStudy = new Study(idStudy, idStudyDaily, stack.titleDe, stackAmount)
        this.studys.push(newStudy)
        this.dbService.insert(newStudy, TABLES.Study)
      } else {
        existStudy.stackProgress++
        this.dbService.update(existStudy, TABLES.Study)
      }
   
      actualAmount++
      let newStudyDaily = new StudyDaily(idStudyDaily,
        this.studys,
        this.getDateNow(),
        planAmount,
        actualAmount)
      this.studyDailys.push(newStudyDaily)
      this.dbService.insert(newStudyDaily, TABLES.StudyDaily)

    } else { //  update
      existStudyDaily.actualAmount++
      this.dbService.update(existStudyDaily, TABLES.StudyDaily)
      console.log('CardService:addStudy:existDaily: ', existStudyDaily)

      // console.log('CardService:addStudy:stack.id: ', stack.id)
      let existStudy = this.studys.find(x => x.id == stack.id)
      // console.log('CardService:addStudy:existStudy: ', existStudy)
      if (!existStudy) { // 学新的Stack 就算是一个新的Study
        let idStudy = this.studys.length+1;
        stackAmount++
        let newStudy = new Study(idStudy, existStudyDaily.id, stack.titleDe, stackAmount)
        this.studys.push(newStudy)
        this.dbService.insert(newStudy, TABLES.Study)
      } else {
        existStudy.stackProgress++
        this.dbService.update(existStudy, TABLES.Study)
      }
    }

  }

  // CardStack Builder
  cardStackBuilder(cardStacks: CardStack[], cards: Card[]) {
    cardStacks.forEach(item => {
      item.cards = new Array()
      item.cards = cards.filter(x => x.cardStackId === item.id)
    });
  }
  // CardStack: all, add, remove, edit
  addCardStack(titleCn: string, titleDe: string, progress: number) {
    let id = this.cardStacks.length + 1
    let newCards = []
    let title_Cn = titleCn
    let title_De = titleDe
    let newCardStack = new CardStack(id, title_Cn, title_De, newCards, this.getDateNow(), progress)
    this.cardStacks.push(newCardStack)

    this.dbService.insert(newCardStack, TABLES.CardStack)
  }
  removeCardStack(cardStack: any) {
    let index = this.cardStacks.indexOf(cardStack)
    if (index > -1) {
      this.cardStacks.splice(index, 1)
    }

    // remove Cards in the stack
    cardStack.cards.forEach(card => {
      this.dbService.delete(TABLES.Card, card)
    });
    // remove this Stack
    this.dbService.delete(TABLES.CardStack, cardStack)
  }
  editCardStack(cardStack: CardStack, newTitleCn: string, newTitleDe: string) {
    var editcardStack = this.cardStacks.find(x => x == cardStack)
    editcardStack.titleCn = newTitleCn
    editcardStack.titleDe = newTitleDe

    this.dbService.update(cardStack, TABLES.CardStack)
  }
  // Card: add, remove, edit
  addCard(cardStack: CardStack, textCn: string, textDe: string) {

    let id = this.cards.length + 1;
    let newCard = new Card(id, cardStack.id, this.getDateNow(), textCn, textDe, CardStatus.failed)
    cardStack.cards.push(newCard)
    this.dbService.insert(newCard, TABLES.Card)
    // console.log('cardService:addCard:cardStack.cards: ', cardStack.cards)
  }
  removeCard(card: any, cardStack: any) {
    let targetcardStack = this.cardStacks.find(x => x == cardStack)
    targetcardStack.cards = targetcardStack.cards.filter(x => x != card)

    this.dbService.delete(TABLES.Card, card)
  }
  editCard(card: Card, newTextCn: string, newTextDe: string) {
    card.textCn = newTextCn
    card.textDe = newTextDe

    this.dbService.update(card, TABLES.Card)
  }


  // CardStack Builder
  cubeStackBuilder(cubeStacks: CubeStack[], cubes: Cube[]) {
    cubeStacks.forEach(item => {
      item.cubes = new Array()
      item.cubes = cubes.filter(x => x.cubeStackId === item.id)
    });
  }
  //CubeBag: add, remove, edit
  addCubeStack(titleCn: string, titleDe: string) {
    let id = this.cubeStacks.length + 1
    let defaultCube = []
    let newCubeStack = new CubeStack(id, titleCn, titleDe, defaultCube, this.getDateNow(), 0)
    this.cubeStacks.push(newCubeStack)

    this.addCube(newCubeStack, '问好', 'Greeting', 'hello', 'hallo', 'hey', 'hi')
    this.dbService.insert(newCubeStack, TABLES.CubeStack)
  }
  editCubeBag(cubeStack: CubeStack, newTitleCn: string, newTitleDe: string) {
    var editCubeBag = this.cubeStacks.find(x => x == cubeStack)
    editCubeBag.titleCn = newTitleCn
    editCubeBag.titleDe = newTitleDe

    this.dbService.update(cubeStack, TABLES.CubeStack)
  }
  removeCubeStack(cubeStack: any) {
    let index = this.cubeStacks.indexOf(cubeStack)
    if (index > -1) {
      this.cubeStacks.splice(index, 1)
    }

    this.dbService.delete(TABLES.CubeStack, cubeStack)
  }
  // Cube: add, remove, edit 
  addCube(cubeStack: CubeStack, title_Cn: string, title_De: string, cubeSide1: string, cubeSide2: string, cubeSide3: string, cubeSide4: string) {
    let _id = cubeStack.cubes.length + 1
    let newCube = new Cube(_id, cubeStack.id, this.getDateNow(), title_Cn, title_De, cubeSide1, cubeSide2, cubeSide3, cubeSide4)
    cubeStack.cubes.push(newCube)

    this.dbService.insert(newCube, TABLES.Cube)
  }
  removeCube(cube: any, cubeStack: any) {
    let targetCubeBag = this.cubeStacks.find(x => x == cubeStack)
    targetCubeBag.cubes = targetCubeBag.cubes.filter(x => x != cube)

    this.dbService.delete(TABLES.Cube, cube)
  }
  editCube(cube: Cube, cubeSide1: string, cubeSide2: string, cubeSide3: string, cubeSide4: string) {
    cube.cubeSide1 = cubeSide1
    cube.cubeSide2 = cubeSide2
    cube.cubeSide3 = cubeSide3
    cube.cubeSide4 = cubeSide4

    this.dbService.update(cube, TABLES.Cube)
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

    let rawDd = date.getDate() //TODO: 1 delete
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

  getDateAny(dayOffset: number): string {
    let date = new Date()
    let dd
    let mm

    let rawDd = date.getDate() + dayOffset
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

  getDateAnySimple(dayOffset: number): string { // display only month and day
    let date = new Date()
    let dd
    let mm

    let rawDd = date.getDate() + dayOffset
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

    return mm.toString() + '/' + dd.toString()
  }
}
