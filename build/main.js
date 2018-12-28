webpackJsonp([0],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
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

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_animations__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_swipe_service_swipe_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swipe_mistake_mistake__ = __webpack_require__(207);
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
    function SwipePage(navCtrl, navParams, cardService, swipeService, platform, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cardService = cardService;
        this.swipeService = swipeService;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.cards = [];
        this.progressValue = 0;
        this.cardBagMode = "standard";
        this.isAndroid = false;
        this.ready = false;
        this.attendants = [];
        this.cardDirection = "xy";
        this.cardOverlay = {
            like: { backgroundColor: '#008975' },
            dislike: { backgroundColor: '#e92828' }
        };
        this.isFlip = 'goBack';
        // this.isAndroid = platform.is('android')
        this.studyCardSwitch();
    }
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
        this.swipeIndex++;
        //TODO: save current card into new stack
        this.swipeService.addToFailedCardStack(event.like, currentCard);
        this.failedCardLength = this.cardService.failedCardBag.cards.length;
    };
    SwipePage.prototype.onMistake = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__swipe_mistake_mistake__["a" /* MistakePage */]);
        modal.present();
    };
    SwipePage.prototype.toggleFlip = function () {
        this.isFlip = (this.isFlip == 'goBack') ? 'goFlip' : 'goBack';
    };
    // review failed Btn
    SwipePage.prototype.reviewFailedCards = function () {
        this.initCards(this.cardService.failedCardBag.cards);
    };
    // new Round Btn
    SwipePage.prototype.startNewRound = function () {
        this.nextCardBag = this.swipeService.getRandomCardBag(this.cardService.cardStacks.length);
        this.cardStack = this.cardService.cardStacks[this.nextCardBag];
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
            selector: 'page-swipe',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/swipe.html"*/'<ion-header>\n\n  <ion-navbar color="primary" no-border-bottom>\n    <ion-title>Swipe</ion-title>\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content id="allCards" padding>\n\n  <!-- TODO: Study and mistake has id to control the width percent-->\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <div id="mistake-filing">\n          <button (click)="onMistake()" style="background:transparent;">\n            <ion-icon name="ios-archive-outline">\n              <ion-badge id="filing-badge" item-end color="danger" *ngIf="failedCardLength > 0">{{cardService.failedCardBag.cards.length}}</ion-badge>\n            </ion-icon>\n          </button>\n        </div>\n      </ion-col>\n      <ion-col col-10>\n        <div class="progress">\n          <div class="progress-bar" [style.width.%]="progressValue"></div>\n        </div>\n      </ion-col>\n     \n    </ion-row>\n  </ion-grid>\n\n  <!-- CardStack -->\n  <label class="flipContainer" *ngIf="ready">\n    <sc-card class="sc-card" *ngFor="let attendant of attendants" [orientation]="cardDirection" [tinder-card]="cardOverlay"\n      [callLike]="attendant.likeEvent" [callDestroy]="attendant.destroyEvent" (onLike)="onCardInteract($event)">\n      <input type="checkbox" />\n      <div class="theCard">\n        <div id="card-front">{{attendant.fronts}}</div>\n        <div id="card-back">{{attendant.backs}}</div>\n      </div>\n    </sc-card>\n  </label>\n\n  <div id="cardStack-title">\n    {{cardStack.titleDe}}\n  </div>\n\n  <!-- next & repeat Btn -->\n  <ion-fab id="more-btn" bottom large right>\n    <button ion-fab color=\'light\'>\n      <ion-icon name="ios-menu"></ion-icon>\n    </button>\n    <ion-fab-list side="left">\n      <button ion-fab class="btn-list" (click)="startNewRound()" color="light">\n        <ion-icon name="fastforward"></ion-icon>\n      </button>\n      <button ion-fab class="btn-list" (click)="repeatRound()" color="light">\n        <ion-icon name="repeat"></ion-icon>\n      </button>\n      <button ion-fab class="btn-list" color="light">\n        <ion-icon name="clock"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/swipe.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["j" /* trigger */])('FlipAnim', [
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('goFlip', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({
                        transform: 'rotateY(180deg)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('goBack', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({
                        transform: 'rotateY(0)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* transition */])('goFlip => goBack', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('200ms ease-out')),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* transition */])('goBack => goFlip', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('400ms ease-in')),
                    // if display back to swipe, then show font 
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["g" /* state */])('goQuickBack', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["h" /* style */])({
                        transform: 'rotateY(0deg)'
                    })),
                    Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["i" /* transition */])('goFlip => goQuickBack', Object(__WEBPACK_IMPORTED_MODULE_2__angular_animations__["e" /* animate */])('0.000001ms ease-out'))
                ]),
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_swipe_service_swipe_service__["a" /* SwipeServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], SwipePage);
    return SwipePage;
}());

//# sourceMappingURL=swipe.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_swipe_service_swipe_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_animations__ = __webpack_require__(52);
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
    function CubePage(navCtrl, navParams, cardService, swipeService, renderer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cardService = cardService;
        this.swipeService = swipeService;
        this.renderer = renderer;
        this.animState = 'idle';
        this.cubeIndex = 0;
        this.progress = 0;
        this.animProgress = 0;
        this.studyCubeSwitch();
    }
    CubePage.prototype.animCube = function () {
        console.log('in animCube');
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
            this.cubeStack = this.studyCubeStack;
        }
        else {
            this.getRandomNext();
        }
    };
    CubePage.prototype.getRandomNext = function () {
        //this.animProgress=0
        // get random CubeStack
        var randomIndex = this.swipeService.getRandomCardBag(this.cardService.cubeStacks.length);
        this.cubes = this.cardService.cubeStacks[randomIndex].cubes;
        this.cubeStack = this.cardService.cubeStacks[randomIndex];
        //progressbar
        this.cubeStackLength = this.cubes.length;
        this.perCubePercent = (1 / this.cubeStackLength) * 100;
        this.progress = this.perCubePercent;
        this.cube = this.cubes[this.cubeIndex];
    };
    CubePage.prototype.toNextCube = function () {
        this.cubeIndex++;
        //cube
        if (this.cubeIndex <= this.cubeStackLength - 1) {
            this.cube = this.cubes[this.cubeIndex];
            this.progress += this.perCubePercent;
        }
        else {
            this.cubeIndex = this.cubeStackLength;
            this.progress = 100;
            this.cubeIndex = this.cubeStackLength - 1;
        }
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
    };
    CubePage.prototype.toFirstCube = function () {
        this.cube = this.cubes[0];
        this.cubeIndex = 0;
        this.progress = this.perCubePercent;
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
            pagination: {
                el: '.swiper-pagination',
            },
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
            selector: 'page-cube',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/cube/cube.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Cube</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-1>\n        <button (click)=\'toLastCube()\' style="background:transparent;" (click)=\'animCube()\'>\n          <ion-icon id="arrow-left" name="ios-arrow-back-outline">\n          </ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-10>\n\n        <ion-row>\n          <ion-col *ngFor=\'let item of cubes\'>\n            <div class="progress">\n              <div class="progress-bar" style="width:100%" *ngIf=\'cubeIndex>=item.id\'></div>\n              <!-- FIXME: 本来计划每次方块滑动都增加进度条 <div class="progress-bar" [style.width.%]="progress" ></div> -->\n            </div>\n          </ion-col>\n        </ion-row>\n\n\n      </ion-col>\n      <ion-col col-1>\n        <button (click)="toNextCube()" (click)="animCube()" style="background:transparent;">\n          <ion-icon id="arrow-right" name="ios-arrow-forward"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <div id="cubeStack-title">{{cubeStack.titleDe}}</div>\n\n\n  <div id="anim-cube" [@myTrigger]=\'animState\' class="swiper-container">\n    <div class="swiper-wrapper">\n      <div class="swiper-slide" style="background: darkslategrey; color: white; font-weight: bold;">\n        <ion-grid id="cube-begin-titles">\n          <ion-row id="cube-begin-titles-cn">{{cube.titleCn}}</ion-row>\n          <ion-row id="cube-begin-titles-de">{{cube.titleDe}}</ion-row>\n          <ion-row id="cube-begin-titles-date">{{cube.date}}</ion-row>\n        </ion-grid>\n\n      </div>\n      <div class="swiper-slide" style="background: lightgray;">{{cube.cubeTexts[0]}}</div>\n      <div class="swiper-slide" style="background: lightgray;">{{cube.cubeTexts[1]}}</div>\n      <div class="swiper-slide" style="background: lightgray;">{{cube.cubeTexts[2]}}</div>\n      <div class="swiper-slide" style="background: lightgray;">{{cube.cubeTexts[3]}}</div>\n      <div class="swiper-slide" style="background: lightgray;">{{cube.cubeTexts[4]}}</div>\n      <!-- <div *ngFor="let item of cube.cubeTexts" class="swiper-slide" style="background: lightgray;">{{item}}</div>   -->\n      <!-- <div class="swiper-slide" style="background: #0f1c33; color: white;" *ngFor="let item of cube.cubeTexts | slice:1">{{item}}</div>-->\n    </div>\n    <!--  Pagination -->\n    <div class="swiper-pagination"></div>\n  </div>\n\n\n  <!-- Fab btn -->\n  <ion-fab id="cube-fab" bottom right>\n    <button ion-fab color="light">\n      <ion-icon name="ios-menu"></ion-icon>\n    </button>\n    <ion-fab-list side=\'left\'>\n      <button class="btn-list" ion-fab color="light" (click)="getRandomNext()" (click)=\'animCube()\'>\n        <ion-icon name="fastforward"></ion-icon>\n      </button>\n      <button class="btn-list" ion-fab color="light" (click)="toFirstCube()" (click)=\'animCube()\'>\n        <ion-icon name="repeat"></ion-icon>\n      </button>\n      <button class="btn-list" ion-fab color="light">\n        <ion-icon name="clock"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/cube/cube.html"*/,
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
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], CubePage);
    return CubePage;
}());

