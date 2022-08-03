import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonSize, ColorHelper } from '@kirbydesign/designsystem';
import { ChartData } from '@shared/components/doughnot-chart/doughnut-chart.interfaces';

@Component({
  selector: 'laan-generel-teaser',
  templateUrl: './laan-generel-teaser.component.html',
  styleUrls: ['./laan-generel-teaser.component.scss'],
})
export class LaanGenerelTeaserComponent implements OnInit {
  @Output()
  onBeregnLaanIFrivaerdi: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  onBeregnLaanTilKoebAfbolig: EventEmitter<boolean> = new EventEmitter<boolean>();

  chartData: ChartData;
  buttonSize = ButtonSize.LG;

  ngOnInit(): void {
    this._setupChart(80, 20);
  }

  _setupChart(restgaeld: number, frivaerdi: number) {
    this.chartData = {
      renderLegends: false,
      labels: [],
      colors: [
        ColorHelper.getThemeColorHexString('success'),
        ColorHelper.getThemeColorHexString('background-color'),
      ],
      data: [restgaeld, frivaerdi],
    };
  }
}
