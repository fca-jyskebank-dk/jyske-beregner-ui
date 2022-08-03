import { KeyValue } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { JyskeFrihedBeregnerResultat } from '@jyske-frihed-beregner/+state/jyske-frihed-beregner.interfaces';
import { SegmentItem } from '@kirbydesign/designsystem';
import { Observable } from 'rxjs';

@Component({
  selector: 'jyske-frihed-beregner-detaljer',
  templateUrl: './jyske-frihed-beregner-detaljer.component.html',
  styleUrls: ['./jyske-frihed-beregner-detaljer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JyskeFrihedBeregnerDetaljerComponent {
  hovedtal: KeyValue<string, string | number>[];

  selectedIndex = 0;
  selectedSegment: SegmentItem;

  segmentItems: SegmentItem[] = [
    { text: 'Lånedetaljer', id: 'laandetaljer' },
    { text: 'Tilbagebetalingsskema', id: 'tilbagebetalingsskema' },
    // { text: 'Graf', id: 'graf' },
  ];

  @Input()
  resultat$: Observable<JyskeFrihedBeregnerResultat>;

  onSegmentSelect(segment: SegmentItem) {
    this.selectedSegment = segment;
    this.selectedIndex = this.segmentItems.indexOf(this.selectedSegment);
  }
}
