import { Component, Input, OnInit } from '@angular/core';
import { first, skipWhile } from 'rxjs/operators';
import { JyskeKurslisteAreas } from '../../jyske-kursliste-ui.constants';
import { KurslisteData } from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';
import {
  loadJyskeKursliste,
  setJyskeKurslisteArea,
} from '../../+state/jyske-kursliste.actions';
import { JyskeKurslisteFacade } from '../../+state/jyske-kursliste.facade';

@Component({
  selector: 'jyske-kursliste-ui-jyske-kursliste',
  templateUrl: './jyske-kursliste.component.html',
  styleUrls: ['./jyske-kursliste.component.scss'],
})
export class JyskeKurslisteComponent implements OnInit {
  selectedArea: number;

  @Input()
  area: string;

  loaded: boolean;
  kursliste: KurslisteData;

  constructor(public jyskeKurslisteFacade: JyskeKurslisteFacade) {}

  ngOnInit(): void {
    const mock =
      new URLSearchParams(window.location.search).get('mock') === 'true'
        ? true
        : false;

    this.jyskeKurslisteFacade.dispatch(
      setJyskeKurslisteArea({ area: this.selectedArea })
    );

    this.jyskeKurslisteFacade.dispatch(loadJyskeKursliste({ mockData: mock }));

    this._setup();
  }

  _getArea(area: string): JyskeKurslisteAreas {
    if (area === undefined) {
      return JyskeKurslisteAreas.default;
    }

    switch (area.toLowerCase()) {
      case 'fastrente': {
        return JyskeKurslisteAreas.default;
      }
      case 'variabelrente': {
        return JyskeKurslisteAreas.variabelrente;
      }
      default: {
        return JyskeKurslisteAreas.default;
      }
    }
  }

  _setup(): void {
    this.selectedArea = this._getArea(this.area);

    this._getArea(this.area) === JyskeKurslisteAreas.variabelrente
      ? this.jyskeKurslisteFacade.JyskeKurslisteVariabelRente$.pipe(
          skipWhile((s) => s === null),
          first()
        ).subscribe((kursliste) => {
          this.loaded = true;
          this.kursliste = kursliste;
        })
      : this.jyskeKurslisteFacade.JyskeKurslisteFastRente$.pipe(
          skipWhile((s) => s === null),
          first()
        ).subscribe((kursliste) => {
          this.loaded = true;
          this.kursliste = kursliste;
        });
  }
}
