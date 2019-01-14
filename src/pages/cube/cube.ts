import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { SwipeServiceProvider } from '../../providers/swipe-service/swipe-service';
import { Cube } from '../../app/Model/Cube';
import { trigger, state, style, transition, animate } from '@angular/animations'

declare var Swiper
@Component({
  selector: 'page-cube',
  templateUrl: 'cube.html',
  animations: [
    trigger('myTrigger', [
      state('idle', style({
        //opacity: '1',
        transform: 'scale(1)'
      })),
      // state('fadeOut', style({
      //  // opacity: '0',
      //   transform: 'translateX(600px)'
      // })),
      state('fadeIn', style({
        opacity: '1'
      })),
      transition('idle<=>fadeIn', [
        style({
          opacity: '0',
          transform: 'translateY(-200px)'
        }),
        animate('200ms')
      ])
    ])
  ]

})
export class CubePage {

  animState: string = 'idle'

  cubes: Cube[]
  cube: Cube
  studyCubeStack: any

  cubeStack: any
  cubeIndex: number = 0
  cubeStackLength: any
  perCubePercent: any
  progress: any = 0
  animProgress: number = 0

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public swipeService: SwipeServiceProvider,
    public renderer: Renderer) {

    this.studyCubeSwitch()
  }

  animCube() {
    this.animState = (this.animState === 'idle' ? 'fadeIn' : 'idle')
    //this.animState = 'fadeIn'
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

      this.cubeStack = this.progress

    } else {
      this.getRandomNext()
    }
  }
  getRandomNext() {
    //this.animProgress=0

    // get random CubeStack
    let randomIndex = this.swipeService.getRandomNr(this.cardService.cubeStacks.length)
    this.cubes = this.cardService.cubeStacks[randomIndex].cubes
    this.cubeStack = this.cardService.cubeStacks[randomIndex]

    //progressbar
    this.cubeStackLength = this.cubes.length
    this.perCubePercent = (1 / this.cubeStackLength) * 100
    this.progress = this.perCubePercent
    this.cubeStack.progress = this.progress

    // get cube contents
    this.cube = this.cubes[this.cubeIndex]
    if(!this.cube){
      console.log('cube:getRandomNext: cube no content try next')
      this.getRandomNext()
    }
  }

  toNextCube() {
    this.cubeIndex++
    //cube
    if (this.cubeIndex <= this.cubeStackLength - 1) {
      this.cube = this.cubes[this.cubeIndex]
      this.progress += this.perCubePercent
      console.log( this.progress)
    } else {
      this.cubeIndex = this.cubeStackLength
      this.progress = 100
      this.cubeIndex = this.cubeStackLength - 1
    }
    this.cubeStack.progress = this.progress
  }

  toLastCube() {
    this.cubeIndex--;

    if (this.cubeIndex >= 0) {
      this.cube = this.cubes[this.cubeIndex]
      this.progress -= this.perCubePercent
    } else {
      this.cubeIndex = 0
      this.progress = this.perCubePercent
    }
    this.cubeStack.progress = this.progress

  }


  toFirstCube() {
    this.cube = this.cubes[0]
    this.cubeIndex = 0
    this.progress = this.perCubePercent

    this.cubeStack.progress = this.progress
  }



  // cube UI setting
  ngAfterViewInit() {
    var swiper = new Swiper('.swiper-container',
      {
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
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    )
  }
}
