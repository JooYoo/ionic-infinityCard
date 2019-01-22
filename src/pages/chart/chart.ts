import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DbServiceProvider, TABLES } from '../../providers/db-service/db-service';
import { CardServiceProvider } from '../../providers/card-service/card-service';


@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  barChart: any;
  @ViewChild('barCanvas') barCanvas;
  lineChart: any
  @ViewChild('lineCanvas') lineCanvas;

  todayStudy: any

  // Chart[1]: StudyToday
  planAmount: any
  actualAmount: any = 0
  circleDisplay: any

  // Chart[2]: StudyTrend
  dateHub: any = []
  actualAmounts: any = []

  // Chart[3]: StackProgress
  stackTitles: any = []
  stackProgress: any = []


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dbService: DbServiceProvider,
    private cardService: CardServiceProvider) {
  }

  ionViewDidEnter() {

    // Chart[1]: StudyToday
    this.getTodayStudy()
    // Chart[2]: StudyTrend
    this.getLineChartDates()
    this.getLineChartActualAmounts()



    console.log("lineChart:actualAmounts: ", this.actualAmounts)
    // charts layout
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [] = this.dateHub,
        datasets: [{
          label: "Study Amount",
          data: [] = this.actualAmounts,
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
              beginAtZero: false
            }
          }]
        }
      }
    });
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: [] = this.stackTitles,
        datasets: [{
          label: 'progress',
          data: [] = this.stackProgress,
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
          }]
        }
      }

    });



  }

  ionViewDidLoad() {
    // Chart[2]: StudyTrend

    // Chart[3]: StackProgress
    //this.getBarChartData()



  }
  onSelected() { // change planAmount 
    this.circleDisplay = this.actualAmount / this.planAmount * 100
    // update DB
    this.todayStudy.planAmount = this.planAmount
    this.dbService.update(this.todayStudy, TABLES.StudyDaily)
  }

  //Chart[3]
  // getBarChartData() {
  //   let studyLength = this.cardService.studys.length
  //   for (let i = 1; i < 6; i++) {
  //     let study = this.cardService.studys[studyLength - i]

  //     if (study && study.stackId != 0) { // exist // stack0 是初始化stack没有存储
  //       if (study.stackType == 0) { //card
  //         this.stackTitles.push(this.cardService.cardStacks.find(x => x.id == study.stackId).titleDe)
  //         this.stackProgress.push(this.cardService.cardStacks.find(x => x.id == study.stackId).progress)
  //       } else { // cube
  //         this.stackTitles.push(this.cardService.cubeStacks.find(x => x.id == study.stackId).titleDe)
  //         this.stackProgress.push(this.cardService.cubeStacks.find(x => x.id == study.stackId).progress)
  //       }

  //     } else { // !exist
  //       this.stackTitles.push('empty')
  //       this.stackProgress.push(0)
  //     }

  //   }
  //   // console.log('ChartBar:getBarChartData:stackTitles: ',this.stackTitles)
  //   // console.log('ChartBar:getBarChartData:stackProgress: ',this.stackProgress)
  // }

  //Chart[2]
  getLineChartDates() {
    if (this.dateHub.length === 0) {
      for (let i = 9; i > -1; i--) {
        this.dateHub.push(this.cardService.getDateAnySimple(-i))
      }
    }
  }
  getLineChartActualAmounts() {
    if (this.actualAmounts.length < 10) { // 第一次加载把所有数据都从studyDaily推到actualAmounts里
      for (let i = 9; i > -1; i--) {
        let studyDaily = this.cardService.studyDailys.find(x => x.date == this.cardService.getDateAny(-i))

        if (studyDaily) {
          this.actualAmounts.push(studyDaily.actualAmount)
        } else {
          this.actualAmounts.push(0)
        }

      }
    } else { // 再次加载只更新最后一个数值
      let lastDailyStudyIndex = this.cardService.studyDailys.length-1
      let lastActualAmountsIndex = this.actualAmounts.length-1
       this.actualAmounts[lastActualAmountsIndex] = this.cardService.studyDailys[lastDailyStudyIndex].actualAmount 
      //console.log('Chart:getLineChartActualAmounts:studyDailys: ', this.cardService.studyDailys)
    }
    // console.log('Chart:getLineChartActualAmounts:actualAmounts: ', this.actualAmounts)
  }

  //Chart[1]
  getTodayStudy() {
    this.todayStudy = this.cardService.studyDailys.find(x => x.date == this.cardService.getDateNow())
    // console.log('Chart:getTodayStudy:todayStudy: ', this.todayStudy)

    if (!this.todayStudy) { // today no Study yet
      let yesterdayStudy = this.cardService.studyDailys[this.cardService.studyDailys.length - 1] // get the last item, inherit PlanAmount
      // console.log("Chart:getTodayStudy:yesterdayStudy: ", yesterdayStudy)
      this.planAmount = yesterdayStudy.planAmount
      this.actualAmount = 0
      this.circleDisplay = this.actualAmount / this.planAmount * 100
      return
    }

    this.planAmount = this.todayStudy.planAmount
    this.actualAmount = this.todayStudy.actualAmount
    this.circleDisplay = this.actualAmount / this.planAmount * 100

    //console.log('Chart:getTodayData:planAmount: ', this.planAmount)
    //console.log('Chart:getTodayData:actualAmount: ', this.actualAmount)
    //console.log('Chart:getTodayData:circleDisplay: ', this.circleDisplay)
  }

}
