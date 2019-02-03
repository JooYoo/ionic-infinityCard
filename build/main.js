webpackJsonp([0],{

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(cardService, nav, navParams, viewCtrl) {
        this.cardService = cardService;
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    PopoverComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PopoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'popover',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/components/popover/popover.html"*/'<button ion-button clear color="danger" (click)="dismiss()">\n  DELETE STACK\n</button>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/components/popover/popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ViewController */]])
    ], PopoverComponent);
    return PopoverComponent;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_swipe_service_swipe_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__swipe_mistake_mistake__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_Model_StackType__ = __webpack_require__(636);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SwipePage = /** @class */ (function () {
    function SwipePage(navCtrl, navParams, cardService, swipeService, platform, modalCtrl, dbService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cardService = cardService;
        this.swipeService = swipeService;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.dbService = dbService;
        this.cards = [];
        this.progressValue = 0;
        this.cardBagMode = "standard";
        this.ready = false;
        this.attendants = [];
        this.cardDirection = "xy";
        this.cardOverlay = {
            like: { backgroundColor: '#008975' },
            dislike: { backgroundColor: '#e92828' }
        };
    }
    SwipePage.prototype.ionViewDidEnter = function () {
        this.studyCardSwitch();
    };
    SwipePage.prototype.studyCardSwitch = function () {
        this.studyCards = this.navParams.get("cardStack");
        if (this.studyCards != undefined) {
            this.cardStack = this.studyCards;
            this.initCards(this.studyCards.cards);
        }
        else {
            this.startNewRound();
        }
    };
    SwipePage.prototype.onCardInteract = function (event) {
        // swipe to change card status
        var swipeResult = event.like;
        var currentCard = this.cards[this.swipeIndex];
        // change card status 
        this.swipeService.changeCardStatue(swipeResult, currentCard);
        // progress value
        this.progressValue += this.swipeService.onProgress(swipeResult, this.cards);
        this.cardStack.progress = this.progressValue;
        this.dbService.update(this.cardStack, __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["b" /* TABLES */].CardStack);
        this.swipeIndex++;
        this.swipeService.addToFailedCardStack(event.like, currentCard);
        this.failedCardLength = this.cardService.failedCardBag.cards.length;
        // write to StudyDb
        this.cardService.addStudy(this.cardStack, __WEBPACK_IMPORTED_MODULE_6__app_Model_StackType__["a" /* StackType */].card);
    };
    SwipePage.prototype.onMistake = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__swipe_mistake_mistake__["a" /* MistakePage */]);
        modal.present();
    };
    // review failed Btn
    SwipePage.prototype.reviewFailedCards = function () {
        this.initCards(this.cardService.failedCardBag.cards);
    };
    // new Round Btn
    SwipePage.prototype.startNewRound = function () {
        // this.storage.length().then(cardStacksLength => {
        //this.onDefaultStack(cardStacksLength)
        // let cardStacksLength = this.cardService.cardStacks.length
        // console.log('swipe:cardStacksLength:', cardStacksLength)
        // this.randomIndex = this.swipeService.getRandomNr(cardStacksLength)
        // this.cardStack = this.cardService.cardStacks[this.randomIndex]
        // console.log('swipe:randomIndex: ', this.randomIndex)
        // console.log('swipe:cardStack:', this.cardStack)
        // try {
        //   this.initCards(this.cardStack.cards)
        // } catch (error) {
        //   console.log('swipe:no cards')
        // }
        // try {
        //   this.cardStack.progress = this.progressValue
        // } catch (error) {
        //   console.log('swipe:no progress')
        // }
        // })
        this.randomIndex = this.swipeService.getRandomNr(this.cardService.cardStacks.length);
        this.cardStack = this.cardService.cardStacks[this.randomIndex];
        //console.log('swipe:', this.cardStack)
        this.initCards(this.cardStack.cards);
        this.cardStack.progress = this.progressValue;
    };
    // repeat Round Btn
    SwipePage.prototype.repeatRound = function () {
        this.cardStack.progress = this.progressValue;
        this.initCards(this.cards);
    };
    // display cards
    SwipePage.prototype.initCards = function (cards) {
        this.swipeIndex = 0;
        this.attendants = [];
        this.cards = cards;
        for (var i = 0; i < this.cards.length; i++) {
            this.attendants.push({
                id: i + 1,
                likeEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                destroyEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                fronts: this.cards[i].textCn,
                backs: this.cards[i].textDe
            });
        }
        this.ready = true;
        this.progressValue = 0;
    };
    SwipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-swipe',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/swipe.html"*/'<ion-header>\n\n  <ion-navbar color="light" >\n    <ion-title *ngIf="cardStack?.titleDe" style="text-align:center;"> {{cardStack.titleDe}}</ion-title>\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content id="allCards" padding no-bounce>\n\n  <!-- TODO: Study and mistake has id to control the width percent-->\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <div id="mistake-filing">\n          <button (click)="onMistake()" style="background:transparent;">\n            <ion-icon name="ios-archive-outline">\n              <ion-badge id="filing-badge" item-end color="danger" *ngIf="failedCardLength > 0">{{cardService.failedCardBag.cards.length}}</ion-badge>\n            </ion-icon>\n          </button>\n        </div>\n      </ion-col>\n      <ion-col col-10>\n        <div class="progress">\n          <div class="progress-bar" [style.width.%]="progressValue"></div>\n        </div>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n  <!-- CardStack -->\n  <label class="flipContainer" *ngIf="ready">\n    <sc-card class="sc-card" *ngFor="let attendant of attendants" [orientation]="cardDirection" [tinder-card]="cardOverlay"\n      [callLike]="attendant.likeEvent" [callDestroy]="attendant.destroyEvent" (onLike)="onCardInteract($event)">\n      <input type="checkbox" />\n      <div class="theCard">\n        <div id="card-front">{{attendant.fronts}}</div>\n        <div id="card-back">{{attendant.backs}}</div>\n      </div>\n    </sc-card>\n  </label>\n\n\n\n  <!-- next & repeat Btn -->\n  <ion-fab id="more-btn" bottom large right>\n    <button ion-fab color=\'light\'>\n      <ion-icon name="ios-menu"></ion-icon>\n    </button>\n    <ion-fab-list side="left">\n      <button ion-fab class="btn-list" (click)="startNewRound()" color="light">\n        <ion-icon name="fastforward"></ion-icon>\n      </button>\n      <button ion-fab class="btn-list" (click)="repeatRound()" color="light">\n        <ion-icon name="repeat"></ion-icon>\n      </button>\n      <button ion-fab class="btn-list" color="light">\n        <ion-icon name="clock"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/swipe.html"*/,
            animations: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_swipe_service_swipe_service__["a" /* SwipeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */]])
    ], SwipePage);
    return SwipePage;
}());

//# sourceMappingURL=swipe.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_swipe_service_swipe_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CubePage = /** @class */ (function () {
    function CubePage(navCtrl, navParams, cardService, swipeService, renderer, dbService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cardService = cardService;
        this.swipeService = swipeService;
        this.renderer = renderer;
        this.dbService = dbService;
        this.animState = 'idle';
        this.cubeIndex = 0;
        this.progress = 0;
        this.animProgress = 0;
        this.studyCubeSwitch();
    }
    CubePage.prototype.animCube = function () {
        this.animState = (this.animState === 'idle' ? 'fadeIn' : 'idle');
        //this.animState = 'fadeIn'
    };
    // 如果是从lib.cubeStack来的，那么提取该Stack中的第一个Cube里显示；
    // 否则随便从lib.cubeStacks抽一个stack, 显示该Stack第一个Cube
    CubePage.prototype.studyCubeSwitch = function () {
        this.studyCubeStack = this.navParams.get("cubeStack");
        if (this.studyCubeStack != undefined) {
            this.cube = this.studyCubeStack.cubes[0];
            this.cubes = this.studyCubeStack.cubes;
            this.cubeStackLength = this.cubes.length;
            this.perCubePercent = (1 / this.cubeStackLength) * 100;
            this.progress = this.perCubePercent;
            this.cubeStack = this.progress;
        }
        else {
            this.getRandomNext();
        }
    };
    CubePage.prototype.getRandomNext = function () {
        //this.animProgress=0
        // get random CubeStack
        var randomIndex = this.swipeService.getRandomNr(this.cardService.cubeStacks.length);
        this.cubes = this.cardService.cubeStacks[randomIndex].cubes;
        this.cubeStack = this.cardService.cubeStacks[randomIndex];
        //progressbar
        this.cubeStackLength = this.cubes.length;
        this.perCubePercent = (1 / this.cubeStackLength) * 100;
        this.progress = this.perCubePercent;
        this.cubeStack.progress = this.progress;
        console.log('cube:studyCubeSwitch:cubeIndex: ', this.cubeIndex);
        // get cube contents
        this.cube = this.cubes[this.cubeIndex];
        if (!this.cube) {
            console.log('cube:getRandomNext: cube no content try next');
            this.getRandomNext();
        }
    };
    CubePage.prototype.toNextCube = function () {
        this.cubeIndex++;
        //cube
        if (this.cubeIndex <= this.cubeStackLength - 1) {
            this.cube = this.cubes[this.cubeIndex];
            this.progress += this.perCubePercent;
            console.log(this.progress);
        }
        else {
            this.cubeIndex = this.cubeStackLength;
            this.progress = 100;
            this.cubeIndex = this.cubeStackLength - 1;
        }
        // progressbar
        this.cubeStack.progress = this.progress;
        this.dbService.update(this.cubeStack, __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["b" /* TABLES */].CubeStack);
        console.log('cube:studyCubeSwitch:cubesLength: ', this.cubes.length);
        console.log('cube:studyCubeSwitch:cubeIndex: ', this.cubeIndex);
    };
    CubePage.prototype.toLastCube = function () {
        this.cubeIndex--;
        if (this.cubeIndex >= 0) {
            this.cube = this.cubes[this.cubeIndex];
            this.progress -= this.perCubePercent;
        }
        else {
            this.cubeIndex = 0;
            this.progress = this.perCubePercent;
        }
        // progressbar
        this.cubeStack.progress = this.progress;
        this.dbService.update(this.cubeStack, __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["b" /* TABLES */].CubeStack);
        console.log('cube:studyCubeSwitch:cubesLength: ', this.cubes.length);
        console.log('cube:studyCubeSwitch:cubeIndex: ', this.cubeIndex);
    };
    CubePage.prototype.toFirstCube = function () {
        this.cube = this.cubes[0];
        this.cubeIndex = 0;
        this.progress = this.perCubePercent;
        // progressbar
        this.cubeStack.progress = this.progress;
        this.dbService.update(this.cubeStack, __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["b" /* TABLES */].CubeStack);
        console.log('cube:studyCubeSwitch:cubeIndex: ', this.cubeIndex);
    };
    // cube UI setting
    CubePage.prototype.ngAfterViewInit = function () {
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
        });
    };
    CubePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/cube/cube.html"*/'<ion-header>\n\n  <ion-navbar color="light" *ngIf="cubeStack?.titleDe">\n    <ion-title style="text-align:center;">{{cubeStack.titleDe}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding no-bounce>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-1>\n        <button (click)=\'toLastCube()\' style="background:transparent;" (click)=\'animCube()\'>\n          <ion-icon id="arrow-left" name="ios-arrow-back-outline">\n          </ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-10>\n\n        <ion-row>\n          <ion-col *ngFor=\'let item of cubes\'>\n            <div class="progress">\n              <div class="progress-bar" style="width:100%" *ngIf=\'cubeIndex>=cubes.indexOf(item)\'></div>\n              <!-- FIXME: 本来计划每次方块滑动都增加进度条 <div class="progress-bar" [style.width.%]="progress" ></div> -->\n            </div>\n          </ion-col>\n        </ion-row>\n\n\n      </ion-col>\n      <ion-col col-1>\n        <button (click)="toNextCube()" (click)="animCube()" style="background:transparent;">\n          <ion-icon id="arrow-right" name="ios-arrow-forward"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <div id="cubeStack-title"></div>\n\n\n  <div id="anim-cube" [@myTrigger]=\'animState\' class="swiper-container">\n    <div class="swiper-wrapper">\n      <div class="swiper-slide" style="background: black; color: white; font-weight: bold;">\n        <div style="text-align:center;">\n\n          <ion-grid id="cube-begin-titles">\n            <ion-row id="cube-begin-titles-cn">{{cube.titleCn}}</ion-row>\n            <ion-row id="cube-begin-titles-de">{{cube.titleDe}}</ion-row>\n            <ion-row id="cube-begin-titles-date">{{cube.date}}</ion-row>\n          </ion-grid>\n        </div>\n      </div>\n\n      <div class="swiper-slide" style="background: whitesmoke;">{{cube.cubeSide1}}</div>\n      <div class="swiper-slide" style="background: whitesmoke;">{{cube.cubeSide2}}</div>\n      <div class="swiper-slide" style="background: whitesmoke;">{{cube.cubeSide3}}</div>\n      <div class="swiper-slide" style="background: whitesmoke;">{{cube.cubeSide4}}</div>\n    </div>\n    <!--  Pagination -->\n    <div class="swiper-pagination"></div>\n  </div>\n\n\n  <!-- Fab btn -->\n  <ion-fab id="cube-fab" bottom right>\n    <button ion-fab color="light">\n      <ion-icon name="ios-menu"></ion-icon>\n    </button>\n    <ion-fab-list side=\'left\'>\n      <button class="btn-list" ion-fab color="light" (click)="getRandomNext()" (click)=\'animCube()\'>\n        <ion-icon name="fastforward"></ion-icon>\n      </button>\n      <button class="btn-list" ion-fab color="light" (click)="toFirstCube()" (click)=\'animCube()\'>\n        <ion-icon name="repeat"></ion-icon>\n      </button>\n      <button class="btn-list" ion-fab color="light">\n        <ion-icon name="clock"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/cube/cube.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["j" /* trigger */])('myTrigger', [
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["g" /* state */])('idle', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({
                        //opacity: '1',
                        transform: 'scale(1)'
                    })),
                    // state('fadeOut', style({
                    //  // opacity: '0',
                    //   transform: 'translateX(600px)'
                    // })),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["g" /* state */])('fadeIn', Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({
                        opacity: '1'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["i" /* transition */])('idle<=>fadeIn', [
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["h" /* style */])({
                            opacity: '0',
                            transform: 'translateY(-200px)'
                        }),
                        Object(__WEBPACK_IMPORTED_MODULE_4__angular_animations__["e" /* animate */])('200ms')
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_swipe_service_swipe_service__["a" /* SwipeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_5__providers_db_service_db_service__["a" /* DbServiceProvider */]])
    ], CubePage);
    return CubePage;
}());

