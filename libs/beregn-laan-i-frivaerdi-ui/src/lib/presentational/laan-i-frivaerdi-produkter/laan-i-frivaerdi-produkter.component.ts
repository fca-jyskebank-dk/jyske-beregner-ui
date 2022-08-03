import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'laan-i-frivaerdi-produkter',
  templateUrl: './laan-i-frivaerdi-produkter.component.html',
  styleUrls: ['./laan-i-frivaerdi-produkter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaanIFrivaerdiProdukterComponent {
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
