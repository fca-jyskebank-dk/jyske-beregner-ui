import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement,
} from 'chart.js';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BarChartData } from './jyske-frihed-bar-chart.interfaces';

@Component({
  selector: 'jyske-frihed-bar-chart',
  templateUrl: './jyske-frihed-bar-chart.component.html',
  styleUrls: ['./jyske-frihed-bar-chart.component.scss'],
})
export class JyskeFrihedBarChartComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input()
  barChartData: BarChartData;
  @Output()
  afdragstidChanged: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('chartCanvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  readonly INITIAL_ANTAL_AAR_MED_AFDRAGFRIHED = 10;
  readonly AFDRAGSFRI_YDELSE_BASISVAERDI = 0.03; // et basistal vi har sjusset os frem til for at grafen ser "fornuftig" ud
                                                 // bemærk at grafen er et gennemsnit over et antal - meget - forskellige beregninger

  ctx;
  myChart: Chart<'bar', number[], number>;
  afdragstid: number;
  maxYdelseVedEtAarsAfdrag: number;
  position = this.INITIAL_ANTAL_AAR_MED_AFDRAGFRIHED;
  ydelseArray: number[] = [];
  afdragsfriYdelseArray: number[] = [];
  afdragsfriYdelseMedAfdragArray: number[] = [];
  afdragsfriAr: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  ngOnInit(): void {
    Chart.register(BarController, LinearScale, CategoryScale, BarElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.barChartData.rangeDisabled) return;
    if (changes.barChartData.firstChange) return;

    if (
      changes.barChartData.currentValue.laaneoenske ===
        changes.barChartData.previousValue.laaneoenske &&
      changes.barChartData.currentValue.ejendomsvaerdi ==
        changes.barChartData.previousValue.ejendomsvaerdi &&
      this.myChart
    ) {
      this._justerDatasets();
    } else {
      this._opretGraf();
    }
  }

  ngAfterViewInit(): void {
    this.afdragstid = this.INITIAL_ANTAL_AAR_MED_AFDRAGFRIHED;
    this._setBubbleValue(this.afdragstid);
  }

  _opretGraf() {
    if (this.myChart !== undefined) this.myChart.destroy();
    this._setupDatasetsInitially();
    this.ctx = document.getElementById('chartCanvas');
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.afdragsfriAr,
        datasets: [
          {
            data: this.afdragsfriYdelseArray,
            backgroundColor: 'rgba(44, 242, 135, 0.75)',
          },
          {
            data: this.afdragsfriYdelseMedAfdragArray,
            backgroundColor: 'rgba(255, 202, 58, 0.75)',
          },
          {
            data: this.ydelseArray,
            backgroundColor: 'rgba(222, 203, 67, 1)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {},
        },
        scales: {
          x: {
            stacked: true,
            display: false,
          },
          y: {
            stacked: true,
            display: false,
            min: 0,
            max: this.maxYdelseVedEtAarsAfdrag,
          },
        },
        aspectRatio: 3,
        maintainAspectRatio: true,
        animation: {
          duration: 100,
        },
      },
    });
  }

  onChangeAfdragsperiode(event) {
    if (this.barChartData.rangeDisabled) return;
    this.afdragstid = event.target.value;
    this._justerDatasets();
    this.afdragstidChanged.emit(this.afdragstid);
  }

  visVaerdi(event) {
    if (this.barChartData.rangeDisabled) return;
    this.afdragstid = event.target.value;
    this.position = event.target.value;
    this._setBubbleValue(event.target.value);
    this._justerDatasets();
  }

  _justerDatasets() {
    const { standardYdelse, afdragsfriYdelse } = this._initierDatasets();

    for (var aar = 1; aar < 31; aar++) {
      this.ydelseArray[aar - 1] =
        aar > this.afdragstid ? 0 : standardYdelse - afdragsfriYdelse;

      this.afdragsfriYdelseArray[aar - 1] =
        aar > this.afdragstid ? afdragsfriYdelse : 0;
      this.afdragsfriYdelseMedAfdragArray[aar - 1] =
        aar > this.afdragstid ? 0 : afdragsfriYdelse;
    }
    this.myChart.update();
  }

  private _initierDatasets() {
    const belaaningspct = this.barChartData.belaaningspct;
    const afdragsfriYdelse = this._beregnAfdragsfriYdelse();
    const standardYdelse = this._beregnYdelse(
      afdragsfriYdelse,
      belaaningspct,
      this.afdragstid
    );
    this._beregnHoejesteYdelse(belaaningspct);
    return { standardYdelse, afdragsfriYdelse };
  }

  _setupDatasetsInitially() {
    const { standardYdelse, afdragsfriYdelse } = this._initierDatasets();

    this.ydelseArray = [];
    this.afdragsfriYdelseArray = [];
    this.afdragsfriYdelseMedAfdragArray = [];

    for (var aar = 1; aar < 31; aar++) {
      this.ydelseArray.push(
        aar > this.afdragstid ? 0 : standardYdelse - afdragsfriYdelse
      );

      this.afdragsfriYdelseArray.push(
        aar > this.afdragstid ? afdragsfriYdelse : 0
      );
      this.afdragsfriYdelseMedAfdragArray.push(
        aar > this.afdragstid ? 0 : afdragsfriYdelse
      );
    }
  }

  _beregnYdelse(
    renteBidragPrAar: number,
    belaaningspct: number,
    afdragstid: number
  ): number {
    const pctDerAfdrages = belaaningspct - 60;

    const samletAfdragsbeloeb =
      (this.barChartData.ejendomsvaerdi *
        (pctDerAfdrages < 1 ? 1 : pctDerAfdrages)) /
      100;

    const afdragPrAar = samletAfdragsbeloeb / afdragstid;

    return afdragPrAar + renteBidragPrAar;
  }

  _beregnAfdragsfriYdelse(): number {
    const renteBidragPrAar =
      this.AFDRAGSFRI_YDELSE_BASISVAERDI * this.barChartData.ejendomsvaerdi;
    return renteBidragPrAar;
  }

  _beregnHoejesteYdelse(belaaningspct: number) {
    const afdragsfriYdelse = this._beregnAfdragsfriYdelse();
    const standardYdelse = this._beregnYdelse(
      afdragsfriYdelse,
      belaaningspct,
      1
    );
    this.maxYdelseVedEtAarsAfdrag = standardYdelse;
  }

  _setBubbleValue(value: number) {
    const bubble = document.getElementById('bubble');
    const newVal = Number(((value - 1) * 96) / 27);
    bubble.style.left = `calc(${newVal}% + (${15 - newVal * 0.25}px))`;
  }
}
