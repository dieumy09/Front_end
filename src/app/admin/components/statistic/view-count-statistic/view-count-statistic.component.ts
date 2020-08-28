import {Component, OnInit} from '@angular/core';
import {ViewCountStatisticService} from '../../../../services/view-count-statistic.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-view-count-statistic',
  templateUrl: './view-count-statistic.component.html',
  styleUrls: ['./view-count-statistic.component.scss'],
})

export class ViewCountStatisticComponent implements OnInit {
  dateStatistic: string[];
  viewCount: number[];
  currentDay = new Date();
  startDay: Date;
  endDay: Date;
  totalViewCount = 0;
  dateStatisticForm = this.formBuilder.group({
    startDay: [],
    endDay: [],
  });

  barChartOptions: ChartOptions = {
    responsive: true,
    showLines: false,

    scales: {
      xAxes: [{
        ticks: {fontColor: 'rgba(54, 54, 54)', fontSize: 15, beginAtZero: true},
        gridLines: {color: 'rgba(0, 0, 0, 0.1)', zeroLineColor: 'rgba(0, 0, 0, 0.7)'}
      }],
      yAxes: [{
        ticks: {fontColor: 'rgba(54, 54, 54)', fontSize: 15},
        gridLines: {display: false},
      }]
    },
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {label: 'Số lượt truy cập', maxBarThickness: 110},
  ];
  barChartColor: Color[] = [{
    backgroundColor: 'rgba(162,0,0, 0.2)', borderColor: 'rgba(162,0,0,1)', borderWidth: 1.5,
    hoverBackgroundColor: 'rgba(91,225,0, 0.3)', hoverBorderColor: 'rgba(33,0,81,1)'
  }];

  constructor(
    private viewCountStatisticService: ViewCountStatisticService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  getViewCountStatistics() {
    this.dateStatisticForm.patchValue({
      startDay: new Date(new Date(this.startDay).toDateString()),
      endDay: new Date(new Date(this.endDay).toDateString() + ' 23:59:59')
    });
    if (this.dateValid()) {
      this.viewCountStatisticService
        .getListViewCountStatistic(this.dateStatisticForm.value)
        .subscribe(data => {
          let totalViewCount = 0;
          data.forEach( d => totalViewCount += d[1]);
          this.totalViewCount = totalViewCount;
          this.dateStatistic = data.map(d => d[0]);
          this.viewCount = data.map(d => d[1]);
          this.barChartLabels = this.dateStatistic;
          this.barChartData[0].data = this.viewCount;
        });
      document.getElementById('statistic').hidden = false;
      document.getElementById('chart').hidden = false;
    } else {
      document.getElementById('statistic').hidden = true;
      document.getElementById('chart').hidden = true;
    }
  }

  dateValid(): boolean {
    const currentDay = new Date(new Date().toDateString() + ' 23:59:59');
    const isStartDayRequired = this.startDay === undefined;
    const isEndDayRequired = this.endDay === undefined;
    const isStartDayOver = this.dateStatisticForm.value.startDay > currentDay;
    const isEndDayOver = this.dateStatisticForm.value.endDay > currentDay;
    const isStartDayOverEndDay = this.dateStatisticForm.value.startDay > this.dateStatisticForm.value.endDay;
    document.getElementById('startDayRequired').hidden = !isStartDayRequired;
    document.getElementById('endDayRequired').hidden = !isEndDayRequired;
    document.getElementById('startDayOver').hidden = !isStartDayOver;
    document.getElementById('endDayOver').hidden = !isEndDayOver;
    document.getElementById('startDayOverEndDay').hidden = !isStartDayOverEndDay;
    return !(isStartDayRequired || isEndDayRequired || isStartDayOver || isEndDayOver || isStartDayOverEndDay);
  }
}
