import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { JyskeFrihedBeregnerResultat } from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.interfaces';

@Component({
  selector: 'jyske-frihed-beregner-tilbagebetalingplan',
  templateUrl: './jyske-frihed-beregner-tilbagebetalingplan.component.html',
  styleUrls: ['./jyske-frihed-beregner-tilbagebetalingplan.component.scss'],
})
export class JyskeFrihedBeregnerTilbagebetalingplanComponent {
  @Input()
  data$: Observable<JyskeFrihedBeregnerResultat>;
}
