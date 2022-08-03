import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jyske-boligberegner-ui-jyske-boligberegner-produkter',
  templateUrl: './jyske-boligberegner-produkter.component.html',
  styleUrls: ['./jyske-boligberegner-produkter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JyskeBoligberegnerProdukterComponent {
  @Input()
  disabled$: Observable<boolean>;

  @Input()
  visDetaljerChecked$: Observable<boolean>;

  @Input()
  visAfdragsfrihedChecked$: Observable<boolean>;

  @Output()
  onVisDetaljerChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onVisAfdragsfrihedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
