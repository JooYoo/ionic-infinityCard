import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { SwipeServiceProvider } from '../../providers/swipe-service/swipe-service';
import { Cube } from '../../app/Model/Cube';

declare var Swiper
@Component({
  selector: 'page-cube',
  templateUrl: 'cube.html',
})
export class CubePage {

  cubes: Cube[]
  cube: Cube
  studyCubeStack: any

  cubeStack: any
  cubeIndex: number = 0
  cubeStackLength: any
  perCubePercent: any
  progress: any = 0
  isEnd: boolean = false

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public swipeService: SwipeServiceProvider) {

    this.studyCubeSwitch()
  }

  // 如果是从lib.cubeStack来的，那么提取该Stack中的第一个Cube里显示；
  // 否则随便从lib.cubeStacks抽一个stack, 显示该Stack第一个Cube
  studyCubeSwitch() {
    this.studyCubeStack = this.navParams.get("cubeStack")
    if (this.studyCubeStack != undefined) {
      this.cube = this.studyCubeStack.cubes[0]

      this.cubes = this.studyCubeStack.cubes
      this.cubeStackLength = this.cubes.length
      this.perCubePercent = (1 / this.cubeStackLength) * 100
      this.progress = this.perCubePercent

      this.cubeStack = this.studyCubeStack
    } else {
      this.getRandomNext()
    }
  }
  getRandomNext() {
    // get random CubeStack
    let randomIndex = this.swipeService.getRandomCardBag(this.cardService.cubeStacks.length)
    this.cubes = this.cardService.cubeStacks[randomIndex].cubes
    this.cubeStack = this.cardService.cubeStacks[randomIndex]

    //progressbar
    this.cubeStackLength = this.cubes.length
    this.perCubePercent = (1 / this.cubeStackLength) * 100
    this.progress = this.perCubePercent

    // TODO: 之前 get random Cube；现在 get 1st cube in this CubeStack 
    let cubeIndex = 0;
    this.cube = this.cubes[cubeIndex]
  }

  toNextCube() {
    // cube
    this.cubeIndex++
    //cube
    if (this.cubeIndex <= this.cubeStackLength - 1) {
      this.cube = this.cubes[this.cubeIndex]
      this.progress += this.perCubePercent

    } else {
      this.cubeIndex = this.cubeStackLength
      this.progress = 100
      this.isEnd = true
    }

  }

  toLastCube() {

    this.cubeIndex--;

    if (this.cubeIndex > 0) {
      this.cube = this.cubes[this.cubeIndex]
      this.progress -= this.perCubePercent
    } else {
      this.cubeIndex = 0
      this.progress = this.perCubePercent
    }
  }


  toFirstCube() {
    this.cube = this.cubes[0]
    this.cubeIndex = 0
    this.progress = this.perCubePercent
  }



  // cube UI setting
  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    var swiper = new Swiper('.swiper-container', {
      effect: 'cube',
      grabCursor: true,
      loop: false,
      slidesOffsetBefore: -60,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

}