//# sourceMappingURL=cube.js.map

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeStack__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__storage_service_storage_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_Model_StudyDaily__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_Model_Study__ = __webpack_require__(635);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var CardServiceProvider = /** @class */ (function () {
    function CardServiceProvider(http, storageService, dbService) {
        this.http = http;
        this.storageService = storageService;
        this.dbService = dbService;
        this.cardStacks = [];
        this.cards = [];
        this.cubeStacks = [];
        this.cubes = [];
        this.studyDailys = [];
        this.studys = [];
        this.getFailedCardBag();
        // this.mockCardStacks()
        //this.mockCubeStack()
    }
    CardServiceProvider.prototype.defaultStudyDailys = function () {
        return [
            new __WEBPACK_IMPORTED_MODULE_9__app_Model_StudyDaily__["a" /* StudyDaily */](1, this.defaultStudys(), this.getDateNow(), 10, 0)
        ];
    };
    CardServiceProvider.prototype.defaultStudys = function () {
        return [
            new __WEBPACK_IMPORTED_MODULE_10__app_Model_Study__["a" /* Study */](1, 1, "HelloWorld", 0)
        ];
    };
    // defaultData: mocakCards, mockCubes
    CardServiceProvider.prototype.defaultCardStack = function () {
        return [new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](1, '你好世界', 'HelloWorld', this.defaultCards(), this.getDateNow(), 0)];
    };
    CardServiceProvider.prototype.defaultCards = function () {
        return [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](1, 1, this.getDateNow(), '你好', 'hallo', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](2, 1, this.getDateNow(), '谢谢', 'danke', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](3, 1, this.getDateNow(), '再见', 'bye', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, 1, this.getDateNow(), '对不起', 'entschuldigung', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].notSure),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](5, 1, this.getDateNow(), '没关系', 'kein Problem', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
    };
    CardServiceProvider.prototype.defaultCubeStack = function () {
        return [new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeStack__["a" /* CubeStack */](1, '你好方块', 'HelloCube', this.defaultCubes(), this.getDateNow(), 0)];
    };
    CardServiceProvider.prototype.defaultCubes = function () {
        return [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, 1, this.getDateNow(), '问好', 'Greeting', 'hello', 'hallo', 'hey', 'hi'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, 1, this.getDateNow(), '告别', 'farewell', 'bye', 'byebye', 'see you', 'good bye'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](3, 1, this.getDateNow(), '抱歉', 'apology', 'sorry', 'really sorry', 'Im sorry', 'my bad'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](4, 1, this.getDateNow(), '感激', 'appreciate', 'thanks', 'thank you', 'thank you very much', 'thanks a lot'),
        ];
    };
    CardServiceProvider.prototype.mockCardStacks = function () {
        var cardsA = [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](0, 0, this.getDateNow(), '你好', 'hallo', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](1, 0, this.getDateNow(), '谢谢', 'danke', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](2, 0, this.getDateNow(), '再见', 'bye', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](3, 0, this.getDateNow(), '对不起', 'entschuldigung', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].notSure),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, 0, this.getDateNow(), '没关系', 'kein Problem', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
        var cardsB = [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](0, 1, this.getDateNow(), '第一包', 'ok', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](1, 1, this.getDateNow(), '不是', 'nein', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](2, 1, this.getDateNow(), '早上好', 'morgen', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](3, 1, this.getDateNow(), '晚安', 'nacht', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
        var cardsC = [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](0, 2, this.getDateNow(), '第二包', 'zeit', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
        this.cardStacks = [
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](0, '卡包零', 'StackEins', cardsA, this.getDateNow(), 0),
        ];
    };
    CardServiceProvider.prototype.mockCubeStack = function () {
        var date = new Date();
        var cubesA = [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](0, 0, this.getDateNow(), '问好', 'Greeting', 'hello', 'hallo', 'hey', 'hi'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, 0, this.getDateNow(), '告别', 'farewell', 'bye', 'byebye', 'see you', 'good bye'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, 0, this.getDateNow(), '抱歉', 'apology', 'sorry', 'really sorry', 'Im sorry', 'my bad'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](3, 0, this.getDateNow(), '感激', 'appreciate', 'thanks', 'thank you', 'thank you very much', 'thanks a lot'),
        ];
        var cubesB = [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](0, 1, this.getDateNow(), '中二一', '德二一', '方块二一', 'cubeOne', 'cubeEins', 'cubeYi'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, 1, this.getDateNow(), '中二二', '德二二', '方块二二', 'cubeTwo', 'cubeZwei', 'cubeEr'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, 1, this.getDateNow(), '中二三', '德二三', '方块二三', 'cubeThree', 'cubeDrei', 'cubeSan')
        ];
        var cubesC = [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](0, 2, this.getDateNow(), '中三一', '德三一', '方块三一', 'cubeOne', 'cubeEins', 'cubeYi'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, 2, this.getDateNow(), '中三二', '德三二', '方块三二', 'cubeTwo', 'cubeZwei', 'cubeEr'),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, 2, this.getDateNow(), '中三三', '德三三', '方块三三', 'cubeThree', 'cubeDrei', 'cubeSan')
        ];
        this.cubeStacks = [
            new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeStack__["a" /* CubeStack */](0, '问候与告别', 'Hello & Bye', cubesA, 'iconA', 0),
            new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeStack__["a" /* CubeStack */](1, '第二块包', 'CubeBagTwo', cubesB, 'iconB', 0),
            new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeStack__["a" /* CubeStack */](2, '第三块包', 'CubeBagThree', cubesC, 'iconA', 0),
        ];
    };
    CardServiceProvider.prototype.getFailedCardBag = function () {
        var failedcards = [];
        this.failedCardBag = new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](0, '不记得', 'Failed Bag', failedcards, 'iconX', 0);
    };
    // Studys: all, add, remove, edit
    CardServiceProvider.prototype.addStudy = function (stack, stackType) {
        var _this = this;
        var stackAmount = 0;
        // console.log('CardService:addStudy:studyDailys: ', this.studyDailys)
        var existStudyDaily = this.studyDailys.find(function (x) { return x.date == _this.getDateNow(); });
        console.log('CardService:addStudy:studyDailys: ', this.studyDailys);
        if (!existStudyDaily) {
            console.log('CardService:addStudy: !existDaily');
            var idStudyDaily = this.studyDailys.length + 1;
            var planAmount = this.studyDailys[this.studyDailys.length - 1].planAmount;
            var actualAmount = 0;
            var existStudy = this.studys.find(function (x) { return x.stackTitle == stack.titleDe; });
            if (!existStudy) {
                var idStudy = this.studys.length + 1;
                stackAmount++;
                var newStudy = new __WEBPACK_IMPORTED_MODULE_10__app_Model_Study__["a" /* Study */](idStudy, idStudyDaily, stack.titleDe, stackAmount);
                this.studys.push(newStudy);
                this.dbService.insert(newStudy, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Study);
            }
            else {
                existStudy.stackProgress++;
                this.dbService.update(existStudy, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Study);
            }
            actualAmount++;
            var newStudyDaily = new __WEBPACK_IMPORTED_MODULE_9__app_Model_StudyDaily__["a" /* StudyDaily */](idStudyDaily, this.studys, this.getDateNow(), planAmount, actualAmount);
            this.studyDailys.push(newStudyDaily);
            this.dbService.insert(newStudyDaily, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].StudyDaily);
        }
        else {
            existStudyDaily.actualAmount++;
            this.dbService.update(existStudyDaily, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].StudyDaily);
            console.log('CardService:addStudy:existDaily: ', existStudyDaily);
            // console.log('CardService:addStudy:stack.id: ', stack.id)
            var existStudy = this.studys.find(function (x) { return x.id == stack.id; });
            // console.log('CardService:addStudy:existStudy: ', existStudy)
            if (!existStudy) {
                var idStudy = this.studys.length + 1;
                stackAmount++;
                var newStudy = new __WEBPACK_IMPORTED_MODULE_10__app_Model_Study__["a" /* Study */](idStudy, existStudyDaily.id, stack.titleDe, stackAmount);
                this.studys.push(newStudy);
                this.dbService.insert(newStudy, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Study);
            }
            else {
                existStudy.stackProgress++;
                this.dbService.update(existStudy, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Study);
            }
        }
    };
    // CardStack Builder
    CardServiceProvider.prototype.cardStackBuilder = function (cardStacks, cards) {
        cardStacks.forEach(function (item) {
            item.cards = new Array();
            item.cards = cards.filter(function (x) { return x.cardStackId === item.id; });
        });
    };
    // CardStack: all, add, remove, edit
    CardServiceProvider.prototype.addCardStack = function (titleCn, titleDe, progress) {
        var id = this.cardStacks.length + 1;
        var newCards = [];
        var title_Cn = titleCn;
        var title_De = titleDe;
        var newCardStack = new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](id, title_Cn, title_De, newCards, this.getDateNow(), progress);
        this.cardStacks.push(newCardStack);
        this.dbService.insert(newCardStack, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].CardStack);
    };
    CardServiceProvider.prototype.removeCardStack = function (cardStack) {
        var _this = this;
        var index = this.cardStacks.indexOf(cardStack);
        if (index > -1) {
            this.cardStacks.splice(index, 1);
        }
        // remove Cards in the stack
        cardStack.cards.forEach(function (card) {
            _this.dbService.delete(__WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Card, card);
        });
        // remove this Stack
        this.dbService.delete(__WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].CardStack, cardStack);
    };
    CardServiceProvider.prototype.editCardStack = function (cardStack, newTitleCn, newTitleDe) {
        var editcardStack = this.cardStacks.find(function (x) { return x == cardStack; });
        editcardStack.titleCn = newTitleCn;
        editcardStack.titleDe = newTitleDe;
        this.dbService.update(cardStack, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].CardStack);
    };
    // Card: add, remove, edit
    CardServiceProvider.prototype.addCard = function (cardStack, textCn, textDe) {
        var id = this.cards.length + 1;
        var newCard = new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](id, cardStack.id, this.getDateNow(), textCn, textDe, __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed);
        cardStack.cards.push(newCard);
        this.dbService.insert(newCard, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Card);
        // console.log('cardService:addCard:cardStack.cards: ', cardStack.cards)
    };
    CardServiceProvider.prototype.removeCard = function (card, cardStack) {
        var targetcardStack = this.cardStacks.find(function (x) { return x == cardStack; });
        targetcardStack.cards = targetcardStack.cards.filter(function (x) { return x != card; });
        this.dbService.delete(__WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Card, card);
    };
    CardServiceProvider.prototype.editCard = function (card, newTextCn, newTextDe) {
        card.textCn = newTextCn;
        card.textDe = newTextDe;
        this.dbService.update(card, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Card);
    };
    // CardStack Builder
    CardServiceProvider.prototype.cubeStackBuilder = function (cubeStacks, cubes) {
        cubeStacks.forEach(function (item) {
            item.cubes = new Array();
            item.cubes = cubes.filter(function (x) { return x.cubeStackId === item.id; });
        });
    };
    //CubeBag: add, remove, edit
    CardServiceProvider.prototype.addCubeStack = function (titleCn, titleDe) {
        var id = this.cubeStacks.length + 1;
        var defaultCube = [];
        var newCubeStack = new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeStack__["a" /* CubeStack */](id, titleCn, titleDe, defaultCube, this.getDateNow(), 0);
        this.cubeStacks.push(newCubeStack);
        this.addCube(newCubeStack, '问好', 'Greeting', 'hello', 'hallo', 'hey', 'hi');
        this.dbService.insert(newCubeStack, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].CubeStack);
    };
    CardServiceProvider.prototype.editCubeBag = function (cubeStack, newTitleCn, newTitleDe) {
        var editCubeBag = this.cubeStacks.find(function (x) { return x == cubeStack; });
        editCubeBag.titleCn = newTitleCn;
        editCubeBag.titleDe = newTitleDe;
        this.dbService.update(cubeStack, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].CubeStack);
    };
    CardServiceProvider.prototype.removeCubeStack = function (cubeStack) {
        var index = this.cubeStacks.indexOf(cubeStack);
        if (index > -1) {
            this.cubeStacks.splice(index, 1);
        }
        this.dbService.delete(__WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].CubeStack, cubeStack);
    };
    // Cube: add, remove, edit 
    CardServiceProvider.prototype.addCube = function (cubeStack, title_Cn, title_De, cubeSide1, cubeSide2, cubeSide3, cubeSide4) {
        var _id = cubeStack.cubes.length + 1;
        var newCube = new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](_id, cubeStack.id, this.getDateNow(), title_Cn, title_De, cubeSide1, cubeSide2, cubeSide3, cubeSide4);
        cubeStack.cubes.push(newCube);
        this.dbService.insert(newCube, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Cube);
    };
    CardServiceProvider.prototype.removeCube = function (cube, cubeStack) {
        var targetCubeBag = this.cubeStacks.find(function (x) { return x == cubeStack; });
        targetCubeBag.cubes = targetCubeBag.cubes.filter(function (x) { return x != cube; });
        this.dbService.delete(__WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Cube, cube);
    };
    CardServiceProvider.prototype.editCube = function (cube, cubeSide1, cubeSide2, cubeSide3, cubeSide4) {
        cube.cubeSide1 = cubeSide1;
        cube.cubeSide2 = cubeSide2;
        cube.cubeSide3 = cubeSide3;
        cube.cubeSide4 = cubeSide4;
        this.dbService.update(cube, __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["b" /* TABLES */].Cube);
    };
    CardServiceProvider.prototype.getRandomBgColor = function () {
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
        ];
        var randomNum = Math.floor(Math.random() * colors.length);
        console.log("randomNum:" + randomNum);
        return colors[randomNum];
    };
    // get current date
    CardServiceProvider.prototype.getDateNow = function () {
        var date = new Date();
        var dd;
        var mm;
        var rawDd = date.getDate(); //TODO: 1 delete
        var rawMm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        // number always two digits
        if (rawDd < 10) {
            dd = '0' + rawDd.toString();
        }
        else {
            dd = rawDd.toString();
        }
        if (rawMm < 10) {
            mm = '0' + rawMm.toString();
        }
        else {
            mm = rawMm.toString();
        }
        return yyyy.toString() + '/' + mm.toString() + '/' + dd.toString();
    };
    CardServiceProvider.prototype.getDateAny = function (dayOffset) {
        var date = new Date();
        var dd;
        var mm;
        var rawDd = date.getDate() + dayOffset;
        var rawMm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        // number always two digits
        if (rawDd < 10) {
            dd = '0' + rawDd.toString();
        }
        else {
            dd = rawDd.toString();
        }
        if (rawMm < 10) {
            mm = '0' + rawMm.toString();
        }
        else {
            mm = rawMm.toString();
        }
        return yyyy.toString() + '/' + mm.toString() + '/' + dd.toString();
    };
    CardServiceProvider.prototype.getDateAnySimple = function (dayOffset) {
        var date = new Date();
        var dd;
        var mm;
        var rawDd = date.getDate() + dayOffset;
        var rawMm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        // number always two digits
        if (rawDd < 10) {
            dd = '0' + rawDd.toString();
        }
        else {
            dd = rawDd.toString();
        }
        if (rawMm < 10) {
            mm = '0' + rawMm.toString();
        }
        else {
            mm = rawMm.toString();
        }
        return mm.toString() + '/' + dd.toString();
    };
    CardServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_7__storage_service_storage_service__["a" /* StorageServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_8__db_service_db_service__["a" /* DbServiceProvider */]])
    ], CardServiceProvider);
    return CardServiceProvider;
}());

