import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemSize } from '@kirbydesign/designsystem';
import { Laandetalje } from '../finansieringsforslag.interfaces';

@Component({
  selector: 'finansieringsforslag-rating',
  templateUrl: './finansieringsforslag-rating.component.html',
  styleUrls: ['./finansieringsforslag-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinansieringsforslagRatingComponent {
  size = ItemSize.SM;

  @Input()
  data: Laandetalje[] = [];
}
