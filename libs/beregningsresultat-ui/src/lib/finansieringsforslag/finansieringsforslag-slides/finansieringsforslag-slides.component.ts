import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Beregningsresultat } from '../finansieringsforslag.interfaces';

@Component({
  selector: 'finansieringsforslag-slides',
  templateUrl: './finansieringsforslag-slides.component.html',
  styleUrls: ['./finansieringsforslag-slides.component.scss'],
})
export class FinansieringsforslagSlidesComponent {
  slidesOptions = {
    spaceBetween: -16,
    centeredSlides: false,
    slidesPerView: 1.05,
    breakpoints: {
      671: {
        slidesPerView: 2.05,
      },
      991: {
        slidesPerView: 3.05,
      },
      1311: {
        slidesPerView: 4.05,
      },
      1631: {
        slidesPerView: 5.05,
      },
      1951: {
        slidesPerView: 6.05,
      },
    },
  };

  @Input()
  finansieringsforslag: Beregningsresultat[] = [];

  @Input()
  visDetaljer$: Observable<boolean> = new Observable<boolean>();

  @Output()
  onKontaktMig: EventEmitter<Beregningsresultat> = new EventEmitter<
    Beregningsresultat
  >();
}
