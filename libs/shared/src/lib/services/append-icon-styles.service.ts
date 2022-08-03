import { Inject, Injectable, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Icon, IconRegistryService } from '@kirbydesign/designsystem';

@Injectable({
  providedIn: 'root',
})
export class AppendIconStylesService {

  private _assetsUrl: string;

  private _arrowDown: string;
  private _arrowUp: string;
  private _checkmarkSelected: string;
  private _close: string;
  private _home: string;

  private _closeDanger: string;
  private _starFilled: string;
  private _starHalfFilled: string;
  private _verifySuccess: string;

  constructor(
    private iconRegistryService: IconRegistryService,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  public append(assetsUrl: string, renderer2: Renderer2) {

    if (assetsUrl !== undefined && assetsUrl !== '')
      this._assetsUrl = assetsUrl;
    else this._assetsUrl = '';

    this._setupUrls();
    this._registrer();
    if (this._assetsUrl === '') return;
    let style = renderer2.createElement('style');
    style.type = 'text/css';
    style.innerHTML = this._getStyle();
    renderer2.appendChild(this._document.body, style);
  }

  _setupUrls() {
    const KIRBY_ICONS_PATH = '/assets/kirby/icons/svg/';
    const CUSTOM_ICONS_PATH = '/assets/icons/';

    this._arrowDown = this._assetsUrl + KIRBY_ICONS_PATH + 'arrow-down.svg';
    this._arrowUp = this._assetsUrl + KIRBY_ICONS_PATH + 'arrow-up.svg';
    this._checkmarkSelected = this._assetsUrl + KIRBY_ICONS_PATH + 'checkmark-selected.svg';
    this._close = this._assetsUrl + KIRBY_ICONS_PATH + 'close.svg';
    this._home = this._assetsUrl + KIRBY_ICONS_PATH + 'home.svg';

    this._closeDanger = this._assetsUrl + CUSTOM_ICONS_PATH + 'close-danger.svg';
    this._starFilled = this._assetsUrl + CUSTOM_ICONS_PATH + 'star-filled.svg';
    this._starHalfFilled = this._assetsUrl + CUSTOM_ICONS_PATH +'star-half-filled.svg';
    this._verifySuccess = this._assetsUrl + CUSTOM_ICONS_PATH +'verify-success.svg';
  }

  _registrer(): void {
    this.iconRegistryService.addIcons(this._customIcons());
    this.iconRegistryService.addIcons(this._kirbyIcons());
  }

  _customIcons(): Icon[] {
    // Her registreres alene custom icons
    return [
      {
        name: 'close-danger',
        svg: this._closeDanger,
      },
      {
        name: 'star-filled',
        svg: this._starFilled,
      },
      {
        name: 'star-half-filled',
        svg: this._starHalfFilled,
      },
      {
        name: 'verify-success',
        svg: this._verifySuccess,
      },
    ];
  }

  _kirbyIcons(): Icon[] {
    // Her registreres alene kirby
    return [
      {
        name: 'arrow-down',
        svg: this._arrowDown,
      },
      {
        name: 'arrow-up',
        svg: this._arrowUp,
      },
      {
        name: 'checkmark-selected',
        svg: this._checkmarkSelected,
      },
      {
        name: 'close',
        svg: this._close,
      },
      {
        name: 'home',
        svg: this._home,
      },
    ];
  }

  _getStyle(): string {
    const style = `
      kirby-dropdown button kirby-icon ion-icon {
        background: url(${this._arrowDown});
      }
      kirby-dropdown.is-open button kirby-icon ion-icon {
        background: url(${this._arrowUp});
      }
      kirby-item.selected ion-item kirby-icon ion-icon{
        background: url(${this._checkmarkSelected});
      }
      ion-buttons button kirby-icon ion-icon {
        background: url(${this._close});
      }
      kirby-alert article kirby-empty-state.success article div kirby-icon ion-icon {
        background: url(${this._verifySuccess});
        background-size: 100%;
      }
      kirby-alert article kirby-empty-state.danger article div kirby-icon ion-icon {
        background: url(${this._closeDanger});
        background-size: 100%;
      }
    `;
    return style;
  }
}
