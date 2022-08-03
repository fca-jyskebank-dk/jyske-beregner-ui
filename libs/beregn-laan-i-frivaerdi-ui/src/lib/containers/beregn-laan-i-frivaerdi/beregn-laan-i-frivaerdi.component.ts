import {
  Component,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  loadLaanIFrivaerdi,
  loadMaxProvenu,
  resetLaanIFrivaerdi,
  sendGenerelLaanIFrivaerdiKontaktformular,
  setLaanIFrivaerdiDisableToggles,
  setLaanIFrivaerdiVisAfdragsfrihed,
  setLaanIFrivaerdiVisDetaljer,
} from '../../+state/laan-i-frivaerdi.actions';
import { LaanIFrivaerdiFacade } from '../../+state/laan-i-frivaerdi.facade';
import { Beregningsgrundlag } from '../../+state/laan-i-frivaerdi.interfaces';
import { LaanIFrivaerdiFormData } from '../../presentational/laan-i-frivaerdi-input/laan-i-frivaerdi-input.interfaces';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { SendBeregningService } from 'libs/kunde-kommunikation-ui/src/lib/containers/send-beregning/send-beregning.service';
import { AppendIconStylesService } from '@shared/services/append-icon-styles.service';
import { Observable } from 'rxjs';
import { delay, filter, first, skip } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'beregn-laan-i-frivaerdi',
  templateUrl: './beregn-laan-i-frivaerdi.component.html',
  styleUrls: ['./beregn-laan-i-frivaerdi.component.scss'],
})
export class BeregnLaanIFrivaerdiComponent implements OnInit {
  beregningsgrundlag: Beregningsgrundlag;
  mock = false;
  finansieringsforslag$: Observable<Beregningsresultat[]> =
    this.laanIFrivaerdiFacade.LaanIFrivaerdi$;
  getScreenWidth: number;

  @Input()
  assetsUrl: string;

  constructor(
    public laanIFrivaerdiFacade: LaanIFrivaerdiFacade,
    public sendBeregningService: SendBeregningService,
    public appendIconStylesService: AppendIconStylesService,
    private scroller: ViewportScroller,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.appendIconStylesService.append(this.assetsUrl, this._renderer2);

    this.mock =
      new URLSearchParams(window.location.search).get('mock') === 'true';
    this.getScreenWidth = window.innerWidth;
    this.laanIFrivaerdiFacade.LaanIFrivaerdiIsLoading$.pipe(
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

  onBeregn(formData: LaanIFrivaerdiFormData): void {
    this.laanIFrivaerdiFacade.LaanIFrivaerdiVisAfdragsfrihed$.pipe(
      first()
    ).subscribe((visAfdragsfrihed) => {
      const beregningsgrundlag: Beregningsgrundlag = {
        oensketLoebetidIAar: formData.oensketLoebetidIAar,
        laaneoenske: formData.laaneoenske,
        foranstaaendeGaeld: formData.restgaeld,
        ejendomsvaerdi: formData.boligVaerdi,
        antalAfdragsfrieAar: visAfdragsfrihed ? 10 : 0,
        boligType: formData.boligtype,
      };
      this._getFinansieringsforslag(this.mock, beregningsgrundlag);
    });
  }

  onDisableToggles(event: boolean) {
    this.laanIFrivaerdiFacade.dispatch(
      setLaanIFrivaerdiDisableToggles({ disable: event })
    );
  }

  onVisDetaljer(event: boolean) {
    this.laanIFrivaerdiFacade.dispatch(
      setLaanIFrivaerdiVisDetaljer({ visDetaljer: event })
    );
  }

  onResetBeregning() {
    this.laanIFrivaerdiFacade.dispatch(resetLaanIFrivaerdi());
  }

  onVisAfdragsfrihed(event: boolean): void {
    this.laanIFrivaerdiFacade.dispatch(
      setLaanIFrivaerdiVisAfdragsfrihed({ visAfdragsfrihed: event })
    );

    const beregningsgrundlag: Beregningsgrundlag = {
      foranstaaendeGaeld: this.beregningsgrundlag.foranstaaendeGaeld,
      laaneoenske: this.beregningsgrundlag.laaneoenske,
      oensketLoebetidIAar: this.beregningsgrundlag.oensketLoebetidIAar,
      ejendomsvaerdi: this.beregningsgrundlag.ejendomsvaerdi,
      antalAfdragsfrieAar: event ? 10 : 0,
      boligType: this.beregningsgrundlag.boligType,
    };

    this._getFinansieringsforslag(this.mock, beregningsgrundlag);
  }

  onBeregnNytMaxLaaneoenske(formData: LaanIFrivaerdiFormData): void {
    this.laanIFrivaerdiFacade.dispatch(
      loadMaxProvenu({ mockData: this.mock, input: formData })
    );
  }

  _getFinansieringsforslag(mockData: boolean, input: Beregningsgrundlag): void {
    this.beregningsgrundlag = input;
    this.laanIFrivaerdiFacade.dispatch(
      setLaanIFrivaerdiDisableToggles({ disable: true })
    );

    this.laanIFrivaerdiFacade.LaanIFrivaerdiIsLoading$.pipe(
      filter((s) => s === false),
      first()
    ).subscribe((s) =>
      this.laanIFrivaerdiFacade.dispatch(
        setLaanIFrivaerdiVisDetaljer({ visDetaljer: true })
      )
    );

    this.laanIFrivaerdiFacade.dispatch(loadLaanIFrivaerdi({ mockData, input }));
  }

  onKontaktMig(event: Beregningsresultat): void {
    this.sendBeregningService.onSendBeregning(event, 'BDK005');
  }

  onKontaktMigGenerel(): void {
    this.laanIFrivaerdiFacade.KontaktMigParametreGenerel$.pipe(
      first()
    ).subscribe((parametre) =>
      this.laanIFrivaerdiFacade.dispatch(
        sendGenerelLaanIFrivaerdiKontaktformular({
          kontaktMigParametre: parametre,
        })
      )
    );
  }
}