//# sourceMappingURL=cube.js.map

/***/ }),

/***/ 116:
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
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeBag__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__ = __webpack_require__(291);
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
    function CardServiceProvider(http) {
        this.http = http;
        this.mockCardBages();
        this.getFailedCardBag();
        this.mockCubeStack();
    }
    CardServiceProvider.prototype.getFailedCardBag = function () {
        var failedcards = [];
        this.failedCardBag = new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](0, '不记得', 'Failed Bag', failedcards, 'iconX', 0);
    };
    CardServiceProvider.prototype.mockCardBages = function () {
        //todo: to getDate when new card generate
        var date = new Date();
        var cardsA = [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](0, this.getDateNow(), '第零包', 'hallo', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](1, this.getDateNow(), '谢谢', 'danke', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](2, this.getDateNow(), '再见', 'bye', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](3, this.getDateNow(), '对不起', 'entschuldigung', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].notSure),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, this.getDateNow(), '没关系', 'kein Problem', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
        var cardsB = [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, this.getDateNow(), '第一包', 'ok', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, this.getDateNow(), '不是', 'nein', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, this.getDateNow(), '早上好', 'morgen', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success),
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, this.getDateNow(), '晚安', 'nacht', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
        var cardsC = [
            new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](4, this.getDateNow(), '第二包', 'zeit', __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].success)
        ];
        this.cardStacks = [
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](0, '卡包零', 'StackEins', cardsA, "iconA", 0),
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](1, '卡包一', 'StackZwei', cardsB, 'iconB', 0),
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](2, '卡包二', 'StackDrei', cardsC, 'iconC', 0),
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](2, '卡包三', 'StackDrei', cardsC, 'iconC', 0),
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](2, '卡包三', 'StackDrei', cardsC, 'iconC', 0),
            new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](2, '卡包三', 'StackDrei', cardsC, 'iconC', 0)
        ];
    };
    CardServiceProvider.prototype.mockCubeStack = function () {
        var date = new Date();
        var cubesA = [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](0, this.getDateNow(), '问好', 'Greeting', ['hello', 'hallo', 'hey', 'hi', 'yo']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, this.getDateNow(), '告别', 'farewell', ['bye', 'byebye', 'see you', 'good bye', 'see you later']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, this.getDateNow(), '抱歉', 'apology', ['sorry', 'really sorry', 'Im sorry', 'my bad', 'my fault']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](3, this.getDateNow(), '感激', 'appreciate', ['thanks', 'thank you', 'thank you very much', 'thanks a lot', 'im appreciate']),
        ];
        var cubesB = [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](0, this.getDateNow(), '中二一', '德二一', ['方块二一', 'cubeOne', 'cubeEins', 'cubeYi', 'cube1']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, this.getDateNow(), '中二二', '德二二', ['方块二二', 'cubeTwo', 'cubeZwei', 'cubeEr', 'cube2']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, this.getDateNow(), '中二三', '德二三', ['方块二三', 'cubeThree', 'cubeDrei', 'cubeSan', 'cube3'])
        ];
        var cubesC = [
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](0, this.getDateNow(), '中三一', '德三一', ['方块三一', 'cubeOne', 'cubeEins', 'cubeYi', 'cube1']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](1, this.getDateNow(), '中三二', '德三二', ['方块三二', 'cubeTwo', 'cubeZwei', 'cubeEr', 'cube2']),
            new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](2, this.getDateNow(), '中三三', '德三三', ['方块三三', 'cubeThree', 'cubeDrei', 'cubeSan', 'cube3'])
        ];
        this.cubeStacks = [
            new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeBag__["a" /* CubeBag */](0, '问候与告别', 'Hello & Bye', cubesA, 'iconA'),
            new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeBag__["a" /* CubeBag */](1, '第二块包', 'CubeBagTwo', cubesB, 'iconB'),
            new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeBag__["a" /* CubeBag */](2, '第三块包', 'CubeBagThree', cubesC, 'iconA'),
        ];
    };
    //CubeBag: add, remove, edit
    CardServiceProvider.prototype.addCubeStack = function (titleCn, titleDe, icon) {
        var id = this.cubeStacks.length;
        var title_Cn = titleCn;
        var title_De = titleDe;
        var newCubes = [];
        this.cubeStacks.push(new __WEBPACK_IMPORTED_MODULE_5__app_Model_CubeBag__["a" /* CubeBag */](id, title_Cn, title_De, newCubes, icon));
    };
    CardServiceProvider.prototype.editCubeBag = function (cubeBag, newTitleCn, newTitleDe) {
        var editCubeBag = this.cubeStacks.find(function (x) { return x == cubeBag; });
        editCubeBag.titleCn = newTitleCn;
        editCubeBag.titleDe = newTitleDe;
    };
    CardServiceProvider.prototype.removeCubeBag = function (cubeStack) {
        var index = this.cubeStacks.indexOf(cubeStack);
        if (index > -1) {
            this.cubeStacks.splice(cubeStack, 1);
        }
    };
    // CardBag: add, remove, edit
    CardServiceProvider.prototype.addCardBag = function (titleCn, titleDe, icon, onProgress) {
        var id = this.cardStacks.length;
        var title_Cn = titleCn;
        var title_De = titleDe;
        var newCards = [];
        this.cardStacks.push(new __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStack__["a" /* CardStack */](id, title_Cn, title_De, newCards, icon, onProgress));
    };
    CardServiceProvider.prototype.removeCardBag = function (cardBag) {
        // this.cardStacks = this.cardStacks.filter(x => x != cardBag)
        var index = this.cardStacks.indexOf(cardBag);
        if (index > -1) {
            this.cardStacks.splice(index, 1);
        }
    };
    CardServiceProvider.prototype.editCardBag = function (cardBag, newTitleCn, newTitleDe) {
        var editCardBag = this.cardStacks.find(function (x) { return x == cardBag; });
        editCardBag.titleCn = newTitleCn;
        editCardBag.titleDe = newTitleDe;
    };
    // Cube: add, remove, edit 
    CardServiceProvider.prototype.addCube = function (cubeBag, title_Cn, title_De, cubeTexts) {
        var _id = cubeBag.cubes.length;
        var _date = this.getDateNow();
        cubeBag.cubes.push(new __WEBPACK_IMPORTED_MODULE_6__app_Model_Cube__["a" /* Cube */](_id, _date, title_Cn, title_De, cubeTexts));
    };
    CardServiceProvider.prototype.removeCube = function (cube, cubeBag) {
        var targetCubeBag = this.cubeStacks.find(function (x) { return x == cubeBag; });
        targetCubeBag.cubes = targetCubeBag.cubes.filter(function (x) { return x != cube; });
    };
    CardServiceProvider.prototype.editCube = function (cube, newCubeTexts) {
        cube.cubeTexts = newCubeTexts;
    };
    // Card: add, remove, edit
    CardServiceProvider.prototype.addCard = function (cardBag, textCn, textDe) {
        var _id = cardBag.cards.length;
        var _date = this.getDateNow();
        var _textCn = textCn;
        var _textDe = textDe;
        var _status = __WEBPACK_IMPORTED_MODULE_4__app_Model_CardStatus__["a" /* CardStatus */].failed;
        cardBag.cards.push(new __WEBPACK_IMPORTED_MODULE_3__app_Model_Card__["a" /* Card */](_id, _date, _textCn, _textDe, _status));
    };
    CardServiceProvider.prototype.removeCard = function (card, cardBag) {
        var targetCardBag = this.cardStacks.find(function (x) { return x == cardBag; });
        targetCardBag.cards = targetCardBag.cards.filter(function (x) { return x != card; });
    };
    CardServiceProvider.prototype.editCard = function (card, newTextCn, newTextDe) {
        card.textCn = newTextCn;
        card.textDe = newTextDe;
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
        var rawDd = date.getDate();
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
    CardServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* HttpModule */]])
    ], CardServiceProvider);
    return CardServiceProvider;
}());

