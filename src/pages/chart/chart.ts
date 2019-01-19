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

  studys: any
  currentStudy: any

  planAmount: any
  actualAmount: any
  circleDisplay: any

  barChart: any;
  @ViewChild('barCanvas') barCanvas;

  lineChart: any
  @ViewChild('lineCanvas') lineCanvas;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dbService: DbServiceProvider,
    private cardService: CardServiceProvider) {
  }

  ionViewDidEnter() {

    // load DB 
    this.getStudys()

    // charts
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        datasets: [{
          label: "test",
          backgroundColor: 'rgb(171, 221, 147,0.3)',
          borderColor: 'rgb(48, 110, 18,0.3)',
          data: [12, 19, 3, 5, 2, 3, 30, 10, 4, 18],
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

  onSelected(){ // change planAmount 
    this.circleDisplay = this.actualAmount / this.planAmount * 100
    console.log('Chart:onSelected:circleDisplay: ', this.circleDisplay)
    // update DB
    this.currentStudy.planAmount = this.planAmount
    this.dbService.update(this.currentStudy, TABLES.Study)
  }

  getStudys() {
    this.dbService.list(TABLES.Study).then(data => {
      this.cardService.studys = data
      if (!this.cardService.studys) {
        this.cardService.studys = this.cardService.defaultStudys()
        console.log('Chart:DefaultStudys: ', this.cardService.studys)
      }
      console.log('Chart:DBStudys: ', this.cardService.studys)
    }).then(() => {
      // prepare Data
      this.getTodayStudy()
    })
  }

  getTodayStudy() {
    var today = this.cardService.getDateNow()
    var todayStudy = this.cardService.studys.find(x => x.date == today)
    console.log('Chart:getTodayData:todayStudy: ', todayStudy)

    if (todayStudy) {
      this.planAmount = todayStudy.planAmount
      this.actualAmount = todayStudy.actualAmount
      this.currentStudy = todayStudy
    } else {
      this.planAmount = 10
      this.actualAmount = 0
    }
    this.circleDisplay = this.actualAmount / this.planAmount * 100

    console.log('Chart:getTodayData:planAmount: ', this.planAmount)
    console.log('Chart:getTodayData:actualAmount: ', this.actualAmount)
    console.log('Chart:getTodayData:circleDisplay: ', this.circleDisplay)

  }

}
