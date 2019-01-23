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
  resultObjs: any = []

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
    // Chart[3]: StackProgress
    this.getBarChartData()

    // console.log("lineChart:actualAmounts: ", this.actualAmounts)
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
              beginAtZero: true
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
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


  }
  ionViewDidLeave() {
    // Chart[2]: StudyTrend
    this.stackTitles = []
    this.stackProgress = []
    this.resultObjs = []
    console.log('didLeave!!!', this.resultObjs)
  }
  onSelected() { // change planAmount 
    this.circleDisplay = this.actualAmount / this.planAmount * 100
    // update DB
    this.todayStudy.planAmount = this.planAmount
    this.dbService.update(this.todayStudy, TABLES.StudyDaily)
  }
  //Chart[3]
  getBarChartData() {
    let studysLength = this.cardService.studys.length
    let studys = this.cardService.studys
    let theIndex = 1;
    while (this.resultObjs.length < 5) {
      var study = studys[studysLength - theIndex];
      if (study) { // 如果项少于5就会出现undefine
        if (this.resultObjs.length != 0) { // 防止没有项报错
          var findItem = this.resultObjs.find(x => x.id == study.id);
        }
        if (findItem) {// exist
          theIndex++;
          continue;
        } else { // not exist
          if (study.stackTitle == "Fruit") {
            theIndex++
            continue
          }
          this.resultObjs.push(study);
          theIndex++;
        }
      } else {
        break
      }
      //console.log("resultObjs: ", resultObjs);
    }

    for (var i = 0; i < this.resultObjs.length; i++) {
      this.stackTitles.push(this.resultObjs[i].stackTitle);
      this.stackProgress.push(this.resultObjs[i].stackProgress);
    }

    console.log('ChartBar:getBarChartData:stackTitles: ', this.stackTitles)
    console.log('ChartBar:getBarChartData:stackProgress: ', this.stackProgress)
  }
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
      let lastDailyStudyIndex = this.cardService.studyDailys.length - 1
      let lastActualAmountsIndex = this.actualAmounts.length - 1
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