//# sourceMappingURL=card-service.js.map

/***/ }),

/***/ 157:
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
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_library__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cube_cube__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__infinity_infinity__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__swipe_swipe__ = __webpack_require__(105);
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
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex="2">\n  <ion-tab [root]="tab4Root" tabTitle="Infinity" tabIcon="infinite"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Cube" tabIcon="cube"></ion-tab>\n  <ion-tab [root]="tab1Root" tabTitle="Swipe" tabIcon="albums"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Library" tabIcon="filing"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
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

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_stack_card_content_edit_card_content_edit__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_stack_card_content_add_card_content_add__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_popover_popover__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_swipe_swipe__ = __webpack_require__(105);
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
    }
    CardStackPage.prototype.toastSetting = function () {
        this.toast = this.toastCtrl.create({
            message: this.cardStack.titleCn + ' has been removed',
            duration: 3000,
            position: 'top',
            closeButtonText: 'X',
            showCloseButton: true,
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
            _this.cardService.removeCardBag(_this.cardStack);
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
    CardStackPage.prototype.editCardBag = function () {
        this.cardService.editCardBag(this.cardStack, this.cardStack.titleCn, this.cardStack.titleDe);
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
            selector: 'page-card-stack',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-stack.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Card Stack</ion-title>\n    <ion-buttons end>\n\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- card stack cover edit area -->\n  <ion-grid>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item no-lines>\n          <div class="wrapper">\n            <div class="card">\n              <img class="back-img" src="https://picsum.photos/302">\n              <div class="card-title">{{cardStack.titleCn}}</div>\n              <div class="card-subtitle">{{cardStack.titleDe}}</div>\n            </div>\n          </div>\n\n        </ion-item>\n      </ion-col>\n      <ion-col col-7>\n        <ion-list class="card-cover-edit">\n          <ion-item>\n            <ion-input placeholder="{{cardStack.titleCn}}" [(ngModel)]="cardStack.titleCn" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input placeholder="{{cardStack.titleDe}}" [(ngModel)]="cardStack.titleDe" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row id="row-btns">\n      <ion-col col-5>\n        <button id="card-study-btn" ion-button color="light" small round (click)="toSwipePage()">\n          <ion-icon class="card-cover-icon" name="ios-school-outline"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-7>\n        <button class="card-cover-edit-btn" ion-button small color="danger" round outline (click)="presentPopover($event)">\n          <ion-icon class="card-cover-icon" name="ios-trash-outline"></ion-icon>\n        </button>\n        <button class="card-cover-edit-btn" ion-button small color="primary" round outline (click)="editCardBag()">\n          <ion-icon class="card-cover-icon" name="ios-checkmark-circle-outline"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <hr>\n\n\n  <ion-list>\n    <ion-item-sliding *ngFor="let card of cardStack.cards" #slidingItem>\n\n      <ion-item (click)="openEditModal(card)">\n        <h2>{{card.textCn}}</h2>\n        <p>{{card.textDe}}</p>\n        <ion-note item-end>{{card.date}}</ion-note>\n      </ion-item>\n\n      <ion-item-options side="left">\n        <button ion-button color="light" (click)="openEditModal(card)" (click)="closeSlidingItem(slidingItem)">\n          <ion-icon name="build"></ion-icon>\n          &nbsp;&nbsp;edit&nbsp;&nbsp;\n        </button>\n        <button ion-button color="danger" (click)="removeCard(card)">\n          <ion-icon name="trash"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="light" id="addBtn" (click)="openAddModal()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-stack.html"*/,
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

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardContentEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
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
        this.cardBag = navParams.get('cardBagInfo');
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
        this.cardService.removeCard(this.card, this.cardBag);
    };
    CardContentEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-content-edit',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-edit/card-content-edit.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>\n      Edit Card\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-textshowWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Chinese</ion-label>\n      <ion-input placeholder="{{card.textCn}}" [(ngModel)]="card.textCn" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Deutsch</ion-label>\n      <ion-input placeholder="{{card.textDe}}" [(ngModel)]="card.textDe" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Latest Status</ion-label>\n      <ion-badge item-end>{{cardStatus}}</ion-badge>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="card-edit-btn" ion-button outline round color="danger" (click)="removeCard()" (click)="dismiss()">\n        <ion-icon name="ios-trash-outline"></ion-icon>\n      </button>\n      <button class="card-edit-btn" ion-button outline round (click)="editCard()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-edit/card-content-edit.html"*/,
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

/***/ 205:
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

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardContentAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
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
        this.cardBag = navParams.get('cardBagInfo');
    }
    CardContentAddPage.prototype.dismiss = function () {
        this.viewControl.dismiss();
    };
    CardContentAddPage.prototype.addCard = function () {
        this.cardService.addCard(this.cardBag, this.textCn, this.textDe);
    };
    CardContentAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-content-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-add/card-content-add.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>\n      <!-- New Card -->\n      Stack: {{cardBag.titleCn}}\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Chinese</ion-label>\n      <ion-input placeholder="chinese..." clearInput [(ngModel)]=\'textCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Deutsch</ion-label>\n      <ion-input placeholder="deutch..." clearInput [(ngModel)]=\'textDe\'></ion-input>\n    </ion-item>\n\n    <!-- todo: DatePicker default current time -->\n    <ion-item>\n      <ion-label color="primary" stacked>Add Time</ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DDDD" pickerFormat="YYYY MM DDDD">2018-09-21</ion-datetime>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="card-save-btn" ion-button outline round (click)="addCard()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack/card-content-add/card-content-add.html"*/,
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

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MistakePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_swipe_service_swipe_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__ = __webpack_require__(12);
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
            selector: 'page-mistake',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/mistake/mistake.html"*/'<ion-header>\n  <ion-toolbar start color="primary">\n    <ion-title>Mistake</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-2>\n        <div id="mistake-filing">\n          <ion-icon name="ios-archive">\n            <ion-badge id="mistake-badge" end color="danger" *ngIf="failedCardLength > 0">{{failedCardLength}}</ion-badge>\n          </ion-icon>\n        </div>\n      </ion-col>\n      <ion-col col-10>\n        <!-- ProgressBar-->\n        <div class="progress">\n          <div class="progress-bar" [style.width.%]="progressValue"></div>\n        </div>\n      </ion-col>\n     \n    </ion-row>\n  </ion-grid>\n\n\n\n\n  <!-- Card Stack -->\n  <label class="flipContainer" *ngIf="ready">\n    <sc-card class="sc-card" *ngFor="let attendant of attendants" [orientation]="cardDirection" [tinder-card]="cardOverlay"\n      [callLike]="attendant.likeEvent" [callDestroy]="attendant.destroyEvent" (onLike)="onCardInteract($event)">\n      <input type="checkbox" />\n      <div class="theCard">\n        <div id="card-front">{{attendant.fronts}}</div>\n        <div id="card-back">{{attendant.backs}}</div>\n      </div>\n    </sc-card>\n  </label>\n\n\n  <!-- FabBtn -->\n  <ion-fab text-center bottom right>\n    <button id="mistake-repeat-btn" ion-fab color="light" (click)="repeatRound()">\n      <ion-icon name="repeat"></ion-icon>\n    </button>\n  </ion-fab>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/swipe/mistake/mistake.html"*/,
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

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStackAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
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
    function CardStackAddPage(navCtrl, navParams, viewCtrl, cardService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cardService = cardService;
    }
    CardStackAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CardStackAddPage.prototype.addCardBag = function () {
        this.cardService.addCardBag(this.titleCn, this.titleDe, "icon", 0);
    };
    CardStackAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card-stack-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack-add/card-stack-add.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>\n      Add Card Pack\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Title Chinese</ion-label>\n      <ion-input placeholder="Title in Chinese..." clearInput [(ngModel)]=\'titleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Title Deutsch</ion-label>\n      <ion-input placeholder="Title in Chinese..." clearInput [(ngModel)]=\'titleDe\'></ion-input>\n    </ion-item>\n\n    <!-- TODO: icon selection -->\n    <!-- <ion-item>\n      <ion-label color="primary" stacked>icon</ion-label>\n    </ion-item> -->\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button ion-button outline round style="margin-bottom: 20px;" (click)="addCardBag()" (click)="dismiss()">\n        Save\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/card-stack-add/card-stack-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__["a" /* CardServiceProvider */]])
    ], CardStackAddPage);
    return CardStackAddPage;
}());

