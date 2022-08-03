import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jyske-frihed-produkter',
  templateUrl: './jyske-frihed-produkter.component.html',
  styleUrls: ['./jyske-frihed-produkter.component.scss']
})
export class JyskeFrihedProdukterComponent {
  @Input()
  disabled$: Observable<boolean>;

  @Input()
  visDetaljerChecked$: Observable<boolean>;

  @Output()
  onVisDetaljerChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
