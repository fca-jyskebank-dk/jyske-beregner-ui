import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JyskeFrihedBeregnerTextService } from '@jyske-frihed-beregner/services/jyske-frihed-beregner-text.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jyske-frihed-beregner-cta',
  templateUrl: './jyske-frihed-beregner-cta.component.html',
  styleUrls: ['./jyske-frihed-beregner-cta.component.scss'],
})
export class JyskeFrihedBeregnerCtaComponent {
  @Input()
  maanedligYdelseEfterSkat$: Observable<string>;

  @Output()
  cta: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public textService: JyskeFrihedBeregnerTextService) {}
}
