import {
  Component,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  loadJyskeFrihed,
  loadMaxProvenu,
  sendGenerelJyskeFrihedKontaktformular,
  setJyskeFrihedDisableToggles,
  setJyskeFrihedVisDetaljer,
} from '../../+state/jyske-frihed.actions';
import { JyskeFrihedFacade } from '../../+state/jyske-frihed.facade';
import { Beregningsgrundlag } from '../../+state/jyske-frihed.interfaces';
import { JyskeFrihedFormData } from '../../presentational/jyske-frihed-input/jyske-frihed-input.interfaces';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { Observable } from 'rxjs';
import { delay, filter, first, skip } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { AppendIconStylesService } from '@shared/services/append-icon-styles.service';
import { SendBeregningService } from '@kunde-kommunikation-ui/containers/send-beregning/send-beregning.service';

@Component({
  selector: 'jyske-frihed-privat',
  templateUrl: './jyske-frihed.component.html',
  styleUrls: ['./jyske-frihed.component.scss'],
})
export class JyskeFrihedComponent implements OnInit {
  beregningsgrundlag: Beregningsgrundlag;
  mock = false;
  finansieringsforslag$: Observable<Beregningsresultat[]> =
    this.jyskeFrihedFacade.JyskeFrihed$;
  getScreenWidth: number;
  grafVises = false;

  @Input()
  assetsUrl: string = '';

  constructor(
    public jyskeFrihedFacade: JyskeFrihedFacade,
    public appendIconStylesService: AppendIconStylesService,
    public sendBeregningService: SendBeregningService,
    private scroller: ViewportScroller,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.appendIconStylesService.append(this.assetsUrl, this._renderer2);

    this.mock =
      new URLSearchParams(window.location.search).get('mock') === 'true';
    this.getScreenWidth = window.innerWidth;

    this.jyskeFrihedFacade.JyskeFrihedIsLoading$.pipe(
      skip(1),
      filter((s) => s === false),
      delay(100)
    ).subscribe((s) => {
      if (this.getScreenWidth < 666) {
        this.scroller.scrollToAnchor('afdragsperiode');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }

  onBeregn(formData: JyskeFrihedFormData): void {
    const beregningsgrundlag: Beregningsgrundlag = {
      laaneoenske: formData.laaneoenske,
      ejendomsvaerdi: formData.boligVaerdi,
      antalAarTilAfdragsfrihed: formData.antalAarTilAfdragsfrihed,
    };
    this._getFinansieringsforslag(this.mock, beregningsgrundlag);
  }

  onDisableToggles(event: boolean) {
    this.jyskeFrihedFacade.dispatch(
      setJyskeFrihedDisableToggles({ disable: event })
    );
  }

  onVisDetaljer(event: boolean) {
    this.jyskeFrihedFacade.dispatch(
      setJyskeFrihedVisDetaljer({ visDetaljer: event })
    );
  }

  onBeregnNytMaxLaaneoenske(boligvaerdi: number): void {
    this.jyskeFrihedFacade.dispatch(
      loadMaxProvenu({ mockData: this.mock, boligvaerdi: boligvaerdi })
    );
  }

  _getFinansieringsforslag(mockData: boolean, input: Beregningsgrundlag): void {
    this.beregningsgrundlag = input;
    this.jyskeFrihedFacade.dispatch(
      setJyskeFrihedDisableToggles({ disable: true })
    );

    this.jyskeFrihedFacade.JyskeFrihedIsLoading$.pipe(
      filter((s) => s === false),
      first()
    ).subscribe((s) =>
      this.jyskeFrihedFacade.dispatch(
        setJyskeFrihedVisDetaljer({ visDetaljer: true })
      )
    );

    this.jyskeFrihedFacade.dispatch(loadJyskeFrihed({ mockData, input }));
  }

  onKontaktMig(event: Beregningsresultat): void {
    this.sendBeregningService.onSendBeregning(event, 'BDK021');
  }

  onKontaktMigGenerel(): void {
    this.jyskeFrihedFacade.KontaktMigParametreGenerel$.pipe(first()).subscribe(
      (parametre) =>
        this.jyskeFrihedFacade.dispatch(
          sendGenerelJyskeFrihedKontaktformular({
            kontaktMigParametre: parametre,
          })
        )
    );
  }
}
