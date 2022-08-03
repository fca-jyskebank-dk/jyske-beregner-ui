import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonSize } from '@kirbydesign/designsystem';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Beregningsresultat } from '../finansieringsforslag.interfaces';

@Component({
  selector: 'finansieringsforslag',
  templateUrl: './finansieringsforslag.component.html',
  styleUrls: ['./finansieringsforslag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinansieringsforslagComponent implements AfterViewInit {
  hasMargin = true;
  buttonSize = ButtonSize.SM;

  @Input()
  beregningsresultat: Beregningsresultat;

  @Input()
  visDetaljer$: Observable<boolean>;

  @Output()
  onKontaktMig: EventEmitter<Beregningsresultat> = new EventEmitter<
    Beregningsresultat
  >();

  @ViewChild('myCard') myCard: ElementRef;

  ngAfterViewInit(): void {
    this.visDetaljer$
      .pipe(skip(1))
      .subscribe((val: boolean) => this.runAnimation(val));
  }

  private runAnimation(showDetails: boolean): void {
    const turnCardAnimationFramesFunction = showDetails
      ? this.turnCardAnimationFramesDetails
      : this.turnCardAnimationFramesRating;

    this.myCard.nativeElement.animate(turnCardAnimationFramesFunction, {
      duration: 500,
      easing: 'ease-out',
      iterations: 1,
      fill: 'forwards',
    });
  }

  private turnCardAnimationFramesRating = [
    { transform: 'rotateY(0)' },
    { transform: 'rotateY(180deg)' },
  ];

  private turnCardAnimationFramesDetails = [
    { transform: 'rotateY(180deg)' },
    { transform: 'rotateY(360deg)' },
  ];
}
