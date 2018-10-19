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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cardService: CardServiceProvider,
    public swipeService: SwipeServiceProvider) {

    this.getRandomNext()
  }


  getRandomNext() {
    // get random CubeBag
    let randomIndex = this.swipeService.getRandomCardBag(this.cardService.cubeBags.length)
    this.cubes = this.cardService.cubeBags[randomIndex].cubes
    // console.log("random cubeBag:" + randomIndex)
    // console.log(this.cubes)

    // get random Cube
    let cubeIndex = this.swipeService.getRandomCardBag(this.cubes.length)
    this.cube = this.cubes[cubeIndex]
    // console.log("random cube:" + cubeIndex)
    // console.log(this.cube)
    // console.log("----------")
  }
  
  ngAfterViewInit() {
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
