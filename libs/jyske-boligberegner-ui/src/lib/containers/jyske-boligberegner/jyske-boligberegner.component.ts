import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Beregningsgrundlag } from '@jyske-boligberegner-ui/+state/jyske-boligberegner.interfaces';
import {
  loadJyskeBoligberegner,
  setJyskeBoligberegnerDisableToggles,
  setJyskeBoligberegnerVisAfdragsfrihed,
  setJyskeBoligberegnerVisDetaljer,
  sendGenerelBoligberegnerKontaktformular,
} from '@jyske-boligberegner-ui/+state/jyske-boligberegner.actions';
import { JyskeBoligberegnerFacade } from '@jyske-boligberegner-ui/+state/jyske-boligberegner.facade';
import { Observable } from 'rxjs';
import { delay, filter, first, skip } from 'rxjs/operators';
import { FormData } from '../../presentational/jyske-boligberegner-input/jyske-boligberegner-input.interfaces';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { ViewportScroller } from '@angular/common';
import { SendBeregningService } from 'libs/kunde-kommunikation-ui/src/lib/containers/send-beregning/send-beregning.service';
import { AppendIconStylesService } from '@shared/services/append-icon-styles.service';

@Component({
  selector: 'jyske-boligberegner-ui-jyske-boligberegner',
  templateUrl: './jyske-boligberegner.component.html',
  styleUrls: ['./jyske-boligberegner.component.scss'],
})
export class JyskeBoligberegnerComponent implements OnInit {
  beregningsgrundlag: Beregningsgrundlag;
  mock = false;
  getScreenWidth: number;
  finansieringsforslag$: Observable<Beregningsresultat[]> =
    this.jyskeBoligberegnerFacade.JyskeBoligberegner$;

  @Input()
  assetsUrl: string;

  constructor(
    public appendIconStylesService: AppendIconStylesService,
    public jyskeBoligberegnerFacade: JyskeBoligberegnerFacade,
    public sendBeregningService: SendBeregningService,
    private scroller: ViewportScroller,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.appendIconStylesService.append(this.assetsUrl, this._renderer2);

    this.mock =
      new URLSearchParams(window.location.search).get('mock') === 'true';

    this.getScreenWidth = window.innerWidth;
    this.jyskeBoligberegnerFacade.JyskeBoligberegnerIsLoading$.pipe(
      skip(1),
      filter((s) => s === false),
      delay(100)
    ).subscribe((s) => {
      if (this.getScreenWidth < 666) {
        this.scroller.scrollToAnchor('produkter');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }

  onBeregn(formData: FormData): void {
    this.jyskeBoligberegnerFacade.JyskeBoligberegnerVisAfdragsfrihed$.pipe(
      first()
    ).subscribe((visAfdragsfrihed) => {
      const beregningsgrundlag: Beregningsgrundlag = {
        egenfinansiering: formData.egenbetaling,
        ejendomsvaerdi: formData.boligVaerdi,
        antalAfdragsfrieAar: visAfdragsfrihed ? 10 : 0,
        boligType: formData.boligtype,
      };
      this._getFinansieringsforslag(this.mock, beregningsgrundlag);
    });
  }

  disableToggle(event: boolean) {
    this.jyskeBoligberegnerFacade.dispatch(
      setJyskeBoligberegnerDisableToggles({ disable: event })
    );
  }

  onVisDetaljer(event: boolean) {
    this.jyskeBoligberegnerFacade.dispatch(
      setJyskeBoligberegnerVisDetaljer({ visDetaljer: event })
    );
  }

  onVisAfdragsfrihed(event: boolean): void {
    this.jyskeBoligberegnerFacade.dispatch(
      setJyskeBoligberegnerVisAfdragsfrihed({ visAfdragsfrihed: event })
    );

    const beregningsgrundlag: Beregningsgrundlag = {
      egenfinansiering: this.beregningsgrundlag.egenfinansiering,
      ejendomsvaerdi: this.beregningsgrundlag.ejendomsvaerdi,
      antalAfdragsfrieAar: event ? 10 : 0,
      boligType: this.beregningsgrundlag.boligType,
    };

    this._getFinansieringsforslag(this.mock, beregningsgrundlag);
  }

  _getFinansieringsforslag(mockData: boolean, input: Beregningsgrundlag): void {
    this.beregningsgrundlag = input;
    this.jyskeBoligberegnerFacade.dispatch(
      setJyskeBoligberegnerDisableToggles({ disable: true })
    );

    this.jyskeBoligberegnerFacade.JyskeBoligberegnerIsLoading$.pipe(
      filter((s) => s === false),
      first()
    ).subscribe((s) =>
      this.jyskeBoligberegnerFacade.dispatch(
        setJyskeBoligberegnerVisDetaljer({ visDetaljer: true })
      )
    );

    this.jyskeBoligberegnerFacade.dispatch(
      loadJyskeBoligberegner({ mockData, input })
    );
  }

  onKontaktMig(event: Beregningsresultat): void {
    this.sendBeregningService.onSendBeregning(event, 'BDK004');
  }

  onKontaktMigGenerel(): void {
    this.jyskeBoligberegnerFacade.KontaktMigParametreGenerel$.pipe(
      first()
    ).subscribe((parametre) =>
      this.jyskeBoligberegnerFacade.dispatch(
        sendGenerelBoligberegnerKontaktformular({
          kontaktMigParametre: parametre,
        })
      )
    );
  }
}