//# sourceMappingURL=card-service.js.map

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 250;

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_library__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cube_cube__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__infinity_infinity__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swipe_swipe__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chart_chart__ = __webpack_require__(310);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_5__swipe_swipe__["a" /* SwipePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__library_library__["a" /* LibraryPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__cube_cube__["a" /* CubePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__infinity_infinity__["a" /* InfinityPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_1__settings_settings__["a" /* SettingsPage */];
        this.tab6Root = __WEBPACK_IMPORTED_MODULE_6__chart_chart__["a" /* ChartPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex="1" color="light">\n  <!-- <ion-tab [root]="tab4Root" tabTitle="Infinity" tabIcon="ios-infinite"></ion-tab> -->\n  <ion-tab [root]="tab3Root" tabTitle="Cube" tabIcon="ios-cube"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Library" tabIcon="apps"></ion-tab>\n  <ion-tab [root]="tab1Root" tabTitle="Swipe" tabIcon="ios-albums"></ion-tab>\n  <!-- <ion-tab [root]="tab5Root" tabTitle="Settings" tabIcon="settings"></ion-tab> -->\n  <ion-tab [root]="tab6Root" tabTitle="Chart" tabIcon="ios-analytics"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Settings\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <p>settings page works</p>\n</ion-content>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_stack_card_content_edit_card_content_edit__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_stack_card_content_add_card_content_add__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_popover_popover__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_swipe_swipe__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CardStackPage = /** @class */ (function () {
    function CardStackPage(nav, navParams, modalCtrl, cardService, popoverCtrl, viewCtrl, toastCtrl, app) {
        this.nav = nav;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.cardService = cardService;
        this.popoverCtrl = popoverCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.cardStack = navParams.get('itemInfo');
        console.log('cardStack:constructor:cardStack: ', this.cardStack);
    }
    CardStackPage.prototype.toastSetting = function () {
        this.toast = this.toastCtrl.create({
            message: this.cardStack.titleCn + ' has been removed',
            duration: 3000,
            position: 'top',
            closeButtonText: 'X',
            showCloseButton: true,
            cssClass: 'toast-style'
        });
    };
    CardStackPage.prototype.presentPopover = function (ev) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__components_popover_popover__["a" /* PopoverComponent */], { cardStackInfo: this.cardStack });
        popover.present({
            ev: ev
        });
        this.toastSetting();
        popover.onDidDismiss(function () {
            _this.cardService.removeCardStack(_this.cardStack);
            _this.toast.present();
            _this.viewCtrl.dismiss();
        });
    };
    CardStackPage.prototype.openEditModal = function (card) {
        var editModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__card_stack_card_content_edit_card_content_edit__["a" /* CardContentEditPage */], { cardInfo: card, cardBagInfo: this.cardStack });
        editModal.present();
    };
    CardStackPage.prototype.openAddModal = function () {
        var addModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__card_stack_card_content_add_card_content_add__["a" /* CardContentAddPage */], { cardBagInfo: this.cardStack });
        addModal.present();
    };
    CardStackPage.prototype.editCardStack = function () {
        this.cardService.editCardStack(this.cardStack, this.cardStack.titleCn, this.cardStack.titleDe);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__library__["a" /* LibraryPage */]);
    };
    CardStackPage.prototype.removeCard = function (card) {
        this.cardService.removeCard(card, this.cardStack);
    };
    CardStackPage.prototype.closeSlidingItem = function (slidingItem) {
        slidingItem.close();
    };
    CardStackPage.prototype.toSwipePage = function () {
        // this.nav.setRoot(SwipePage, { cardStack: this.cardStack })
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_swipe_swipe__["a" /* SwipePage */], { cardStack: this.cardStack });
    };
    CardStackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-stack',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-stack.html"*/'<ion-header>\n  <ion-navbar color="light">\n    <ion-title>CardStack</ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- card stack cover edit area -->\n  <ion-grid>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item no-lines>\n          <div class="wrapper">\n            <div class="card">\n              <img class="back-img" src="https://farm8.staticflickr.com/7878/45968858365_c38a983ab6.jpg">\n              <div class="card-title">{{cardStack.titleCn}}</div>\n              <div class="card-subtitle">{{cardStack.titleDe}}</div>\n            </div>\n          </div>\n\n        </ion-item>\n      </ion-col>\n      <ion-col col-7>\n        <ion-list class="card-cover-edit">\n          <ion-item>\n            <ion-input placeholder="{{cardStack.titleCn}}" [(ngModel)]="cardStack.titleCn" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input placeholder="{{cardStack.titleDe}}" [(ngModel)]="cardStack.titleDe" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row id="row-btns">\n      <ion-col col-5>\n        <button id="card-study-btn" ion-button color="light" small round (click)="toSwipePage()">\n          <ion-icon class="card-cover-icon" name="ios-school-outline"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-7>\n        <button class="card-cover-edit-btn" ion-button small color="danger" round outline (click)="presentPopover($event)">\n          <ion-icon class="card-cover-icon" name="ios-trash-outline"></ion-icon>\n        </button>\n        <button class="card-cover-edit-btn" ion-button small color="primary" round outline (click)="editCardStack()">\n          <ion-icon class="card-cover-icon" name="ios-checkmark-circle-outline"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <hr>\n\n\n  <ion-list>\n    <ion-item-sliding *ngFor="let card of cardStack.cards" #slidingItem>\n\n      <ion-item (click)="openEditModal(card)">\n        <h2>{{card.textCn}}</h2>\n        <p>{{card.textDe}}</p>\n        <ion-note item-end>{{card.date}}</ion-note>\n      </ion-item>\n\n      <ion-item-options side="left">\n        <button ion-button color="light" (click)="openEditModal(card)" (click)="closeSlidingItem(slidingItem)">\n          <ion-icon name="build"></ion-icon>\n          &nbsp;&nbsp;edit&nbsp;&nbsp;\n        </button>\n        <button ion-button color="danger" (click)="removeCard(card)">\n          <ion-icon name="trash"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="light" id="addBtn" (click)="openAddModal()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-stack.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
    ], CardStackPage);
    return CardStackPage;
}());

//# sourceMappingURL=card-stack.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardContentEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CardContentEditPage = /** @class */ (function () {
    function CardContentEditPage(navCtrl, navParams, platform, viewCtrl, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.cardService = cardService;
        this.card = navParams.get('cardInfo');
        this.cardStack = navParams.get('cardBagInfo');
        // get enum key
        this.cardStatus = this.getCardStatus(this.card.status);
    }
    CardContentEditPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    // todo: pack to service provider
    CardContentEditPage.prototype.getCardStatus = function (value) {
        if (value == 0) {
            return "success";
        }
        else if (value == 1) {
            return "failed";
        }
        else if (value == 2) {
            return "notSure";
        }
    };
    CardContentEditPage.prototype.editCard = function () {
        this.cardService.editCard(this.card, this.card.textCn, this.card.textDe);
    };
    CardContentEditPage.prototype.removeCard = function () {
        this.cardService.removeCard(this.card, this.cardStack);
    };
    CardContentEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-content-edit',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-edit/card-content-edit.html"*/'<ion-header>\n  <ion-toolbar color="light">\n    <ion-title>\n      Edit Card\n\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close" style="font-size:20px;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-scroll scrollX="true">\n\n    <ion-card class="card-front">\n      <ion-card-content>\n        <textarea class="card-textarea" placeholder="{{card.textCn}}" [(ngModel)]="card.textCn" clearInput></textarea>\n      </ion-card-content>\n    </ion-card>\n    <ion-card class="card-back">\n      <ion-card-content>\n        <textarea class="card-textarea" placeholder="{{card.textDe}}" [(ngModel)]="card.textDe" clearInput></textarea>\n      </ion-card-content>\n    </ion-card>\n  </ion-scroll>\n\n  <hr>\n\n  <!-- TODO: Form version -->\n  <!-- <ion-list>\n    <ion-item>\n      <ion-input placeholder="{{card.textCn}}" [(ngModel)]="card.textCn" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="{{card.textDe}}" [(ngModel)]="card.textDe" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n    </ion-item>\n  </ion-list> -->\n</ion-content>\n\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="card-edit-btn" ion-button outline round color="danger" (click)="removeCard()" (click)="dismiss()">\n        <ion-icon name="ios-trash-outline"></ion-icon>\n      </button>\n      <button class="card-edit-btn" ion-button outline round (click)="editCard()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-edit/card-content-edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], CardContentEditPage);
    return CardContentEditPage;
}());

//# sourceMappingURL=card-content-edit.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStatus; });
var CardStatus;
(function (CardStatus) {
    CardStatus[CardStatus["failed"] = 0] = "failed";
    CardStatus[CardStatus["success"] = 1] = "success";
    CardStatus[CardStatus["notSure"] = 2] = "notSure";
})(CardStatus || (CardStatus = {}));
//# sourceMappingURL=CardStatus.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqlStorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SqlStorageProvider = /** @class */ (function () {
    function SqlStorageProvider(sqlite) {
        this.sqlite = sqlite;
    }
    // Cube Table
    SqlStorageProvider.prototype.cubeGetAll = function () {
        return this.db.executeSql('SELECT key, value FROM cubekv', []).then(function (data) {
            var results = [];
            for (var i = 0; i < data.rows.length; i++) {
                results.push(JSON.parse(data.rows.item(i).value));
            }
            return results;
        });
    };
    SqlStorageProvider.prototype.cubeGet = function (key) {
        return this.db.executeSql('SELECT key, value from cubekv where key = ? limit 1', [key]).then(function (data) {
            if (data.rows.length > 0) {
                return JSON.parse(data.rows.item(0).value);
            }
        });
    };
    SqlStorageProvider.prototype.cubeRemove = function (key) {
        return this.db.executeSql('delete from cubekv where key = ?', [key]);
    };
    SqlStorageProvider.prototype.cubeSet = function (key, value) {
        return this.db.executeSql('insert or replace into cubekv(key, value) values (?, ?)', [key, value]).then(function (data) {
            if (data.rows.length > 0) {
                return JSON.parse(data.rows.item(0).value);
            }
        });
    };
    SqlStorageProvider.prototype.cubeInitializeDatabase = function () {
        var _this = this;
        return this.sqlite.create({ name: 'data.db', location: 'default' }).then(function (db) {
            _this.db = db;
            return _this.db.executeSql('CREATE TABLE IF NOT EXISTS cubekv (key text primary key, value text)', [])
                .then(function (data) {
                console.log('**after CREATE TABLE cubekv check', data);
            });
        });
    };
    // Card Table
    SqlStorageProvider.prototype.getAll = function () {
        return this.db.executeSql('SELECT key, value FROM kv', []).then(function (data) {
            var results = [];
            for (var i = 0; i < data.rows.length; i++) {
                results.push(JSON.parse(data.rows.item(i).value));
            }
            return results;
        });
    };
    SqlStorageProvider.prototype.get = function (key) {
        return this.db.executeSql('SELECT key, value from kv where key = ? limit 1', [key]).then(function (data) {
            if (data.rows.length > 0) {
                return JSON.parse(data.rows.item(0).value);
            }
        });
    };
    SqlStorageProvider.prototype.remove = function (key) {
        return this.db.executeSql('delete from kv where key = ?', [key]);
    };
    SqlStorageProvider.prototype.set = function (key, value) {
        return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(function (data) {
            if (data.rows.length > 0) {
                return JSON.parse(data.rows.item(0).value);
            }
        });
    };
    // should be called after deviceready event is fired
    SqlStorageProvider.prototype.initializeDatabase = function () {
        var _this = this;
        return this.sqlite.create({ name: 'data.db', location: 'default' }).then(function (db) {
            _this.db = db;
            return _this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', [])
                .then(function () {
                return _this.db.executeSql('CREATE TABLE IF NOT EXISTS cubekv (key text primary key, value text)', []);
            });
        });
    };
    SqlStorageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__["a" /* SQLite */]])
    ], SqlStorageProvider);
    return SqlStorageProvider;
}());

//# sourceMappingURL=sql-storage.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardContentAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CardContentAddPage = /** @class */ (function () {
    function CardContentAddPage(navCtrl, navParams, viewControl, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewControl = viewControl;
        this.cardService = cardService;
        this.cardStack = navParams.get('cardBagInfo');
    }
    CardContentAddPage.prototype.ionViewDidLoad = function () {
        this.currentDate = new Date().toISOString();
    };
    CardContentAddPage.prototype.dismiss = function () {
        this.viewControl.dismiss();
    };
    CardContentAddPage.prototype.addCard = function () {
        this.cardService.addCard(this.cardStack, this.textCn, this.textDe);
    };
    CardContentAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-content-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-add/card-content-add.html"*/'<ion-header>\n  <ion-toolbar color="light">\n    <ion-title>\n      New Card\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n\n  <ion-scroll direction="x" scrollX="true">\n    <ion-card class="card-front">\n      <ion-card-content>\n        <textarea class="card-textarea" placeholder="Front..." [(ngModel)]=\'textCn\'></textarea>\n      </ion-card-content>\n    </ion-card>\n    <ion-card class="card-back">\n      <ion-card-content>\n        <textarea class="card-textarea" placeholder="Back..." clearInput [(ngModel)]=\'textDe\'></textarea>\n      </ion-card-content>\n    </ion-card>\n  </ion-scroll>\n\n  <hr>\n\n  <ion-item>\n    <ion-label color="primary" style="margin-left:10px;">Date:</ion-label>\n    <ion-datetime [(ngModel)]="currentDate" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MM DD"></ion-datetime>\n  </ion-item>\n\n\n  <!-- TODO: 这里是Form风格-->\n  <!-- <ion-list>\n    <ion-item>\n      <ion-input placeholder="Front..." clearInput [(ngModel)]=\'textCn\'></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input placeholder="Back..." clearInput [(ngModel)]=\'textDe\'></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" style="margin-left:10px;">Date:</ion-label>\n      <ion-datetime [(ngModel)]="currentDate" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MM DD"></ion-datetime>\n    </ion-item>\n    <ion-item>\n    </ion-item>\n  </ion-list> -->\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="card-save-btn" ion-button outline round (click)="addCard()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-add/card-content-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], CardContentAddPage);
    return CardContentAddPage;
}());

