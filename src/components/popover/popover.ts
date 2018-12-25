import { Component } from '@angular/core';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LibraryPage } from '../../pages/library/library';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {


  cardStack: any
  cubeStack: any
  tabInfo: string


  constructor(public cardService: CardServiceProvider,
    public nav: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.cardStack = navParams.get('cardStackInfo')
    this.cubeStack = navParams.get('cubeStackInfo')
  }

  removeCardStack() {
    this.cardService.removeCardBag(this.cardStack)
    this.tabInfo = "swipe"
    
    this.viewCtrl.dismiss()
    //this.nav.push(LibraryPage, { tabInfo: this.tabInfo })
  }
  removeCubeStack() {
    this.cardService.removeCubeBag(this.cubeStack)
    this.tabInfo = "cube"
    this.nav.push(LibraryPage, { tabInfo: this.tabInfo })
  }

  removeStack() {
    if (this.cardStack != undefined) {
      this.removeCardStack()
    }
    else{
      this.removeCubeStack()
    }
  }

}
