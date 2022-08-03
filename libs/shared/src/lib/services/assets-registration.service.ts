import { Injectable } from '@angular/core';
import { Icon, IconRegistryService } from '@kirbydesign/designsystem';

@Injectable({
  providedIn: 'root',
})
export class AssetsRegistrationService {
  CUSTOM_ICONS_PATH: '/assets/icons/';
  KIRBY_ICONS_PATH: '/assets/kirby/icons/svg/';

  ARROW_DOWN: 'arrow-down';
  ARROW_UP: 'arrow-up';
  CHECKMARK_SELECTED: 'checkmark-selected';
  CLOSE: 'close';
  HOME: 'home';
  VERIFY: 'verify';

  CLOSE_DANGER: 'close-danger';
  STAR_FILLED: 'star-filled';
  STAR_HALF_FILLED: 'star-half-filled';
  VERIFY_SUCCESS: 'verify-success';

  private _assetsUrl: string;

  constructor(private iconRegistryService: IconRegistryService) {}

  public set setBaseUrl(value: string) {
    this._assetsUrl = value !== undefined ? value : '';
    this._registrer();
  }

  _registrer(): void {
    this.iconRegistryService.addIcons(this._customIcons());
    this.iconRegistryService.addIcons(this._kirbyIcons());
  }

  _customIcons(): Icon[] {
    // Her registreres alene custom icons
    const path = this._assetsUrl + this.CUSTOM_ICONS_PATH;
    return [
      {
        name: this.CLOSE_DANGER,
        svg: path + this.CLOSE_DANGER + '.svg',
      },
      {
        name: this.STAR_FILLED,
        svg: path + this.STAR_FILLED + '.svg',
      },
      {
        name: this.STAR_HALF_FILLED,
        svg: path + this.STAR_HALF_FILLED + '.svg',
      },
      {
        name: this.VERIFY_SUCCESS,
        svg: this._assetsUrl + this.VERIFY_SUCCESS + '.svg',
      },
    ];
  }

  _kirbyIcons(): Icon[] {
    // Her registreres alene kirby
    const path = this._assetsUrl + this.KIRBY_ICONS_PATH;
    return [
      {
        name: this.ARROW_DOWN,
        svg: path + this.ARROW_DOWN + '.svg',
      },
      {
        name: this.ARROW_UP,
        svg: path + this.ARROW_UP + '.svg',
      },
      {
        name: this.CHECKMARK_SELECTED,
        svg: path + this.CHECKMARK_SELECTED + '.svg',
      },
      {
        name: this.CLOSE,
        svg: path + this.CLOSE + '.svg',
      },
      {
        name: this.HOME,
        svg: path + this.HOME + '.svg',
      },
      {
        name: this.VERIFY,
        svg: path + this.VERIFY + '.svg',
      },
    ];
  }
}