//# sourceMappingURL=card-content-add.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MistakePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_swipe_service_swipe_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MistakePage = /** @class */ (function () {
    function MistakePage(navCtrl, navParams, viewCtrl, swipeService, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.swipeService = swipeService;
        this.cardService = cardService;
        this.progressValue = 0;
        this.ready = false;
        this.attendants = [];
        this.cardDirection = "xy";
        this.cardOverlay = {
            like: { backgroundColor: '#008975' },
            dislike: { backgroundColor: '#e92828' }
        };
        this.failedCardLength = this.cardService.failedCardBag.cards.length;
        this.failedCards = this.cardService.failedCardBag.cards;
        this.initCards(this.failedCards);
    }
    MistakePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    // repeat Round Btn
    MistakePage.prototype.repeatRound = function () {
        //this.cardStack.progress = this.progressValue
        this.failedCardLength = this.cardService.failedCardBag.cards.length;
        this.initCards(this.cards);
    };
    MistakePage.prototype.onCardInteract = function (event) {
        // swipe to change card status
        var swipeResult = event.like;
        var currentCard = this.cards[this.swipeIndex];
        // change card status 
        this.swipeService.changeCardStatue(swipeResult, currentCard);
        // // progress value
        this.progressValue += this.swipeService.onProgress(swipeResult, this.cards);
        console.log('progressbar:');
        console.log(this.progressValue);
        // this.cardStack.progress = this.progressValue
        this.swipeIndex++;
        //TODO: save current card into new stack
        this.swipeService.addToFailedCardStack(event.like, currentCard);
        this.failedCardLength = this.cardService.failedCardBag.cards.length;
    };
    // display cards
    MistakePage.prototype.initCards = function (cards) {
        this.swipeIndex = 0;
        this.attendants = [];
        this.cards = cards;
        for (var i = 0; i < this.cards.length; i++) {
            this.attendants.push({
                id: i + 1,
                likeEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                destroyEvent: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */](),
                fronts: this.cards[i].textCn,
                backs: this.cards[i].textDe
            });
        }
        this.ready = true;
        this.progressValue = 0;
    };
    MistakePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mistake',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/mistake/mistake.html"*/'<ion-header>\n  <ion-toolbar start color="light">\n    <ion-title>Mistake</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close" style="font-size: 30px;"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding no-bounce>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-2>\n        <div id="mistake-filing" (click)="dismiss()">\n          <ion-icon name="ios-archive">\n            <ion-badge id="mistake-badge" end color="danger" *ngIf="failedCardLength > 0">{{failedCardLength}}</ion-badge>\n          </ion-icon>\n        </div>\n      </ion-col>\n      <ion-col col-10>\n        <!-- ProgressBar-->\n        <div class="progress">\n          <div class="progress-bar" [style.width.%]="progressValue"></div>\n        </div>\n      </ion-col>\n     \n    </ion-row>\n  </ion-grid>\n\n\n\n\n  <!-- Card Stack -->\n  <label class="flipContainer" *ngIf="ready">\n    <sc-card class="sc-card" *ngFor="let attendant of attendants" [orientation]="cardDirection" [tinder-card]="cardOverlay"\n      [callLike]="attendant.likeEvent" [callDestroy]="attendant.destroyEvent" (onLike)="onCardInteract($event)">\n      <input type="checkbox" />\n      <div class="theCard">\n        <div id="card-front">{{attendant.fronts}}</div>\n        <div id="card-back">{{attendant.backs}}</div>\n      </div>\n    </sc-card>\n  </label>\n\n\n  <!-- FabBtn -->\n  <ion-fab text-center bottom right>\n    <button id="mistake-repeat-btn" ion-fab color="light" (click)="repeatRound()">\n      <ion-icon name="repeat"></ion-icon>\n    </button>\n  </ion-fab>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/mistake/mistake.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_swipe_service_swipe_service__["a" /* SwipeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], MistakePage);
    return MistakePage;
}());

//# sourceMappingURL=mistake.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStackAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_service_storage_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CardStackAddPage = /** @class */ (function () {
    function CardStackAddPage(navCtrl, navParams, viewCtrl, cardService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cardService = cardService;
        this.storage = storage;
    }
    CardStackAddPage.prototype.ionViewDidLoad = function () {
        this.currentDate = new Date().toISOString();
    };
    CardStackAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CardStackAddPage.prototype.addCardStack = function () {
        this.cardService.addCardStack(this.titleCn, this.titleDe, 0);
        //  let newCardStack = this.cardService.cardStacks[this.cardService.cardStacks.length - 1]
        // this.storage.storageAddCardStack(newCardStack)
    };
    CardStackAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-stack-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack-add/card-stack-add.html"*/'<ion-header>\n  <ion-toolbar color="light">\n    <ion-title>\n      New Stack\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-row justify-content-center>\n        <div class="wrapper">\n          <div class="card">\n            <img class="back-img" src="https://farm8.staticflickr.com/7878/45968858365_c38a983ab6.jpg">\n            <div class="card-title">{{titleCn}}</div>\n            <div class="card-subtitle">{{titleDe}}</div>\n          </div>\n        </div>\n      </ion-row>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="Title" clearInput [(ngModel)]=\'titleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="Subtitle" clearInput [(ngModel)]=\'titleDe\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" style="margin-left:10px;">Date:</ion-label>\n      <ion-datetime [(ngModel)]="currentDate" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MM DD"></ion-datetime>\n    </ion-item>\n\n    <!-- divider -->\n    <ion-item>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button id="confirm-btn" ion-button outline round (click)="addCardStack()" (click)="dismiss()">\n        <ion-icon name=\'ios-checkmark-circle-outline\'></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack-add/card-stack-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]])
    ], CardStackAddPage);
    return CardStackAddPage;
}());

//# sourceMappingURL=card-stack-add.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeStackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cube_content_edit_cube_content_edit__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cube_content_add_cube_content_add__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_popover_popover__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_cube_cube__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CubeStackPage = /** @class */ (function () {
    function CubeStackPage(navCtrl, navParams, popoverCtrl, modalControl, cardService, viewCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.modalControl = modalControl;
        this.cardService = cardService;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.cubeStack = navParams.get('itemInfo');
        this.tabInfo = "cube";
    }
    CubeStackPage.prototype.toastSetting = function () {
        this.toast = this.toastCtrl.create({
            message: this.cubeStack.titleDe + ' has been removed',
            duration: 3000,
            position: 'top',
            closeButtonText: "X",
            showCloseButton: true,
        });
    };
    CubeStackPage.prototype.presentPopover = function (ev) {
        var _this = this;
        this.toastSetting();
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__components_popover_popover__["a" /* PopoverComponent */], { cubeStackInfo: this.cubeStack });
        popover.present({
            ev: ev
        });
        popover.onDidDismiss(function () {
            _this.cardService.removeCubeStack(_this.cubeStack);
            _this.toast.present();
            _this.viewCtrl.dismiss();
        });
    };
    CubeStackPage.prototype.closeSlidingItem = function (slidingItem) {
        slidingItem.close();
    };
    CubeStackPage.prototype.openAddModal = function () {
        var addModal = this.modalControl.create(__WEBPACK_IMPORTED_MODULE_4__cube_content_add_cube_content_add__["a" /* CubeContentAddPage */], { cubeBagInfo: this.cubeStack });
        addModal.present();
    };
    CubeStackPage.prototype.openEditModal = function (cube) {
        var editModal = this.modalControl.create(__WEBPACK_IMPORTED_MODULE_3__cube_content_edit_cube_content_edit__["a" /* CubeContentEditPage */], { cubeInfo: cube, cubeStackInfo: this.cubeStack });
        editModal.present();
    };
    CubeStackPage.prototype.removeCube = function (cube) {
        this.cardService.removeCube(cube, this.cubeStack);
    };
    CubeStackPage.prototype.editCubeStack = function () {
        this.cardService.editCubeBag(this.cubeStack, this.cubeStack.titleCn, this.cubeStack.titleDe);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__library__["a" /* LibraryPage */], { tabInfo: this.tabInfo });
    };
    CubeStackPage.prototype.toStudyCubePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_cube_cube__["a" /* CubePage */], { cubeStack: this.cubeStack });
        // this.navCtrl.setRoot(CubePage, {cubeStack: this.cubeStack})
    };
    CubeStackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube-stack',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-stack.html"*/'<ion-header>\n  <ion-navbar color="light">\n    <ion-title>{{ cubeStack.titleDe }}</ion-title>\n    <ion-buttons end>\n      <!-- TODO: "openAddModal()" -->\n      \n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item no-lines>\n          <div class="wrapper">\n            <div>\n              <img class="cube-icon" src="https://cdn.dribbble.com/users/997435/screenshots/5759108/cubes.png">\n              <div class="cube-title" style="text-align:center;">{{cubeStack.titleCn}}</div>\n              <div class="cube-subtitle" style="text-align:center;">{{cubeStack.titleDe}}</div>\n            </div>\n          </div>\n        </ion-item>\n      </ion-col>\n      <ion-col col-7>\n        <ion-list class="cube-cover-textfild">\n          <ion-item>\n            <ion-input placeholder="{{cubeStack.titleCn}}" [(ngModel)]="cubeStack.titleCn" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input placeholder="{{cubeStack.titleDe}}" [(ngModel)]="cubeStack.titleDe" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row id="row-btns">\n      <ion-col col-5>\n        <button id="cube-study-btn" ion-button color="light" small round (click)="toStudyCubePage()">\n          <ion-icon class="cube-cover-btn-icon" name="ios-school-outline"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-7>\n        <button class="cube-cover-edit-btn" ion-button small color="danger" round outline (click)="presentPopover($event)">\n          <ion-icon class="cube-cover-btn-icon" name="ios-trash-outline"></ion-icon>\n        </button>\n        <button class="cube-cover-edit-btn" ion-button small color="primary" round outline (click)="editCubeStack()">\n          <ion-icon class="cube-cover-btn-icon" name="ios-checkmark-circle-outline"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n\n  </ion-grid>\n\n  <hr>\n\n\n\n  <ion-list no-lines>\n    <ion-item-sliding *ngFor="let cube of cubeStack.cubes" #slidingItem>\n\n      <ion-item (click)="openEditModal(cube)">\n        <h2>{{cube.titleCn}}</h2>\n        <p>{{cube.titleDe}}</p>\n        <ion-note item-end>{{cube.date}}</ion-note>\n      </ion-item>\n\n\n\n      <ion-item-options side="left">\n        <!-- TODO: openEditModal(cube)-->\n        <button ion-button color="light" (click)="openEditModal(cube)" (click)="closeSlidingItem(slidingItem)">\n          <ion-icon name="build"></ion-icon>\n          &nbsp;&nbsp;edit&nbsp;&nbsp;\n        </button>\n        <button ion-button color="danger" (click)="removeCube(cube)">\n          <ion-icon name="trash"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="light" id="addBtn" (click)="openAddModal()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-stack.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], CubeStackPage);
    return CubeStackPage;
}());

//# sourceMappingURL=cube-stack.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeContentEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CubeContentEditPage = /** @class */ (function () {
    function CubeContentEditPage(navCtrl, navParams, viewControl, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewControl = viewControl;
        this.cardService = cardService;
        this.cube = navParams.get("cubeInfo");
        this.cubeStack = navParams.get("cubeStackInfo");
        this.cubeSide1 = this.cube.cubeSide1;
        this.cubeSide2 = this.cube.cubeSide2;
        this.cubeSide3 = this.cube.cubeSide3;
        this.cubeSide4 = this.cube.cubeSide4;
    }
    CubeContentEditPage.prototype.editCube = function () {
        this.cardService.editCube(this.cube, this.cubeSide1, this.cubeSide2, this.cubeSide3, this.cubeSide4);
    };
    CubeContentEditPage.prototype.removeCube = function () {
        this.cardService.removeCube(this.cube, this.cubeStack);
    };
    CubeContentEditPage.prototype.dismiss = function () {
        this.viewControl.dismiss();
    };
    CubeContentEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube-content-edit',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-edit/cube-content-edit.html"*/'<ion-header>\n  <ion-toolbar color="light">\n    <ion-title>\n      EditCube\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- <ion-item>\n    <ion-range min="2" max="10" step="1" pin="true" snaps="true" [(ngModel)]="sideLength" (ionChange)="onRangeChange(slideValue)">\n      <ion-icon range-left small ios="logo-buffer" md="logo-buffer"></ion-icon>\n      <ion-icon range-right ios="logo-buffer" md="logo-buffer"></ion-icon>\n    </ion-range>\n  </ion-item>\n\n  <ion-list>\n\n    <ion-item *ngFor="let side of sides; let index = index; trackBy:trackByIndex;">\n      <ion-label color="primary" stacked>description</ion-label>\n      <ion-input placeholder="chinese..." [(ngModel)]=\'sides[index]\' clearInput></ion-input>\n    </ion-item>\n\n  </ion-list> -->\n\n  <ion-list>\n\n    <ion-item>\n      <ion-input placeholder="Title" type="text" [(ngModel)]=\'cube.titleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="Subtitle" type="text" [(ngModel)]=\'cube.titleDe\'></ion-input>\n    </ion-item>\n\n    <ion-item></ion-item>\n\n  </ion-list>\n\n  <ion-list>\n\n    <ion-item>\n      <ion-input placeholder="opt 1" [(ngModel)]=\'cubeSide1\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="opt 2" [(ngModel)]=\'cubeSide2\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="opt 3" [(ngModel)]=\'cubeSide3\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="opt 4" [(ngModel)]=\'cubeSide4\'></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="cube-edit-btn" ion-button outline round color="danger" (click)="removeCube()" (click)="dismiss()">\n        <ion-icon name="ios-trash-outline"></ion-icon>\n      </button>\n      <button class="cube-edit-btn" ion-button outline round (click)="editCube()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-edit/cube-content-edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], CubeContentEditPage);
    return CubeContentEditPage;
}());