//# sourceMappingURL=card-stack-add.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeStackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cube_content_edit_cube_content_edit__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cube_content_add_cube_content_add__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_popover_popover__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_cube_cube__ = __webpack_require__(106);
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
            _this.cardService.removeCubeBag(_this.cubeStack);
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
            selector: 'page-cube-stack',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-stack.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>{{ cubeStack.titleDe }}</ion-title>\n    <ion-buttons end>\n      <!-- TODO: "openAddModal()" -->\n      \n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item no-lines>\n          <div class="wrapper">\n            <div>\n              <img class="cube-icon" src="../../../assets/imgs/cubes.png">\n              <div class="cube-title" style="text-align:center;">{{cubeStack.titleCn}}</div>\n              <div class="cube-subtitle" style="text-align:center;">{{cubeStack.titleDe}}</div>\n            </div>\n          </div>\n        </ion-item>\n      </ion-col>\n      <ion-col col-7>\n        <ion-list class="cube-cover-textfild">\n          <ion-item>\n            <ion-input placeholder="{{cubeStack.titleCn}}" [(ngModel)]="cubeStack.titleCn" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-input placeholder="{{cubeStack.titleDe}}" [(ngModel)]="cubeStack.titleDe" clearInput></ion-input>\n          </ion-item>\n          <ion-item>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n\n    <ion-row id="row-btns">\n      <ion-col col-5>\n        <button id="cube-study-btn" ion-button color="light" small round (click)="toStudyCubePage()">\n          <ion-icon class="cube-cover-btn-icon" name="ios-school-outline"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-7>\n        <button class="cube-cover-edit-btn" ion-button small color="danger" round outline (click)="presentPopover($event)">\n          <ion-icon class="cube-cover-btn-icon" name="ios-trash-outline"></ion-icon>\n        </button>\n        <button class="cube-cover-edit-btn" ion-button small color="primary" round outline (click)="editCubeStack()">\n          <ion-icon class="cube-cover-btn-icon" name="ios-checkmark-circle-outline"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n\n  </ion-grid>\n\n  <hr>\n\n\n\n  <ion-list no-lines>\n    <ion-item-sliding *ngFor="let cube of cubeStack.cubes" #slidingItem>\n\n      <ion-item (click)="openEditModal(cube)">\n        <h2>{{cube.cubeTexts[0]}}</h2>\n        <p>{{cube.cubeTexts[1]}}</p>\n        <ion-note item-end>{{cube.date}}</ion-note>\n      </ion-item>\n\n\n\n      <ion-item-options side="left">\n        <!-- TODO: openEditModal(cube)-->\n        <button ion-button color="light" (click)="openEditModal(cube)" (click)="closeSlidingItem(slidingItem)">\n          <ion-icon name="build"></ion-icon>\n          &nbsp;&nbsp;edit&nbsp;&nbsp;\n        </button>\n        <button ion-button color="danger" (click)="removeCube(cube)">\n          <ion-icon name="trash"></ion-icon>\n          delete\n        </button>\n      </ion-item-options>\n\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="light" id="addBtn" (click)="openAddModal()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-stack.html"*/,
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

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeContentEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
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
        // this.sideLength = this.cube.cubeTexts.length
        this.cubeTexts = this.cube.cubeTexts;
    }
    CubeContentEditPage.prototype.editCube = function () {
        this.cardService.editCube(this.cube, this.cubeTexts);
    };
    CubeContentEditPage.prototype.removeCube = function () {
        this.cardService.removeCube(this.cube, this.cubeStack);
    };
    CubeContentEditPage.prototype.dismiss = function () {
        this.viewControl.dismiss();
    };
    CubeContentEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube-content-edit',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-edit/cube-content-edit.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>\n      EDIT CUBE\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- <ion-item>\n    <ion-range min="2" max="10" step="1" pin="true" snaps="true" [(ngModel)]="sideLength" (ionChange)="onRangeChange(slideValue)">\n      <ion-icon range-left small ios="logo-buffer" md="logo-buffer"></ion-icon>\n      <ion-icon range-right ios="logo-buffer" md="logo-buffer"></ion-icon>\n    </ion-range>\n  </ion-item>\n\n  <ion-list>\n\n    <ion-item *ngFor="let side of sides; let index = index; trackBy:trackByIndex;">\n      <ion-label color="primary" stacked>description</ion-label>\n      <ion-input placeholder="chinese..." [(ngModel)]=\'sides[index]\' clearInput></ion-input>\n    </ion-item>\n\n  </ion-list> -->\n\n  <ion-list>\n\n      <ion-item>\n        <ion-label floating>title CN</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cube.titleCn\'></ion-input>\n      </ion-item>\n  \n      <ion-item>\n        <ion-label floating>title DE</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cube.titleDe\'></ion-input>\n      </ion-item>\n  \n       <ion-item>\n        <ion-label floating>{{cube.date}}</ion-label>\n        <ion-datetime displayFormat="YYYY-MM-DD" [(ngModel)]="cube.date"></ion-datetime>\n      </ion-item> \n  \n    </ion-list>\n  \n    <ion-list>\n  \n      <ion-item>\n        <ion-label floating>opt 1</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cubeTexts[0]\'></ion-input>\n      </ion-item>\n  \n      <ion-item>\n        <ion-label floating>opt 2</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cubeTexts[1]\'></ion-input>\n      </ion-item>\n  \n      <ion-item>\n        <ion-label floating>opt 3</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cubeTexts[2]\'></ion-input>\n      </ion-item>\n  \n      <ion-item>\n        <ion-label floating>opt 4</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cubeTexts[3]\'></ion-input>\n      </ion-item>\n  \n      <ion-item>\n        <ion-label floating>opt 5</ion-label>\n        <ion-input type="text" [(ngModel)]=\'cubeTexts[4]\'></ion-input>\n      </ion-item>\n  \n    </ion-list>\n  \n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="cube-edit-btn" ion-button outline round color="danger" (click)="removeCube()" (click)="dismiss()">\n        <ion-icon name="ios-trash-outline"></ion-icon>\n      </button>\n      <button class="cube-edit-btn" ion-button outline round (click)="editCube()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-edit/cube-content-edit.html"*/,
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

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeContentAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
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
        this.cubeTexts = [];
        this.cubeBag = navParams.get("cubeBagInfo");
        //this.sides = new Array(this.sideLength)
    }
    CubeContentAddPage.prototype.addCube = function () {
        this.cardService.addCube(this.cubeBag, this.cubeTitleCn, this.cubeTitleDe, this.cubeTexts);
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
            selector: 'page-cube-content-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-add/cube-content-add.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>\n      <!-- New Card -->\n      Stack: {{cubeBag.titleCn}}\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- <ion-item>\n    <ion-range min="2" \n               max="10" \n               step="1" \n               pin="true" \n               snaps="true" \n               [(ngModel)]="sideLength"\n               (ionChange)="onRangeChange()">\n      <ion-icon range-left small ios="logo-buffer" md="logo-buffer"></ion-icon>\n      <ion-icon range-right ios="logo-buffer" md="logo-buffer"></ion-icon>\n    </ion-range>\n  </ion-item>\n\n  <ion-list>\n\n    <ion-item *ngFor="let side of sides; let index = index; trackBy:trackByIndex;" >\n      <ion-label color="primary" stacked>description</ion-label>\n      <ion-input placeholder="chinese..." [(ngModel)]=\'sides[index]\'  clearInput></ion-input>\n    </ion-item>\n\n  </ion-list> -->\n\n\n\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>title CN</ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTitleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>title DE</ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTitleDe\'></ion-input>\n    </ion-item>\n\n     <ion-item>\n      <ion-label floating></ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DD" [(ngModel)]="date"></ion-datetime>\n    </ion-item> \n\n  </ion-list>\n\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>opt 1</ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTexts[0]\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>opt 2</ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTexts[1]\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>opt 3</ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTexts[2]\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>opt 4</ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTexts[3]\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>opt 5 </ion-label>\n      <ion-input type="text" [(ngModel)]=\'cubeTexts[4]\'></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button class="cube-save-btn" ion-button outline round (click)="addCube()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack/cube-content-add/cube-content-add.html"*/,
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

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeStackAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_card_service_card_service__ = __webpack_require__(12);
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
    CubeStackAddPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CubeStackAddPage.prototype.addCubeStack = function () {
        this.cardService.addCubeStack(this.titleCn, this.titleDe, "icon");
    };
    CubeStackAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cube-stack-add',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack-add/cube-stack-add.html"*/'<ion-header>\n  <ion-toolbar color="primary">\n    <ion-title>\n      Add Cube Pack\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Title Chinese</ion-label>\n      <ion-input placeholder="Title in Chinese..." clearInput [(ngModel)]=\'titleCn\'></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary" stacked>Title Deutsch</ion-label>\n      <ion-input placeholder="Title in Chinese..." clearInput [(ngModel)]=\'titleDe\'></ion-input>\n    </ion-item>\n\n    <!-- Todo: icon selection -->\n    <ion-item>\n      <ion-label color="primary" stacked>icon</ion-label>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border>\n  <ion-row>\n\n    <ion-col style="text-align:center;">\n      <button id="cube-add-confirm" ion-button outline round style="margin-bottom: 20px;" (click)="addCubeStack()" (click)="dismiss()">\n        <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n      </button>\n    </ion-col>\n\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/cube-stack-add/cube-stack-add.html"*/,
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

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfinityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(9);
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
                return previous + current;
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
                return previous + current;
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
        }
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
            selector: 'page-infinity',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/infinity/infinity.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Infinity</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding #content scrollX="true" scrollY="true" style="width: 100%; height: 100%;">\n\n  <div #infinity class="wrapper" style="zoom:150%">\n    <div *ngFor="let card of cards">\n      <label class="flipContainer">\n        <input type="checkbox" />\n\n        <div class="theCard">\n          <div id="questionSide">{{card}}</div>\n          <div class="back">Answer</div>\n        </div>\n      </label>\n    </div>\n  </div>\n\n  <ion-fab center bottom >\n      <button id="active-btn" \n              ion-fab\n              round\n              large\n              (mousedown)=\'mouseDown()\' \n              (mouseup)=\'mouseUp()\' \n              (touchstart)=\'mouseDown()\'\n              (touchend)=\'mouseUp()\'>\n             \n              <ion-icon name="ios-move-outline" \n              \n              style="zoom:1.5;"></ion-icon>\n      </button>\n  </ion-fab>\n  \n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/infinity/infinity.html"*/,
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

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(237);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_library_library__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_cube_cube__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_infinity_infinity__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_library_card_stack_card_stack__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_library_card_stack_card_content_edit_card_content_edit__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_library_card_stack_add_card_stack_add__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_library_card_stack_card_content_add_card_content_add__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_swipe_swipe__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_swipe_cards__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_animations__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_swipe_service_swipe_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_library_cube_stack_cube_stack__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_library_cube_stack_add_cube_stack_add__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_library_cube_stack_cube_content_add_cube_content_add__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_library_cube_stack_cube_content_edit_cube_content_edit__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_popover_popover__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_cube_list_icon_cube_list_icon__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_swipe_mistake_mistake__ = __webpack_require__(207);
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
                __WEBPACK_IMPORTED_MODULE_17__pages_swipe_swipe__["a" /* SwipePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_swipe_mistake_mistake__["a" /* MistakePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_library_library__["a" /* LibraryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_library_card_stack_add_card_stack_add__["a" /* CardStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_library_card_stack_card_stack__["a" /* CardStackPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_library_card_stack_card_content_edit_card_content_edit__["a" /* CardContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_library_card_stack_card_content_add_card_content_add__["a" /* CardContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_cube_cube__["a" /* CubePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_infinity_infinity__["a" /* InfinityPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_library_cube_stack_cube_stack__["a" /* CubeStackPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_library_cube_stack_add_cube_stack_add__["a" /* CubeStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_library_cube_stack_cube_content_add_cube_content_add__["a" /* CubeContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_library_cube_stack_cube_content_edit_cube_content_edit__["a" /* CubeContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_25__components_popover_popover__["a" /* PopoverComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_cube_list_icon_cube_list_icon__["a" /* CubeListIconComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_19__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_18_ng2_swipe_cards__["a" /* SwipeCardsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_17__pages_swipe_swipe__["a" /* SwipePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_swipe_mistake_mistake__["a" /* MistakePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_library_library__["a" /* LibraryPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_library_card_stack_add_card_stack_add__["a" /* CardStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_cube_cube__["a" /* CubePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_library_card_stack_card_stack__["a" /* CardStackPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_library_card_stack_card_content_edit_card_content_edit__["a" /* CardContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_library_card_stack_card_content_add_card_content_add__["a" /* CardContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_infinity_infinity__["a" /* InfinityPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_library_cube_stack_cube_stack__["a" /* CubeStackPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_library_cube_stack_add_cube_stack_add__["a" /* CubeStackAddPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_library_cube_stack_cube_content_add_cube_content_add__["a" /* CubeContentAddPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_library_cube_stack_cube_content_edit_cube_content_edit__["a" /* CubeContentEditPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_25__components_popover_popover__["a" /* PopoverComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_card_service_card_service__["a" /* CardServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_swipe_service_swipe_service__["a" /* SwipeServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(201);
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
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardStack; });
var CardStack = /** @class */ (function () {
    function CardStack(id, titleCn, titleDe, cards, icon, progress) {
        this.cards = [];
        this.id = id;
        this.titleCn = titleCn;
        this.titleDe = titleDe;
        this.cards = cards;
        this.icon = icon;
        this.progress = progress;
    }
    return CardStack;
}());

//# sourceMappingURL=CardStack.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var Card = /** @class */ (function () {
    function Card(id, date, textCn, textDe, status) {
        this.id = id;
        this.date = date;
        this.textCn = textCn;
        this.textDe = textDe;
        this.status = status;
    }
    return Card;
}());

