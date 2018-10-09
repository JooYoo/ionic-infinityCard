import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var Swiper
@Component({
  selector: 'page-cube',
  templateUrl: 'cube.html',
})
export class CubePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit(){
    var swiper = new Swiper('.swiper-container', {
      effect: 'cube',
      grabCursor: true,
      loop: true,
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