//# sourceMappingURL=cube-content-edit.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeContentAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CubeContentAddPage = /** @class */ (function () {
    function CubeContentAddPage(navCtrl, navParams, viewControl, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewControl = viewControl;
        this.cardService = cardService;
        this.date = new Date().toISOString();
        this.cubeBag = navParams.get("cubeBagInfo");
        //this.sides = new Array(this.sideLength)
    }
    CubeContentAddPage.prototype.addCube = function () {
        this.cardService.addCube(this.cubeBag, this.cubeTitleCn, this.cubeTitleDe, this.cubeSide1, this.cubeSide2, this.cubeSide3, this.cubeSide4);
    };
    // onRangeChange() {
    //   // set isEmpty string boolean value
    //   for (let i = 0; i < this.sides.length; i++) {
    //     if (this.sides[i] == undefined) {
    //       this.isEmptyArray = true
    //     }
    //     else {
    //       this.isEmptyArray = false
    //     }
    //   }
    //   if (this.isEmptyArray) { // FIXME: case 01: Empty Array 
    //     this.sides = new Array(this.sideLength)
    //   }
    //   else if (this.sideLength > this.sides.length) { // FIXME: case 02: ArrayItem++
    //     this.sides.push(null);
    //   }
    //   else if (this.sideLength < this.sides.length) { // FIXME: case 03: ArrayItem--
    //     this.sides.pop()
    //   }
    // }
    // trackByIndex(index: number, obj: any): any {
    //   return index;
    // }
    CubeContentAddPage.prototype.dismiss = function () {
        this.viewControl.dismiss();
    };
    CubeContentAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube-content-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-add/cube-content-add.html"*/'<ion-header>\n  <ion-toolbar color="light">\n    <ion-title>\n      NewCube\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- <ion-item>\n    <ion-range min="2" \n               max="10" \n               step="1" \n               pin="true" \n               snaps="true" \n               [(ngModel)]="sideLength"\n               (ionChange)="onRangeChange()">\n      <ion-icon range-left small ios="logo-buffer" md="logo-buffer"></ion-icon>\n      <ion-icon range-right ios="logo-buffer" md="logo-buffer"></ion-icon>\n    </ion-range>\n  </ion-item>\n\n  <ion-list>\n\n    <ion-item *ngFor="let side of sides; let index = index; trackBy:trackByIndex;" >\n      <ion-label color="primary" stacked>description</ion-label>\n      <ion-input placeholder="chinese..." [(ngModel)]=\'sides[index]\'  clearInput></ion-input>\n    </ion-item>\n\n  </ion-list> -->\n\n\n\n  <ion-list>\n\n    <ion-item>\n      <ion-input placeholder="Title" type="text" [(ngModel)]=\'cubeTitleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="Subtitle" type="text" [(ngModel)]=\'cubeTitleDe\'></ion-input>\n    </ion-item>\n\n     <ion-item>\n      <ion-label color="primary" style="margin-left:10px;">Date:</ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DD" [(ngModel)]="date"></ion-datetime>\n    </ion-item> \n    <ion-item></ion-item>\n\n  </ion-list>\n\n  <ion-list>\n\n    <ion-item>\n      <ion-input placeholder="opt 1" type="text" [(ngModel)]=\'cubeSide1\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="opt 2" type="text" [(ngModel)]=\'cubeSide2\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="opt 3" type="text" [(ngModel)]=\'cubeSide3\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="opt 4" type="text" [(ngModel)]=\'cubeSide4\'></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="cube-save-btn" ion-button outline round (click)="addCube()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-add/cube-content-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], CubeContentAddPage);
    return CubeContentAddPage;
}());

//# sourceMappingURL=cube-content-add.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeStackAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CubeStackAddPage = /** @class */ (function () {
    function CubeStackAddPage(navCtrl, navParams, viewCtrl, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cardService = cardService;
    }
    CubeStackAddPage.prototype.ionViewDidLoad = function () {
        this.currentDate = new Date().toISOString();
    };
    CubeStackAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CubeStackAddPage.prototype.addCubeStack = function () {
        this.cardService.addCubeStack(this.titleCn, this.titleDe);
    };
    CubeStackAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube-stack-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack-add/cube-stack-add.html"*/'<ion-header>\n  <ion-toolbar color="light">\n    <ion-title>\n      Add CubeStack\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <ion-item>\n      <ion-input placeholder="Title" clearInput [(ngModel)]=\'titleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-input placeholder="Subtitle" clearInput [(ngModel)]=\'titleDe\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" style="margin-left:10px;">Date:</ion-label>\n      <ion-datetime [(ngModel)]="currentDate" displayFormat="YYYY-MM-DD" pickerFormat="YYYY MM DD"></ion-datetime>\n    </ion-item>\n\n    <ion-item></ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button id="cube-add-confirm" ion-button outline round style="margin-bottom: 20px;" (click)="addCubeStack()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack-add/cube-stack-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], CubeStackAddPage);
    return CubeStackAddPage;
}());

//# sourceMappingURL=cube-stack-add.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfinityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InfinityPage = /** @class */ (function () {
    function InfinityPage(navCtrl, navParams, platform, domCtrl, renderer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.domCtrl = domCtrl;
        this.renderer = renderer;
        this.zoomAmount = 1;
        this.gammaAverage = [];
        this.gammaLatestTilt = 0;
        this.gammaMaxTilt = 20;
        this.betaAverage = [];
        this.betaLatestTilt = 0;
        this.betaMaxTilt = 20;
        this.width = 0;
        this.cards = [];
        for (var i = 0; i < 150; i++) {
            this.cards.push(i);
        }
        this.isActive = false;
    }
    //#region [1. initTilt]
    InfinityPage.prototype.ngOnInit = function () {
        // this.height = this.tiltHeight || this.platform.height();
        this.height = this.platform.height();
        this.width = this.platform.width();
        // 长宽比
        this.aspectRatio = this.infinity.nativeElement.offsetWidth / this.infinity.nativeElement.offsetHeight;
        this.renderTilt();
    };
    InfinityPage.prototype.renderTilt = function () {
        this.infinity.nativeElement.height = this.height;
        this.resizedImageWidth = this.aspectRatio * this.infinity.nativeElement.offsetHeight;
        this.renderer.setElementStyle(this.infinity.nativeElement, 'width', this.resizedImageWidth + 'px');
        this.delta = this.resizedImageWidth - this.width;
        // 中心偏移量；中心起点
        this.centerOffset = this.delta / 2;
        this.updatePosition();
    };
    //#endregion
    //#region [2. get sensor Data]
    InfinityPage.prototype.onDeviceOrientation = function (ev) {
        var _this = this;
        if (this.isActive) {
            //
            // Gamma：水平方向位移
            if (this.gammaAverage.length > 8) {
                this.gammaAverage.shift();
            }
            // Gamma: 收集水平位移量
            this.gammaAverage.push(ev.gamma);
            // Gamma：求过去八次的平均值
            this.gammaLatestTilt = this.gammaAverage.reduce(function (previous, current) {
                return previous + current - 20;
            }) / this.gammaAverage.length;
            //
            // Beta: 垂直方向位移
            if (this.betaAverage.length > 8) {
                this.betaAverage.shift();
            }
            // Beta: 收集垂直方向位移量
            this.betaAverage.push(ev.beta);
            // Beta: 求过去八次的平均值
            this.betaLatestTilt = this.betaAverage.reduce(function (previous, current) {
                return previous + current - 35;
            }) / this.betaAverage.length;
            this.domCtrl.write(function () {
                _this.updatePosition();
            });
        }
    };
    //#endregion
    //#region [3. to scroll]
    InfinityPage.prototype.gammaUpdatePosition = function () {
        var gammaTilt = this.gammaLatestTilt;
        // if (gammaTilt > 0) {
        //   gammaTilt = Math.min(gammaTilt, this.gammaMaxTilt);
        // } else {
        //   gammaTilt = Math.max(gammaTilt, this.gammaMaxTilt * -1);
        // }
        var gammaPxToMove = (gammaTilt * this.centerOffset) / this.gammaMaxTilt;
        var gammaToMove = (this.centerOffset + gammaPxToMove) * -1;
        return gammaToMove;
    };
    InfinityPage.prototype.betaUpdatePosition = function () {
        var betaTilt = this.betaLatestTilt;
        // if (betaTilt > 0) {
        //   betaTilt = Math.min(betaTilt, this.betaMaxTilt)
        // } else {
        //   betaTilt = Math.min(betaTilt, this.betaMaxTilt * -1)
        // }
        var betaPxToMove = (betaTilt * this.centerOffset) / this.betaMaxTilt;
        var betaToMove = (this.centerOffset + betaPxToMove) * -1;
        return betaToMove;
    };
    InfinityPage.prototype.updatePosition = function () {
        var gammaToMove = this.gammaUpdatePosition();
        var betaToMove = this.betaUpdatePosition();
        this.scrollCountent(gammaToMove, betaToMove);
    };
    InfinityPage.prototype.scrollCountent = function (gammaToMove, betaToMove) {
        var betaCleanNum = Math.round(-betaToMove / 8);
        var gammaCleanNum = Math.round(-gammaToMove / 8);
        this.content.scrollTo(gammaCleanNum, betaCleanNum, 0.005);
    };
    //#endregion
    //#region [0. Hold to active scroll]
    InfinityPage.prototype.mouseDown = function () {
        this.isActive = true;
        if (this.isActive) {
        }
    };
    InfinityPage.prototype.mouseUp = function () {
        this.isActive = false;
        if (!this.isActive) {
            //this.zoomAmount = 1
        }
    };
    InfinityPage.prototype.panRightEvent = function (e) {
        this.zoomAmount -= 0.03;
        console.log('zoomAmount: ', this.zoomAmount);
        console.log('right');
    };
    InfinityPage.prototype.panLeftEvent = function (e) {
        this.zoomAmount += 0.03;
        console.log('zoomAmount: ', this.zoomAmount);
        console.log('left');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('infinity'),
        __metadata("design:type", Object)
    ], InfinityPage.prototype, "infinity", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["b" /* Content */])
    ], InfinityPage.prototype, "content", void 0);
    InfinityPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-infinity',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/infinity/infinity.html"*/'<ion-header>\n\n  <ion-navbar color="light">\n    <ion-title style="text-align:center;">Infinity</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="no-scroll" padding #content scrollX="true" scrollY="true" (panright)=\'panRightEvent($event)\'\n  (panleft)=\'panLeftEvent($event)\' style="width: 100%; height: 100%;">\n\n  <div #infinity class="wrapper" [style.zoom]=\'zoomAmount\'>\n    <div *ngFor="let card of cards">\n      <label class="flipContainer">\n        <input type="checkbox" />\n\n        <div class="theCard">\n          <div id="questionSide">{{card}}</div>\n          <div class="back">Answer</div>\n        </div>\n      </label>\n    </div>\n  </div>\n\n  <ion-fab center bottom>\n    <button id="active-btn" color="light" ion-fab round large (mousedown)=\'mouseDown()\' (mouseup)=\'mouseUp()\'\n      (touchstart)=\'mouseDown()\' (touchend)=\'mouseUp()\'>\n      <ion-icon name="radio-button-off" style="zoom:1.5;"></ion-icon>\n    </button>\n  </ion-fab>\n\n  <ion-item style="transform: rotateX(90deg);">\n    <ion-badge item-end>{{zoomAmount}}</ion-badge>\n    <ion-range step="0,1" min="0" max="10" snaps="true" [(ngModel)]="zoomAmount">\n      <ion-icon range-left small name="sunny"></ion-icon>\n      <ion-icon range-right name="sunny"></ion-icon>\n    </ion-range>\n  </ion-item>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/infinity/infinity.html"*/,
            host: {
                '(window:deviceorientation)': 'onDeviceOrientation($event)',
                '(window:resize)': 'ngOnInit()'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* DomController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["V" /* Renderer */]])
    ], InfinityPage);
    return InfinityPage;
}());

