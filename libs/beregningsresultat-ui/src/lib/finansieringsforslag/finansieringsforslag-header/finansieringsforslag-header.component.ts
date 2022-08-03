import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonSize } from '@kirbydesign/designsystem';
import { Beregningsresultat } from '../finansieringsforslag.interfaces';

@Component({
  selector: 'finansieringsforslag-header',
  templateUrl: './finansieringsforslag-header.component.html',
  styleUrls: ['./finansieringsforslag-header.component.scss'],
})
export class FinansieringsforslagHeaderComponent {
  hasMargin = true;
  buttonSize = ButtonSize.SM;

  @Input()
  beregningsresultat: Beregningsresultat;

  @Input()
  visDetaljer: boolean;

  @Output()
  onKontaktMig: EventEmitter<void> = new EventEmitter<void>();
}
