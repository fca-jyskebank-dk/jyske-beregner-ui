import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JyskeFrihedBeregnerNoegletal } from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.interfaces';
import { JyskeFrihedBeregnerTextService } from '@jyske-frihed-beregner/services/jyske-frihed-beregner-text.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jyske-frihed-beregner-noegletal',
  templateUrl: './jyske-frihed-beregner-noegletal.component.html',
  styleUrls: ['./jyske-frihed-beregner-noegletal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JyskeFrihedBeregnerNoegletalComponent {
  @Input()
  area: number;

  @Input()
  loaded$: Observable<boolean>;

  @Input()
  noegletal$: Observable<JyskeFrihedBeregnerNoegletal>;

  constructor(public textService: JyskeFrihedBeregnerTextService) {}
}