//# sourceMappingURL=infinity.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChartPage = /** @class */ (function () {
    function ChartPage(navCtrl, navParams, dbService, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbService = dbService;
        this.cardService = cardService;
        this.actualAmount = 0;
        // Chart[2]: StudyTrend
        this.dateHub = [];
        this.actualAmounts = [];
        // Chart[3]: StackProgress
        this.stackTitles = [];
        this.stackProgress = [];
        this.resultObjs = [];
    }
    ChartPage.prototype.ionViewDidEnter = function () {
        // Chart[1]: StudyToday
        this.getTodayStudy();
        // Chart[2]: StudyTrend
        this.getLineChartDates();
        this.getLineChartActualAmounts();
        // Chart[3]: StackProgress
        //this.getBarChartData()
        this.getTop5();
        //console.log('ChartBar:getBarChartData:stackTitles: ', this.stackTitles)
        //console.log('ChartBar:getBarChartData:stackProgress: ', this.stackProgress)
        // console.log("lineChart:actualAmounts: ", this.actualAmounts)
        // charts layout
        this.lineChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.dateHub,
                datasets: [{
                        label: "Study Amount",
                        data: this.actualAmounts,
                        backgroundColor: 'rgb(200, 230, 201)',
                        borderColor: 'rgb(0, 151, 167)',
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
        this.barChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.barCanvas.nativeElement, {
            type: 'horizontalBar',
            data: {
                labels: this.stackTitles,
                datasets: [{
                        label: 'progress',
                        data: this.stackProgress,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255,99,132,1)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                    xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    };
    ChartPage.prototype.ionViewDidLeave = function () {
        // Chart[2]: StudyTrend
        this.stackTitles = [];
        this.stackProgress = [];
        this.resultObjs = [];
        console.log('didLeave!!!', this.resultObjs);
    };
    ChartPage.prototype.onSelected = function () {
        this.circleDisplay = this.actualAmount / this.planAmount * 100;
        // update DB
        this.todayStudy.planAmount = this.planAmount;
        this.dbService.update(this.todayStudy, __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__["b" /* TABLES */].StudyDaily);
    };
    ChartPage.prototype.removeDefaultData = function () {
        var defaultData = this.cardService.studys;
    };
    //Chart[3]
    ChartPage.prototype.getBarChartData = function () {
        var studysLength = this.cardService.studys.length;
        var studys = this.cardService.studys;
        var theIndex = 1;
        while (this.resultObjs.length < 5) {
            var study = studys[studysLength - theIndex];
            if (study) {
                if (this.resultObjs.length != 0) {
                    var findItem = this.resultObjs.find(function (x) { return x.id == study.id; });
                }
                if (findItem) {
                    theIndex++;
                    continue;
                }
                else {
                    this.resultObjs.push(study);
                    theIndex++;
                }
            }
            else {
                break;
            }
            //console.log("resultObjs: ", resultObjs);
        }
        for (var i = 0; i < this.resultObjs.length; i++) {
            this.stackTitles.push(this.resultObjs[i].stackTitle);
            this.stackProgress.push(this.resultObjs[i].stackProgress);
        }
    };
    ChartPage.prototype.getTop5 = function () {
        var _this = this;
        var scoreByPattern = [];
        this.cardService.studys.forEach(function (study) {
            scoreByPattern.push(study.stackProgress);
            _this.resultObjs.push(study);
        });
        function findIndicesOfMax(inp, count) {
            var outp = [];
            for (var i = 0; i < inp.length; i++) {
                outp.push(i); // add index to output array
                if (outp.length > count) {
                    outp.sort(function (a, b) { return inp[b] - inp[a]; }); // descending sort the output array
                    outp.pop(); // remove the last index (index of smallest element in output array)
                }
            }
            return outp;
        }
        // 本来的数据样本
        // console.log('original array: ', scoreByPattern);
        // 抽取出来的top5项的序号
        var indices = findIndicesOfMax(scoreByPattern, 5);
        // console.log('indices: ', indices);
        // 罗列top5项的值
        for (var i = 0; i < indices.length; i++) {
            this.stackTitles.push(this.resultObjs[indices[i]].stackTitle);
            this.stackProgress.push(this.resultObjs[indices[i]].stackProgress);
        }
        //console.log('greatest scroe *3: ', scoreByPattern[indices[i]]);
    };
    //Chart[2]
    ChartPage.prototype.getLineChartDates = function () {
        if (this.dateHub.length === 0) {
            for (var i = 9; i > -1; i--) {
                this.dateHub.push(this.cardService.getDateAnySimple(-i));
            }
        }
    };
    ChartPage.prototype.getLineChartActualAmounts = function () {
        var _this = this;
        if (this.actualAmounts.length < 10) {
            var _loop_1 = function (i) {
                var studyDaily = this_1.cardService.studyDailys.find(function (x) { return x.date == _this.cardService.getDateAny(-i); });
                if (studyDaily) {
                    this_1.actualAmounts.push(studyDaily.actualAmount);
                }
                else {
                    this_1.actualAmounts.push(0);
                }
            };
            var this_1 = this;
            for (var i = 9; i > -1; i--) {
                _loop_1(i);
            }
        }
        else {
            var lastDailyStudyIndex = this.cardService.studyDailys.length - 1;
            var lastActualAmountsIndex = this.actualAmounts.length - 1;
            this.actualAmounts[lastActualAmountsIndex] = this.cardService.studyDailys[lastDailyStudyIndex].actualAmount;
            //console.log('Chart:getLineChartActualAmounts:studyDailys: ', this.cardService.studyDailys)
        }
        // console.log('Chart:getLineChartActualAmounts:actualAmounts: ', this.actualAmounts)
    };
    //Chart[1]
    ChartPage.prototype.getTodayStudy = function () {
        var _this = this;
        this.todayStudy = this.cardService.studyDailys.find(function (x) { return x.date == _this.cardService.getDateNow(); });
        // console.log('Chart:getTodayStudy:todayStudy: ', this.todayStudy)
        if (!this.todayStudy) {
            var yesterdayStudy = this.cardService.studyDailys[this.cardService.studyDailys.length - 1]; // get the last item, inherit PlanAmount
            // console.log("Chart:getTodayStudy:yesterdayStudy: ", yesterdayStudy)
            this.planAmount = yesterdayStudy.planAmount;
            this.actualAmount = 0;
            this.circleDisplay = this.actualAmount / this.planAmount * 100;
            return;
        }
        this.planAmount = this.todayStudy.planAmount;
        this.actualAmount = this.todayStudy.actualAmount;
        this.circleDisplay = this.actualAmount / this.planAmount * 100;
        //console.log('Chart:getTodayData:planAmount: ', this.planAmount)
        //console.log('Chart:getTodayData:actualAmount: ', this.actualAmount)
        //console.log('Chart:getTodayData:circleDisplay: ', this.circleDisplay)
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas'),
        __metadata("design:type", Object)
    ], ChartPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], ChartPage.prototype, "lineCanvas", void 0);
    ChartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chart',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/chart/chart.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title id="chart-title">Chart</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  \n  <ion-card id="chart-card1">\n    <ion-card-header>\n      Today\n    </ion-card-header>\n    <ion-card-content>\n        <ion-item id="chart-todaystudy-header">\n            <ion-label></ion-label>\n            <ion-select  (ionChange)="onSelected()"  [(ngModel)]="planAmount">\n              <ion-option value="10" clear>10</ion-option>\n              <ion-option value="30" clear>30</ion-option>\n              <ion-option value="50" clear>50</ion-option>\n            </ion-select>\n          </ion-item>\n        <div class="not-active" style="text-align: center; padding: 20px;">\n            <circle-progress id="chart-circle-progress"\n            [percent]="circleDisplay"\n            [radius]="100"\n            [outerStrokeWidth]="16"\n            [innerStrokeWidth]="8"\n            [outerStrokeColor]="\'#0097A7\'"\n            [innerStrokeColor]="\'#C8E6C9\'"\n            [animation]="true"\n            [animationDuration]="300"\n            [titleColor]="\'#2e3131\'"\n            [titleFontSize]="45"\n            [showSubtitle]="false"\n            [unitsColor]="\'#2e3131\'"\n            [unitsFontSize]="45"\n         ></circle-progress>\n        </div>\n    </ion-card-content>\n  </ion-card>\n  \n  <ion-card class="chart-card">\n    <ion-card-header>\n      Trend \n    </ion-card-header>\n    <ion-card-content id="chart-line">\n        <canvas #lineCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="chart-card">\n    <ion-card-header>\n      Top Study\n    </ion-card-header>\n    <ion-card-content id="chart-bar">\n        <canvas #barCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/chart/chart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_db_service_db_service__["a" /* DbServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], ChartPage);
    return ChartPage;
}());

//# sourceMappingURL=chart.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(577);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TABLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DB_NAME = 'infinityDB';
var win = window;
var TABLES;
(function (TABLES) {
    TABLES[TABLES["CardStack"] = 0] = "CardStack";
    TABLES[TABLES["Card"] = 1] = "Card";
    TABLES[TABLES["CubeStack"] = 2] = "CubeStack";
    TABLES[TABLES["Cube"] = 3] = "Cube";
    TABLES[TABLES["StudyDaily"] = 4] = "StudyDaily";
    TABLES[TABLES["Study"] = 5] = "Study";
})(TABLES || (TABLES = {}));
;
var DbServiceProvider = /** @class */ (function () {
    function DbServiceProvider(platform) {
        var _this = this;
        this.platform = platform;
        this._dbPromise = new Promise(function (resolve, reject) {
            try {
                var _db_1;
                _this.platform.ready().then(function () {
                    if (_this.platform.is('cordova') && win.sqlitePlugin) {
                        //FOR MOBILE DEVICE
                        _db_1 = win.sqlitePlugin.openDatabase({
                            name: DB_NAME,
                            location: 'default'
                        });
                    }
                    else {
                        //FOR WEBSQL
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        _db_1 = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    resolve(_db_1);
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
        this._tryInit();
    }
    DbServiceProvider.prototype._tryInit = function (drop) {
        if (drop === void 0) { drop = false; }
        if (drop) {
            this.dropTable(TABLES.CardStack);
            this.dropTable(TABLES.Cube);
        }
        this.createCardStackTable();
        this.createCardTable();
        this.createCubeStackTable();
        this.createCubeTable();
        this.createStudyDailyTable();
        this.createStudyTable();
    };
    DbServiceProvider.prototype.dropTable = function (table) {
        this.query("DROP TABLE " + TABLES[table]).catch(function (err) {
            console.error('Storage: Unable to create initial storage User table', err.tx, err.err);
        });
    };
    // create Tables
    DbServiceProvider.prototype.createCardStackTable = function () {
        this.query("\n      CREATE TABLE IF NOT EXISTS " + TABLES[TABLES.CardStack] + " (\n                        id integer primary key,\n                        titleCn text,\n                        titleDe text,\n                        date text,\n                        cards text,\n                        progress varchar\n                     )\n    ").catch(function (err) {
            console.error('Storage: Unable to create initial storage Card table', err.tx, err.err);
        });
    };
    DbServiceProvider.prototype.createCardTable = function () {
        this.query("\n      CREATE TABLE IF NOT EXISTS " + TABLES[TABLES.Card] + " (\n                        id integer primary key,\n                        cardStackId integer,\n                        textCn text,\n                        textDe text,\n                        date text,\n                        status text,\n                        FOREIGN KEY(cardStackId) REFERENCES CardStack(id)\n                     )\n    ").catch(function (err) {
            console.error('Storage: Unable to create initial storage Card table', err.tx, err.err);
        });
    };
    DbServiceProvider.prototype.createCubeStackTable = function () {
        this.query("\n    CREATE TABLE IF NOT EXISTS " + TABLES[TABLES.CubeStack] + " (\n                        id integer primary key,\n                        titleCn text,\n                        titleDe text,\n                        cubes text,\n                        date text,\n                        progress varchar\n                   )\n    ").catch(function (err) {
            console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
        });
    };
    DbServiceProvider.prototype.createCubeTable = function () {
        this.query("\n      CREATE TABLE IF NOT EXISTS " + TABLES[TABLES.Cube] + " (\n                      id integer primary key,\n                      cubeStackId integer,\n                      date text,\n                      titleCn text,\n                      titleDe text,\n                      cubeSide1 text,\n                      cubeSide2 text,\n                      cubeSide3 text,\n                      cubeSide4 text,\n                      FOREIGN KEY(cubeStackId) REFERENCES CubeStack(id)\n                     )\n    ").catch(function (err) {
            console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
        });
    };
    DbServiceProvider.prototype.createStudyDailyTable = function () {
        this.query("\n      CREATE TABLE IF NOT EXISTS " + TABLES[TABLES.StudyDaily] + " (\n                      id integer primary key,\n                      studys text,\n                      date text,\n                      planAmount integer,\n                      actualAmount integer\n                     )\n    ").catch(function (err) {
            console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
        });
    };
    DbServiceProvider.prototype.createStudyTable = function () {
        this.query("\n      CREATE TABLE IF NOT EXISTS " + TABLES[TABLES.Study] + " (\n                      id integer primary key,\n                      studyDailyId integer,\n                      stackTitle text,\n                      stackProgress integer,\n                      FOREIGN KEY(studyDailyId) REFERENCES StudyDaily(id)\n                     )\n    ").catch(function (err) {
            console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
        });
    };
    DbServiceProvider.prototype.query = function (query, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this._dbPromise.then(function (db) {
                    db.transaction(function (tx) {
                        tx.executeSql(query, params, function (tx, res) { return resolve({ tx: tx, res: res }); }, function (tx, err) { return reject({ tx: tx, err: err }); });
                    }, function (err) { return reject({ err: err }); });
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
    };
    // Get All items 
    DbServiceProvider.prototype.list = function (table) {
        var _this = this;
        return this.query('SELECT * FROM ' + TABLES[table]).then(function (data) {
            var result = [];
            if (data.res.rows.length > 0) {
                console.log('Rows found.');
                if (_this.platform.is('cordova') && win.sqlitePlugin) {
                    for (var i = 0; i < data.res.rows.length; i++) {
                        var row = data.res.rows.item(i);
                        result.push(row);
                    }
                    return result;
                }
                else {
                    for (var i = 0; i < data.res.rows.length; i++) {
                        var row = data.res.rows.item(i);
                        result.push(row);
                    }
                    // return data.res.rows;
                    return result;
                }
            }
        });
    };
    // Add Item
    DbServiceProvider.prototype.insert = function (newObject, table) {
        return this.query('INSERT INTO ' + TABLES[table] + ' (' + this.getFieldNamesStr(newObject)
            + ') VALUES (' + this.getFieldValuesStr(newObject) + ")", []);
    };
    // Edit Item
    DbServiceProvider.prototype.update = function (object, table) {
        return this.query('UPDATE ' + TABLES[table] + ' SET ' + this.getFieldSetNamesStr(object) + ' WHERE id=?', this.getFieldValuesArray(object));
    };
    // Remove Item
    DbServiceProvider.prototype.delete = function (table, object) {
        var query = "DELETE FROM " + TABLES[table] + " WHERE id=?";
        return this.query(query, [object.id]);
    };
    // columne data
    DbServiceProvider.prototype.getFieldNamesStr = function (newObject) {
        var fields = '';
        for (var f in newObject) {
            if (f !== "id")
                fields += f + ',';
        }
        fields = fields.substr(0, fields.length - 1);
        return fields;
    };
    DbServiceProvider.prototype.getFieldValuesStr = function (object) {
        var fields = '';
        for (var f in object) {
            if (f !== "id")
                fields += '\"' + object[f] + '\",';
        }
        fields = fields.substr(0, fields.length - 1);
        return fields;
    };
    DbServiceProvider.prototype.getFieldSetNamesStr = function (object) {
        var fields = '';
        for (var f in object) {
            if (f !== "id")
                fields += f + "=? ,";
        }
        fields = fields.substr(0, fields.length - 1);
        return fields;
    };
    DbServiceProvider.prototype.getFieldValuesArray = function (object) {
        var fields = [];
        for (var f in object) {
            if (f !== "id")
                fields.push(object[f]);
        }
        fields.push(object.id);
        return fields;
    };
    DbServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */]])
    ], DbServiceProvider);
    return DbServiceProvider;
}());

//# sourceMappingURL=db-service.js.map

/***/ }),

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_library_library__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_cube_cube__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_infinity_infinity__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_library_card_stack_card_stack__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_library_card_stack_card_content_edit_card_content_edit__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_library_card_stack_add_card_stack_add__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_library_card_stack_card_content_add_card_content_add__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_swipe_swipe__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng2_swipe_cards__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser_animations__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_swipe_service_swipe_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_library_cube_stack_cube_stack__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_library_cube_stack_add_cube_stack_add__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_library_cube_stack_cube_content_add_cube_content_add__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_library_cube_stack_cube_content_edit_cube_content_edit__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_popover_popover__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_cube_list_icon_cube_list_icon__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_swipe_mistake_mistake__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_storage_service_storage_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_storage__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_sql_storage_sql_storage__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_db_service_db_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_chart_chart__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_ng_circle_progress__ = __webpack_require__(684);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_swipe_swipe__["a" /* SwipePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_swipe_mistake_mistake__["a" /* MistakePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_library_library__["a" /* LibraryPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_library_card_stack_add_card_stack_add__["a" /* CardStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_library_card_stack_card_stack__["a" /* CardStackPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_library_card_stack_card_content_edit_card_content_edit__["a" /* CardContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_library_card_stack_card_content_add_card_content_add__["a" /* CardContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_cube_cube__["a" /* CubePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_infinity_infinity__["a" /* InfinityPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_library_cube_stack_cube_stack__["a" /* CubeStackPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_library_cube_stack_add_cube_stack_add__["a" /* CubeStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_library_cube_stack_cube_content_add_cube_content_add__["a" /* CubeContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_library_cube_stack_cube_content_edit_cube_content_edit__["a" /* CubeContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_chart_chart__["a" /* ChartPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_26__components_popover_popover__["a" /* PopoverComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_cube_list_icon_cube_list_icon__["a" /* CubeListIconComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_30__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_19_ng2_swipe_cards__["a" /* SwipeCardsModule */],
                __WEBPACK_IMPORTED_MODULE_34_ng_circle_progress__["a" /* NgCircleProgressModule */].forRoot({
                    radius: 100,
                    outerStrokeWidth: 16,
                    innerStrokeWidth: 8,
                    outerStrokeColor: "#78C000",
                    innerStrokeColor: "#C7E596",
                    animationDuration: 300,
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_swipe_swipe__["a" /* SwipePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_swipe_mistake_mistake__["a" /* MistakePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_library_library__["a" /* LibraryPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_library_card_stack_add_card_stack_add__["a" /* CardStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_cube_cube__["a" /* CubePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_library_card_stack_card_stack__["a" /* CardStackPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_library_card_stack_card_content_edit_card_content_edit__["a" /* CardContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_library_card_stack_card_content_add_card_content_add__["a" /* CardContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_infinity_infinity__["a" /* InfinityPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_library_cube_stack_cube_stack__["a" /* CubeStackPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_library_cube_stack_add_cube_stack_add__["a" /* CubeStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_library_cube_stack_cube_content_add_cube_content_add__["a" /* CubeContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_library_cube_stack_cube_content_edit_cube_content_edit__["a" /* CubeContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_chart_chart__["a" /* ChartPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_26__components_popover_popover__["a" /* PopoverComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_card_service_card_service__["a" /* CardServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_swipe_service_swipe_service__["a" /* SwipeServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_storage_service_storage_service__["a" /* StorageServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_31__providers_sql_storage_sql_storage__["a" /* SqlStorageProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_db_service_db_service__["a" /* DbServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_storage_service_storage_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storageService) {
        var _this = this;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            // storageService.initStorage().then(() => this.rootPage = TabsPage)
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__providers_storage_service_storage_service__["a" /* StorageServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStack; });
var CardStack = /** @class */ (function () {
    function CardStack(id, titleCn, titleDe, cards, date, progress) {
        this.cards = [];
        this.id = id;
        this.titleCn = titleCn;
        this.titleDe = titleDe;
        this.cards = cards;
        this.date = date;
        this.progress = progress;
    }
    return CardStack;
}());

//# sourceMappingURL=CardStack.js.map

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var Card = /** @class */ (function () {
    function Card(id, cardStackId, date, textCn, textDe, status) {
        this.id = id;
        this.cardStackId = cardStackId;
        this.date = date;
        this.textCn = textCn;
        this.textDe = textDe;
        this.status = status;
    }
    return Card;
}());

//# sourceMappingURL=Card.js.map

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeStack; });
var CubeStack = /** @class */ (function () {
    function CubeStack(id, titleCn, titleDe, cubes, date, progress) {
        this.id = id;
        this.titleCn = titleCn;
        this.titleDe = titleDe;
        this.cubes = cubes;
        this.date = date;
        this.progress = progress;
    }
    return CubeStack;
}());

//# sourceMappingURL=CubeStack.js.map

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cube; });
var Cube = /** @class */ (function () {
    function Cube(id, cubeStackId, date, titleCn, titleDe, cubeSide1, cubeSide2, cubeSide3, cubeSide4) {
        this.id = id;
        this.cubeStackId = cubeStackId;
        this.date = date;
        this.titleCn = titleCn;
        this.titleDe = titleDe;
        this.cubeSide1 = cubeSide1;
        this.cubeSide2 = cubeSide2;
        this.cubeSide3 = cubeSide3;
        this.cubeSide4 = cubeSide4;
    }
    return Cube;
}());

//# sourceMappingURL=Cube.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudyDaily; });
var StudyDaily = /** @class */ (function () {
    function StudyDaily(id, studys, date, planAmount, actualAmount) {
        this.id = id;
        this.studys = studys;
        this.date = date;
        this.planAmount = planAmount;
        this.actualAmount = actualAmount;
    }
    return StudyDaily;
}());

//# sourceMappingURL=StudyDaily.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Study; });
var Study = /** @class */ (function () {
    function Study(id, studyDailyId, stackTitle, stackProgress) {
        this.id = id;
        this.studyDailyId = studyDailyId;
        this.stackTitle = stackTitle;
        this.stackProgress = stackProgress;
    }
    return Study;
}());

//# sourceMappingURL=Study.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StackType; });
var StackType;
(function (StackType) {
    StackType[StackType["card"] = 0] = "card";
    StackType[StackType["cube"] = 1] = "cube";
})(StackType || (StackType = {}));
//# sourceMappingURL=StackType.js.map

/***/ }),