//# sourceMappingURL=Card.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeBag; });
var CubeBag = /** @class */ (function () {
    function CubeBag(id, titleCn, titleDe, cubes, icon) {
        this.id = id;
        this.titleCn = titleCn;
        this.titleDe = titleDe;
        this.cubes = cubes;
        this.icon = icon;
    }
    return CubeBag;
}());

//# sourceMappingURL=CubeBag.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cube; });
var Cube = /** @class */ (function () {
    function Cube(id, date, titleCn, titleDe, cubeTexts) {
        this.id = id;
        this.date = date;
        this.titleCn = titleCn;
        this.titleDe = titleDe;
        this.cubeTexts = cubeTexts;
    }
    return Cube;
}());

//# sourceMappingURL=Cube.js.map

/***/ }),

/***/ 295:
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

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card_stack_card_stack__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__card_stack_add_card_stack_add__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cube_stack_cube_stack__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_cube_stack_add_cube_stack_add__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LibraryPage = /** @class */ (function () {
    function LibraryPage(nav, navParams, cardService, modalCtrl) {
        this.nav = nav;
        this.navParams = navParams;
        this.cardService = cardService;
        this.modalCtrl = modalCtrl;
        this.cardStacks = this.cardService.cardStacks;
        this.libraryMode = "swipe";
    }
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
    LibraryPage.prototype.cardBagDelete = function (item) {
        this.cardService.removeCardBag(item);
    };
    LibraryPage.prototype.cubeBagDelete = function (item) {
        this.cardService.removeCubeBag(item);
    };
    LibraryPage.prototype.getCubeStackColor = function () {
        return this.cardService.getRandomBgColor();
    };
    LibraryPage.prototype.closeSlidingItem = function (slidingItem) {
        slidingItem.close();
    };
    LibraryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-library',template:/*ion-inline-start:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/library.html"*/'<ion-header [ngSwitch]="libraryMode">\n  <ion-navbar color="primary">\n    <ion-title>Library</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="primary" no-border-top style="padding-bottom:0%;">\n    <ion-segment color="light" [(ngModel)]="libraryMode" no-border>\n      <ion-segment-button value="swipe" style="margin-top:10px;">\n        swipe\n      </ion-segment-button>\n      <ion-segment-button value="cube" style="margin-top:10px;">\n        cube\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n  <!-- <ion-searchbar></ion-searchbar> -->\n  <div [ngSwitch]="libraryMode">\n\n    <!-- swipe library mode -->\n    <div *ngSwitchCase="\'swipe\'">\n\n      <ion-searchbar class="cubes-searchbar"></ion-searchbar>\n\n      <ion-grid>\n        <ion-row>\n          <ion-col *ngFor="let item of cardStacks">\n\n            <div class="wrapper">\n              <div class="card" (click)="openCardsPage(item)">\n                <img class="back-img" src="https://picsum.photos/318">\n                <div class="card-title">{{item.titleCn}}</div>\n                <div class="card-subtitle">{{item.titleDe}}</div>\n              </div>\n            </div>\n\n            <div class="progress" style="width:100px; margin-top:5px; margin-left: 8px;">\n              <div class="progress-bar bg-warning" style="border-radius:120px;" [style.width.%]=\'item.progress\'></div>\n            </div>\n\n          </ion-col>\n        </ion-row>\n\n        <ion-fab bottom right>\n          <button ion-fab class="addBtn" color=\'light\' (click)="onCardStackAddPage()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n        </ion-fab>\n      </ion-grid>\n    </div>\n\n    <!-- cube library mode -->\n    <div *ngSwitchCase="\'cube\'">\n      <ion-searchbar class="cubes-searchbar"></ion-searchbar>\n\n      <ion-grid no-padding>\n        <ion-row>\n          <ion-col *ngFor="let item of cardService.cubeStacks">\n\n            <div class="cubes-card-wrapper" (click)="openCubeListPage(item)">\n              <div class="cubes-card-inner-wrapper">\n                <img class="cubes-card-img" src="../../assets/imgs/cubes.png">\n\n                <div class="progress">\n                  <div class="progress-bar bg-warning" style="width:40%; border-radius:120px;"></div>\n                </div>\n\n                <div class="cubes-card-title">{{item.titleCn}}</div>\n                <div class="cubes-card-subtitle">{{item.titleDe}}</div>\n              </div>\n\n            </div>\n\n          </ion-col>\n        </ion-row>\n        <ion-fab bottom right>\n          <button ion-fab class="addBtn" color=\'light\' (click)="onCubeStackAddPage()">\n            <ion-icon name="add"></ion-icon>\n          </button>\n        </ion-fab>\n      </ion-grid>\n\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/jooyoo/Desktop/ionic-infinityCard/src/pages/library/library.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_card_service_card_service__["a" /* CardServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], LibraryPage);
    return LibraryPage;
}());

//# sourceMappingURL=library.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwipeServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_Model_CardStatus__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__card_service_card_service__ = __webpack_require__(12);
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
    SwipeServiceProvider.prototype.getRandomCardBag = function (itemLength) {
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

},[214]);
//# sourceMappingURL=main.js.map