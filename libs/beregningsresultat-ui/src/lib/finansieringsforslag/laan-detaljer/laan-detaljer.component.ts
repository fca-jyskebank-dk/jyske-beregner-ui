import { Component, Input } from '@angular/core';
import { ItemSize } from '@kirbydesign/designsystem';
import { Laan } from '../finansieringsforslag.interfaces';

@Component({
  selector: 'beregningsresultat-ui-laan-detaljer',
  templateUrl: './laan-detaljer.component.html',
  styleUrls: ['./laan-detaljer.component.scss'],
})
export class LaanDetaljerComponent {
  itemSize = ItemSize.XS;
  hasMargin = true;

  @Input() laanListe: Laan[] = [];
  @Input() erDelAfPakke: boolean = false;
}
