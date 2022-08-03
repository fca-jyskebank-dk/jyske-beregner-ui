import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'laan-generel-produkter',
  templateUrl: './laan-generel-produkter.component.html',
  styleUrls: ['./laan-generel-produkter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LaanGenerelProdukterComponent{
  @Input()
  disabled$: Observable<boolean>;

  @Input()
  visAfdragsfrihedChecked$: Observable<boolean>;

  @Output()
  onVisAfdragsfrihedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

}
