import {Component, OnInit} from '@angular/core';
import {ViewCountStatisticService} from '../../../../services/view-count-statistic.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DatePipe} from '@angular/common';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-view-count-statistic',
  templateUrl: './view-count-statistic.component.html',
  styleUrls: ['./view-count-statistic.component.scss'],
  providers: [DatePipe]
})

export class ViewCountStatisticComponent implements OnInit {
  dateStatistic: string[];
  viewCount: number[];
  startDay: string;
  endDay: string;
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
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  getViewCountStatistics() {
    this.dateStatisticForm.patchValue({
      startDay: this.datePipe.transform(this.startDay, 'MM/dd/yyyy'),
      endDay: this.datePipe.transform(this.endDay, 'MM/dd/yyyy')
    });
    if (this.dateValid()) {
      this.viewCountStatisticService
        .getListViewCountStatistic(this.dateStatisticForm.value)
        .subscribe(data => {
          let totalViewCount = 0;
          data.forEach( d => totalViewCount += d.viewCount);
          this.totalViewCount = totalViewCount;
          this.dateStatistic = data.map(d => this.datePipe.transform(d.dateStatistic, 'dd/MM/yyyy'));
          this.viewCount = data.map(d => d.viewCount);
          this.barChartLabels = this.dateStatistic;
          this.barChartData[0].data = this.viewCount;
        });
      document.getElementById('statistic').hidden = false;
      document.getElementById('chart').hidden = false;
    }
  }

  dateValid(): boolean {
    const currentDay = this.datePipe.transform(new Date().toLocaleDateString(), 'MM/dd/yyyy');
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
