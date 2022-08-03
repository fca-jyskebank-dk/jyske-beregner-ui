import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import {
  loadBeregnLaanGenerel,
  openBeregnLaanIFrivaerdi,
  openBeregnLaanTilKoebAfBolig,
  sendGenerelKontaktformular,
  setBeregnLaanGenerelDisableToggles,
  setBeregnLaanGenerelVisAfdragsfrihed,
} from '@beregn-laan-generel-ui/+state/beregn-laan-generel.actions';
import { BeregnLaanGenerelFacade } from '@beregn-laan-generel-ui/+state/beregn-laan-generel.facade';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import { SendBeregningService } from '@kunde-kommunikation-ui/containers/send-beregning/send-beregning.service';
import { AppendIconStylesService } from '@shared/services/append-icon-styles.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'beregn-laan-generel',
  templateUrl: './beregn-laan-generel.component.html',
  styleUrls: ['./beregn-laan-generel.component.scss'],
})
export class BeregnLaanGenerelComponent implements OnInit {
  mock = false;
  finansieringsforslag$: Observable<Beregningsresultat[]> =
    this.laanGenerelFacade.BeregnLaanGenerel$;
  getScreenWidth: number;

  @Input()
  assetsUrl: string;

  constructor(
    public appendIconStylesService: AppendIconStylesService,
    public laanGenerelFacade: BeregnLaanGenerelFacade,
    public sendBeregningService: SendBeregningService,
    private scroller: ViewportScroller,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.appendIconStylesService.append(this.assetsUrl, this._renderer2);

    this.mock =
      new URLSearchParams(window.location.search).get('mock') === 'true';
    this.getScreenWidth = window.innerWidth;

    this._getFinansieringsforslag(this.mock, false);
  }

  onDisableToggles(event: boolean) {
    this.laanGenerelFacade.dispatch(
      setBeregnLaanGenerelDisableToggles({ disable: event })
    );
  }

  onVisAfdragsfrihed(event: boolean): void {
    this.laanGenerelFacade.dispatch(
      setBeregnLaanGenerelVisAfdragsfrihed({ visAfdragsfrihed: event })
    );
    this._getFinansieringsforslag(this.mock, event);
  }

  _getFinansieringsforslag(mockData: boolean, afdragsfrihed: boolean): void {
    this.laanGenerelFacade.dispatch(
      setBeregnLaanGenerelDisableToggles({ disable: true })
    );
    const antalAfdragsfriAar: number = afdragsfrihed ? 10 : 0;
    this.laanGenerelFacade.dispatch(
      loadBeregnLaanGenerel({ mockData, antalAfdragsfriAar })
    );
  }

  onKontaktMig(event: Beregningsresultat): void {
    this.sendBeregningService.onSendBeregning(event, 'BDK006');
  }

  onKontaktMigGenerel(): void {
    this.laanGenerelFacade.KontaktMigParametreGenerel$.pipe(first()).subscribe(
      (parametre) =>
        this.laanGenerelFacade.dispatch(
          sendGenerelKontaktformular({
            kontaktMigParametre: parametre,
          })
        )
    );
  }

  onOpenBeregnLaanIFrivaerdi(event: boolean): void {
    this.laanGenerelFacade.dispatch(openBeregnLaanIFrivaerdi());
  }

  onOpenBeregnLaanTilKoebAfBolig(event: boolean): void {
    this.laanGenerelFacade.dispatch(openBeregnLaanTilKoebAfBolig());
  }
}