/***/ 661:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 320,
	"./af.js": 320,
	"./ar": 321,
	"./ar-dz": 322,
	"./ar-dz.js": 322,
	"./ar-kw": 323,
	"./ar-kw.js": 323,
	"./ar-ly": 324,
	"./ar-ly.js": 324,
	"./ar-ma": 325,
	"./ar-ma.js": 325,
	"./ar-sa": 326,
	"./ar-sa.js": 326,
	"./ar-tn": 327,
	"./ar-tn.js": 327,
	"./ar.js": 321,
	"./az": 328,
	"./az.js": 328,
	"./be": 329,
	"./be.js": 329,
	"./bg": 330,
	"./bg.js": 330,
	"./bm": 331,
	"./bm.js": 331,
	"./bn": 332,
	"./bn.js": 332,
	"./bo": 333,
	"./bo.js": 333,
	"./br": 334,
	"./br.js": 334,
	"./bs": 335,
	"./bs.js": 335,
	"./ca": 336,
	"./ca.js": 336,
	"./cs": 337,
	"./cs.js": 337,
	"./cv": 338,
	"./cv.js": 338,
	"./cy": 339,
	"./cy.js": 339,
	"./da": 340,
	"./da.js": 340,
	"./de": 341,
	"./de-at": 342,
	"./de-at.js": 342,
	"./de-ch": 343,
	"./de-ch.js": 343,
	"./de.js": 341,
	"./dv": 344,
	"./dv.js": 344,
	"./el": 345,
	"./el.js": 345,
	"./en-au": 346,
	"./en-au.js": 346,
	"./en-ca": 347,
	"./en-ca.js": 347,
	"./en-gb": 348,
	"./en-gb.js": 348,
	"./en-ie": 349,
	"./en-ie.js": 349,
	"./en-il": 350,
	"./en-il.js": 350,
	"./en-nz": 351,
	"./en-nz.js": 351,
	"./eo": 352,
	"./eo.js": 352,
	"./es": 353,
	"./es-do": 354,
	"./es-do.js": 354,
	"./es-us": 355,
	"./es-us.js": 355,
	"./es.js": 353,
	"./et": 356,
	"./et.js": 356,
	"./eu": 357,
	"./eu.js": 357,
	"./fa": 358,
	"./fa.js": 358,
	"./fi": 359,
	"./fi.js": 359,
	"./fo": 360,
	"./fo.js": 360,
	"./fr": 361,
	"./fr-ca": 362,
	"./fr-ca.js": 362,
	"./fr-ch": 363,
	"./fr-ch.js": 363,
	"./fr.js": 361,
	"./fy": 364,
	"./fy.js": 364,
	"./gd": 365,
	"./gd.js": 365,
	"./gl": 366,
	"./gl.js": 366,
	"./gom-latn": 367,
	"./gom-latn.js": 367,
	"./gu": 368,
	"./gu.js": 368,
	"./he": 369,
	"./he.js": 369,
	"./hi": 370,
	"./hi.js": 370,
	"./hr": 371,
	"./hr.js": 371,
	"./hu": 372,
	"./hu.js": 372,
	"./hy-am": 373,
	"./hy-am.js": 373,
	"./id": 374,
	"./id.js": 374,
	"./is": 375,
	"./is.js": 375,
	"./it": 376,
	"./it.js": 376,
	"./ja": 377,
	"./ja.js": 377,
	"./jv": 378,
	"./jv.js": 378,
	"./ka": 379,
	"./ka.js": 379,
	"./kk": 380,
	"./kk.js": 380,
	"./km": 381,
	"./km.js": 381,
	"./kn": 382,
	"./kn.js": 382,
	"./ko": 383,
	"./ko.js": 383,
	"./ku": 384,
	"./ku.js": 384,
	"./ky": 385,
	"./ky.js": 385,
	"./lb": 386,
	"./lb.js": 386,
	"./lo": 387,
	"./lo.js": 387,
	"./lt": 388,
	"./lt.js": 388,
	"./lv": 389,
	"./lv.js": 389,
	"./me": 390,
	"./me.js": 390,
	"./mi": 391,
	"./mi.js": 391,
	"./mk": 392,
	"./mk.js": 392,
	"./ml": 393,
	"./ml.js": 393,
	"./mn": 394,
	"./mn.js": 394,
	"./mr": 395,
	"./mr.js": 395,
	"./ms": 396,
	"./ms-my": 397,
	"./ms-my.js": 397,
	"./ms.js": 396,
	"./mt": 398,
	"./mt.js": 398,
	"./my": 399,
	"./my.js": 399,
	"./nb": 400,
	"./nb.js": 400,
	"./ne": 401,
	"./ne.js": 401,
	"./nl": 402,
	"./nl-be": 403,
	"./nl-be.js": 403,
	"./nl.js": 402,
	"./nn": 404,
	"./nn.js": 404,
	"./pa-in": 405,
	"./pa-in.js": 405,
	"./pl": 406,
	"./pl.js": 406,
	"./pt": 407,
	"./pt-br": 408,
	"./pt-br.js": 408,
	"./pt.js": 407,
	"./ro": 409,
	"./ro.js": 409,
	"./ru": 410,
	"./ru.js": 410,
	"./sd": 411,
	"./sd.js": 411,
	"./se": 412,
	"./se.js": 412,
	"./si": 413,
	"./si.js": 413,
	"./sk": 414,
	"./sk.js": 414,
	"./sl": 415,
	"./sl.js": 415,
	"./sq": 416,
	"./sq.js": 416,
	"./sr": 417,
	"./sr-cyrl": 418,
	"./sr-cyrl.js": 418,
	"./sr.js": 417,
	"./ss": 419,
	"./ss.js": 419,
	"./sv": 420,
	"./sv.js": 420,
	"./sw": 421,
	"./sw.js": 421,
	"./ta": 422,
	"./ta.js": 422,
	"./te": 423,
	"./te.js": 423,
	"./tet": 424,
	"./tet.js": 424,
	"./tg": 425,
	"./tg.js": 425,
	"./th": 426,
	"./th.js": 426,
	"./tl-ph": 427,
	"./tl-ph.js": 427,
	"./tlh": 428,
	"./tlh.js": 428,
	"./tr": 429,
	"./tr.js": 429,
	"./tzl": 430,
	"./tzl.js": 430,
	"./tzm": 431,
	"./tzm-latn": 432,
	"./tzm-latn.js": 432,
	"./tzm.js": 431,
	"./ug-cn": 433,
	"./ug-cn.js": 433,
	"./uk": 434,
	"./uk.js": 434,
	"./ur": 435,
	"./ur.js": 435,
	"./uz": 436,
	"./uz-latn": 437,
	"./uz-latn.js": 437,
	"./uz.js": 436,
	"./vi": 438,
	"./vi.js": 438,
	"./x-pseudo": 439,
	"./x-pseudo.js": 439,
	"./yo": 440,
	"./yo.js": 440,
	"./zh-cn": 441,
	"./zh-cn.js": 441,
	"./zh-hk": 442,
	"./zh-hk.js": 442,
	"./zh-tw": 443,
	"./zh-tw.js": 443
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 661;

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeListIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CubeListIconComponent = /** @class */ (function () {
    function CubeListIconComponent() {
        console.log('Hello CubeListIconComponent Component');
    }
    CubeListIconComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cube-list-icon',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/components/cube-list-icon/cube-list-icon.html"*/'\n\n  <p class="cube-wrapper">\n    <ion-icon name="cube" class="single-cube" color="light" ></ion-icon>\n    <br>\n    <ion-icon name="cube" class="single-cube" color="light" style="margin-left:5px;"></ion-icon>\n    <ion-icon name="cube" class="single-cube" color="light"></ion-icon>\n  </p>\n\n \n\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/components/cube-list-icon/cube-list-icon.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], CubeListIconComponent);
    return CubeListIconComponent;
}());

