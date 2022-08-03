import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from 'highcharts';
import { JyskeFrihedBeregnerResultat } from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.interfaces';

@Component({
  selector: 'jyske-frihed-beregner-graf',
  templateUrl: './jyske-frihed-beregner-graf.component.html',
  styleUrls: ['./jyske-frihed-beregner-graf.component.scss'],
})
export class JyskeFrihedBeregnerGrafComponent {
  @Input()
  data$: Observable<JyskeFrihedBeregnerResultat>;

  options: Options = {};
}
