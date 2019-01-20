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

  // Chart: StudyToday
  planAmount: any
  actualAmount: any = 0
  circleDisplay: any

  // Chart: StudyTrend
  dateHub: any = []
  actualAmounts: any = []

  // Chart: StackProgress
  stackProgressHub: any


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dbService: DbServiceProvider,
    private cardService: CardServiceProvider) {
  }

  ionViewDidEnter() {

    // Chart[1]: StudyToday
    this.getTodayStudy()

    // Chart: StudyTrend
    this.getLineChartDates()
    this.getLineChartActualAmounts()

    // Chart: StackProgress
    // let studys = this.cardService.studys
    //console.log('Chart:ionViewDidEnter:studys: ', studys)


    // charts layout
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [] = this.dateHub,
        datasets: [{
          label: "Study Amount",
          backgroundColor: 'rgb(171, 221, 147,0.3)',
          borderColor: 'rgb(48, 110, 18,0.3)',
          data: [] = this.actualAmounts,
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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: 'Stack Status',
          data: [12, 19, 3, 5, 9, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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

  onSelected() { // change planAmount 
    this.circleDisplay = this.actualAmount / this.planAmount * 100
    // update DB
    this.todayStudy.planAmount = this.planAmount
    this.dbService.update(this.todayStudy, TABLES.StudyDaily)
  }

  //Chart[2]
  getLineChartDates() {
    for (let i = 9; i > -1; i--) {
      this.dateHub.push(this.cardService.getDateAnySimple(-i))
    }
  }
  getLineChartActualAmounts() {
    console.log('Chart:getLineChartActualAmounts:studyDailys: ',this.cardService.studyDailys)
    for (let i = 9; i > -1; i--) {
      let studyDaily = this.cardService.studyDailys.find(x => x.date == this.cardService.getDateAny(-i))
      if (studyDaily) {
        this.actualAmounts.push(studyDaily.actualAmount)
      } else {
        this.actualAmounts.push(0)
      }
    }
    console.log('Chart:getLineChartActualAmounts:actualAmounts: ',this.actualAmounts)
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