//# sourceMappingURL=cube-list-icon.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sql_storage_sql_storage__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__db_service_db_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var win = window;
var StorageServiceProvider = /** @class */ (function () {
    function StorageServiceProvider(storage, sql, dbService) {
        this.storage = storage;
        this.sql = sql;
        this.dbService = dbService;
        this.sqlMode = false;
        if (win.sqlitePlugin) {
            this.sqlMode = true;
        }
        else {
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        }
    }
    //CubeStack
    StorageServiceProvider.prototype.storageGetAllCubeStacks = function () {
        if (this.sqlMode) {
            return this.sql.cubeGetAll();
        }
    };
    StorageServiceProvider.prototype.storageAddCubeStack = function (cubeStack) {
        if (this.sqlMode) {
            this.sql.cubeSet((cubeStack.id).toString(), JSON.stringify(cubeStack));
        }
    };
    StorageServiceProvider.prototype.storageRemoveCubeStack = function (cubeStack) {
        if (this.sqlMode) {
            this.sql.cubeRemove(cubeStack.id.toString());
        }
    };
    StorageServiceProvider.prototype.storageEditCubeStack = function (cubeStack) {
        if (this.sqlMode) {
            this.sql.cubeSet((cubeStack.id).toString(), JSON.stringify(cubeStack));
        }
    };
    //Cube
    StorageServiceProvider.prototype.storageAddCube = function (cubeStack) {
        if (this.sqlMode) {
            this.sql.cubeSet(cubeStack.id.toString(), JSON.stringify(cubeStack));
        }
    };
    StorageServiceProvider.prototype.storageRemoveCube = function (cubeStack, cube) {
        // get all the data in this CubeStack
        var newCubeStack = this.storage.get(cubeStack.id.toString()).then(function (cubes) {
            var index = cubes.indexOf(cube);
            if (index > -1) {
                cubes.splice(index, 1);
            }
            cubeStack = newCubeStack;
        });
        if (this.sqlMode) {
            // this.sql.cubeSet(cubeStack.id, JSON.stringify(cubeStack))
            this.dbService.update(cubeStack, __WEBPACK_IMPORTED_MODULE_3__db_service_db_service__["b" /* TABLES */].Cube);
        }
    };
    StorageServiceProvider.prototype.storageEditCube = function (cubeStack) {
        if (this.sqlMode) {
            this.sql.cubeSet(cubeStack.id.toString(), JSON.stringify(cubeStack));
        }
    };
    // CardStack
    StorageServiceProvider.prototype.storageGetAllCardStacks = function () {
        var _this = this;
        if (this.sqlMode) {
            return this.sql.getAll();
        }
        else {
            return new Promise(function (resolve) {
                var cardStacks = [];
                _this.storage.forEach(function (data) {
                    console.log('***inside foreach cards', data);
                    cardStacks.push(JSON.parse(data));
                });
                return resolve(cardStacks);
            });
        }
    };
    StorageServiceProvider.prototype.storageAddCardStack = function (cardStack) {
        if (this.sqlMode) {
            this.sql.set((cardStack.id).toString(), JSON.stringify(cardStack));
        }
        else {
            this.storage.set((cardStack.id).toString(), JSON.stringify(cardStack));
        }
    };
    StorageServiceProvider.prototype.storageRemoveCardStack = function (cardStack) {
        if (this.sqlMode) {
            this.sql.remove(cardStack.id.toString());
        }
        else {
            this.storage.remove(cardStack.id.toString());
        }
    };
    StorageServiceProvider.prototype.storageEditCardStack = function (cardStack) {
        if (this.sqlMode) {
            this.sql.set((cardStack.id).toString(), JSON.stringify(cardStack));
        }
        else {
            this.storage.set((cardStack.id).toString(), JSON.stringify(cardStack));
        }
    };
    // Card
    StorageServiceProvider.prototype.storageAddCard = function (cardStack) {
        //this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack))
        if (this.sqlMode) {
            this.sql.set(cardStack.id.toString(), JSON.stringify(cardStack));
        }
        else {
            this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack));
        }
    };
    StorageServiceProvider.prototype.storageRemoveCard = function (cardStack, card) {
        // get all the data in this CardStack
        var newCardStack = this.storage.get(cardStack.id.toString()).then(function (cards) {
            var index = cards.indexOf(card);
            if (index > -1) {
                cards.splice(index, 1);
            }
            cardStack = newCardStack;
        });
        if (this.sqlMode) {
            this.sql.set(cardStack.id, JSON.stringify(cardStack));
        }
        else {
            this.storage.set(cardStack.id, JSON.stringify(cardStack));
        }
    };
    StorageServiceProvider.prototype.storageEditCard = function (cardStack) {
        if (this.sqlMode) {
            this.sql.set(cardStack.id.toString(), JSON.stringify(cardStack));
        }
        else {
            this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack));
        }
    };
    // initialize
    StorageServiceProvider.prototype.initStorage = function () {
        if (this.sqlMode) {
            return this.sql.initializeDatabase();
        }
        else {
            return new Promise(function (resolve) { return resolve(); });
        }
    };
    StorageServiceProvider.prototype.cubeInitStorage = function () {
        if (this.sqlMode) {
            return this.sql.cubeInitializeDatabase();
        }
    };
    StorageServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__sql_storage_sql_storage__["a" /* SqlStorageProvider */],
            __WEBPACK_IMPORTED_MODULE_3__db_service_db_service__["a" /* DbServiceProvider */]])
    ], StorageServiceProvider);
    return StorageServiceProvider;
}());

//# sourceMappingURL=storage-service.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_stack_card_stack__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__card_stack_add_card_stack_add__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cube_stack_cube_stack__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_cube_stack_add_cube_stack_add__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_storage_service_storage_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var win = window;
var LibraryPage = /** @class */ (function () {
    function LibraryPage(nav, navParams, cardService, modalCtrl, storageService, dbService) {
        this.nav = nav;
        this.navParams = navParams;
        this.cardService = cardService;
        this.modalCtrl = modalCtrl;
        this.storageService = storageService;
        this.dbService = dbService;
        this.libraryMode = 'swipe';
        this.sqlMode = false;
        if (win.sqlitePlugin) {
            this.sqlMode = true;
        }
        else {
            console.warn('SQLite plugin not installed. Falling back to regular Web Storage.');
        }
    }
    LibraryPage.prototype.ionViewDidLoad = function () {
        // load CardStack 
        this.onDefaultCardStack();
        // load Cubes
        this.onDefaultCubeStack();
        // load Studys
        this.onDefaultStudyDb();
    };
    // load Studys Data
    LibraryPage.prototype.onDefaultStudyDb = function () {
        var _this = this;
        this.dbService.list(__WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].StudyDaily).then(function (data) {
            _this.cardService.studyDailys = data;
            if (!_this.cardService.studyDailys) {
                _this.cardService.studyDailys = _this.cardService.defaultStudyDailys();
                _this.dbService.insert(_this.cardService.defaultStudyDailys()[0], __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].StudyDaily);
            }
        }).then(function () {
            _this.dbService.list(__WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].Study).then(function (data) {
                _this.cardService.studys = data;
                if (!_this.cardService.studys) {
                    _this.cardService.studys = _this.cardService.defaultStudys();
                    _this.dbService.insert(_this.cardService.defaultStudys()[0], __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].Study);
                }
            });
        });
    };
    // load Cubes Data
    LibraryPage.prototype.loadCubeDb = function () {
        var _this = this;
        //  this.dbService.list()
        this.dbService.list(__WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].Cube).then(function (data) {
            _this.cardService.cubes = data;
            if (!_this.cardService.cubes) {
                _this.cardService.cubes = _this.cardService.defaultCubes();
                _this.cardService.cubes.forEach(function (cube) {
                    _this.dbService.insert(cube, __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].Cube);
                });
                //  console.log('[S1.5]:Library:loadCubeDb:defaultStack: ', this.cardService.cubeStacks)
            }
            // console.log('[S2]:Library:cubes: ', this.cardService.cubes)
        }).then(function () {
            _this.cardService.cubeStackBuilder(_this.cardService.cubeStacks, _this.cardService.cubes);
            // console.log('[S3]:Library:cubeStackBuilder:CubeStacks: ', this.cardService.cubeStacks)
        });
    };
    LibraryPage.prototype.onDefaultCubeStack = function () {
        var _this = this;
        this.dbService.list(__WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].CubeStack).then(function (data) {
            _this.cardService.cubeStacks = data;
            if (!_this.cardService.cubeStacks) {
                _this.cardService.cubeStacks = _this.cardService.defaultCubeStack();
                _this.dbService.insert(_this.cardService.cubeStacks[0], __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].CubeStack);
            }
            //  console.log('[S1]:Library:cubeStacks: ', this.cardService.cubeStacks)
        }).then(function () {
            _this.loadCubeDb();
        });
    };
    // load Cards Data
    LibraryPage.prototype.loadCardDb = function () {
        var _this = this;
        this.dbService.list(__WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].Card).then(function (data) {
            _this.cardService.cards = data;
            if (!_this.cardService.cards) {
                _this.cardService.cards = _this.cardService.defaultCards();
                _this.cardService.cards.forEach(function (card) {
                    _this.dbService.insert(card, __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].Card);
                });
            }
        }).then(function () {
            _this.cardService.cardStackBuilder(_this.cardService.cardStacks, _this.cardService.cards);
        });
    };
    LibraryPage.prototype.onDefaultCardStack = function () {
        var _this = this;
        this.dbService.list(__WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].CardStack).then(function (data) {
            _this.cardService.cardStacks = data;
            if (!_this.cardService.cardStacks) {
                _this.cardService.cardStacks = _this.cardService.defaultCardStack();
                _this.dbService.insert(_this.cardService.cardStacks[0], __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["b" /* TABLES */].CardStack);
            }
        }).then(function () {
            _this.loadCardDb();
        });
    };
    // open specific card/cube Bag, display all cards or cubes
    LibraryPage.prototype.openCardsPage = function (item) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__card_stack_card_stack__["a" /* CardStackPage */], { itemInfo: item });
    };
    LibraryPage.prototype.openCubeListPage = function (item) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__cube_stack_cube_stack__["a" /* CubeStackPage */], { itemInfo: item });
    };
    // right-top add button
    LibraryPage.prototype.onCardStackAddPage = function () {
        var addCardModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__card_stack_add_card_stack_add__["a" /* CardStackAddPage */]);
        addCardModal.present();
    };
    LibraryPage.prototype.onCubeStackAddPage = function () {
        var AddModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__library_cube_stack_add_cube_stack_add__["a" /* CubeStackAddPage */]);
        AddModal.present();
    };
    LibraryPage.prototype.getCubeStackColor = function () {
        return this.cardService.getRandomBgColor();
    };
    LibraryPage.prototype.closeSlidingItem = function (slidingItem) {
        slidingItem.close();
    };
    LibraryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-library',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/library.html"*/'<ion-header [ngSwitch]="libraryMode" color="light">\n  <!-- TODO: title if need  -->\n  <ion-navbar color="light">\n    <!-- <ion-title>Library</ion-title> -->\n    <!-- <ion-toolbar color="light" >\n    </ion-toolbar> -->\n\n    <ion-segment [(ngModel)]="libraryMode">\n      \n      <ion-segment-button value="swipe">\n        swipe\n      </ion-segment-button>\n      <ion-segment-button value="cube">\n        cube\n      </ion-segment-button>\n    </ion-segment>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content no-padding no-bounce>\n\n  <div [ngSwitch]="libraryMode">\n\n    <!-- cube library mode -->\n    <div *ngSwitchCase="\'cube\'">\n\n      <!--TODO: search input if need: <ion-searchbar class="cubes-searchbar"></ion-searchbar> -->\n\n      <ion-grid>\n        <ion-row>\n          <ion-col *ngFor="let item of cardService.cubeStacks">\n\n            <div class="cubes-card-wrapper" (click)="openCubeListPage(item)">\n              <div class="cubes-card-inner-wrapper">\n                <img class="cubes-card-img" src="https://cdn.dribbble.com/users/997435/screenshots/5759108/cubes.png">\n\n                <div id="cube-progress" class="progress">\n                  <div class="progress-bar bg-warning" style="border-radius:120px;" [style.width.%]="item.progress"></div>\n                </div>\n\n                <div class="cubes-card-title">{{item.titleCn}}</div>\n                <div class="cubes-card-subtitle">{{item.titleDe}}</div>\n              </div>\n\n            </div>\n\n          </ion-col>\n        </ion-row>\n        <ion-fab bottom right>\n          <button ion-fab clear class="addBtn" color=\'light\' (click)="onCubeStackAddPage()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n        </ion-fab>\n      </ion-grid>\n\n    </div>\n\n    <!-- swipe library mode -->\n    <div *ngSwitchCase="\'swipe\'">\n\n      <!--TODO: search input if need: <ion-searchbar class="cubes-searchbar"></ion-searchbar> -->\n\n      <ion-grid>\n        <ion-row>\n          <ion-col *ngFor="let item of cardService.cardStacks">\n\n            <div id="wrapper" >\n              <div class="cardStack-wrapper">\n                <div class="card" (click)="openCardsPage(item)">\n                  <img class="back-img" src="https://farm8.staticflickr.com/7878/45968858365_c38a983ab6.jpg">\n                  <div class="card-title">{{item.titleCn}}</div>\n                  <div class="card-subtitle">{{item.titleDe}}</div>\n                </div>\n              </div>\n\n              <div class="progress">\n                <div class="progress-bar bg-warning" style="border-radius:120px;" [style.width.%]=\'item.progress\'></div>\n              </div>\n            </div>\n\n\n          </ion-col>\n        </ion-row>\n\n        <ion-fab bottom right>\n          <button ion-fab class="addBtn" color=\'light\' (click)="onCardStackAddPage()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n        </ion-fab>\n      </ion-grid>\n    </div>\n\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/library.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_storage_service_storage_service__["a" /* StorageServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_db_service_db_service__["a" /* DbServiceProvider */]])
    ], LibraryPage);
    return LibraryPage;
}());

//# sourceMappingURL=library.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipeServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStatus__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_service_card_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SwipeServiceProvider = /** @class */ (function () {
    function SwipeServiceProvider(http, cardService) {
        this.http = http;
        this.cardService = cardService;
    }
    SwipeServiceProvider.prototype.onProgress = function (swipeResult, attents) {
        return 1 / attents.length * 100;
    };
    SwipeServiceProvider.prototype.changeCardStatue = function (swipeResult, currentCard) {
        if (swipeResult) {
            currentCard.status = __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStatus__["a" /* CardStatus */].success;
        }
        else {
            currentCard.status = __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStatus__["a" /* CardStatus */].failed;
        }
    };
    SwipeServiceProvider.prototype.getRandomNr = function (itemLength) {
        return (Math.floor(Math.random() * itemLength));
    };
    SwipeServiceProvider.prototype.addToFailedCardStack = function (isOk, currentCard) {
        var isExist = this.cardService.failedCardBag.cards.filter(function (x) { return x == currentCard; }).length > 0;
        if (!isOk && !isExist) {
            this.cardService.failedCardBag.cards.push(currentCard);
        }
        else if (isOk) {
            this.cardService.failedCardBag.cards = this.cardService.failedCardBag.cards.filter(function (x) { return x != currentCard; });
        }
    };
    SwipeServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__card_service_card_service__["a" /* CardServiceProvider */]])
    ], SwipeServiceProvider);
    return SwipeServiceProvider;
}());

//# sourceMappingURL=swipe-service.js.map

/***/ })

},[444]);
//# sourceMappingURL=main.js.map