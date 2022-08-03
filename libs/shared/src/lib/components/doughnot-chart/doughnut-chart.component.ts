import { ArcElement, Chart, DoughnutController } from 'chart.js';
import { ChartData } from './doughnut-chart.interfaces';
import { ItemSize } from '@kirbydesign/designsystem';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'jyske-beregner-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnoutChartComponent
  implements OnInit, AfterViewInit, OnChanges {
  chart: Chart;
  itemSize: ItemSize = ItemSize.XS;
  legends: { label: string; color: string; value: number }[] = [];

  @ViewChild('chartCanvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  @Input()
  chartData: ChartData;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.chartData.firstChange) {
      this.chart.data.datasets[0].data = changes.chartData.currentValue.data;
      this._renderLegends();
      this.chart.update();
    }
  }

  ngOnInit(): void {
    Chart.register(DoughnutController, ArcElement);
  }

  ngAfterViewInit(): void {
    this._renderLegends();
    this._renderChart();
  }

  _renderLegends(): void {
    if(this.chartData.renderLegends != null && !this.chartData.renderLegends) return;
    this.legends = [];

    const legendsData = [
      ...this.chartData.labels,
      ...this.chartData.colors,
      ...this.chartData.data,
    ];

    for (let index = 0; index < legendsData.length / 3; index++) {
      const label = legendsData[index] as string;
      const color = legendsData[index + legendsData.length / 3] as string;
      const value: number = Math.round(
        legendsData[
          index + legendsData.length / 3 + legendsData.length / 3
        ] as number
      );

      this.legends.push({ label, color, value });
    }
  }
  _renderChart(): void {
    this.chart = new Chart(this.canvasElement.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            backgroundColor: this.chartData.colors,
            hoverBackgroundColor: this.chartData.colors,
            borderWidth: 0,
            data: this.chartData.data,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '85%',
        animation: {
          animateRotate: true,
        },
      },
    });
  }
}
