import { star } from './star-rating.interfaces';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IconSize } from '@kirbydesign/designsystem';

@Component({
  selector: 'jyske-beregner-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent implements OnInit {
  maxValue = 100;
  stars: star[] = [];

  /**
   * Antal stjerner som skal vises
   * * Default: 5
   */
  @Input()
  starsMax = 5;

  /**
   * Antal stjerner som er pre-udfyldt
   * * Default: 5
   */
  @Input()
  starsPrefilled = 0;

  /**
   * Ikon størrelse
   * * Default: SM
   */
  @Input()
  starSize: IconSize = IconSize.SM;

  /**
   * Værdi mellem 0 og 100
   */
  @Input()
  value = 0;

  ngOnInit(): void {
    this.stars = this._setRatingStars(this.value);
  }

  _setRatingStars(value: number): star[] {
    const stars =
      ((this.starsMax - this.starsPrefilled) / this.maxValue) * value;
    const starsFull = Math.floor(stars) + this.starsPrefilled;
    const starHalf = Math.round(stars % 1);
    const starArray: star[] = [];

    for (let i = 0; i < this.starsMax; i++) {
      if (i < starsFull)
        starArray.push({
          iconName: 'star-filled',
          iconColor: 'warning',
        });
      else if (i === starsFull && starHalf === 1)
        starArray.push({
          iconName: 'star-half-filled',
          iconColor: 'warning',
        });
      else
        starArray.push({
          iconName: 'star-filled',
          iconColor: 'light',
        });
    }

    return starArray;
  }
}
