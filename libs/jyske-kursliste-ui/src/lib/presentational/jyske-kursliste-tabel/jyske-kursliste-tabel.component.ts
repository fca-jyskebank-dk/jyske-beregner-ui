import { FkaModalComponent } from '../fka-modal/fka-modal.component';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  InfoFkaModal,
  KurslisteData,
  KurslisteRow,
  KurslisteType,
} from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'jyske-kursliste-ui-jyske-kursliste-tabel',
  templateUrl: './jyske-kursliste-tabel.component.html',
  styleUrls: ['./jyske-kursliste-tabel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JyskeKurslisteTabelComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private scroller: ViewportScroller
  ) {}
  @Input()
  data: KurslisteData;

  obligationer: KurslisteData;
  visDelmaengde: boolean;

  readonly MINIMUMSKURS = 93;
  readonly MAXIMUMSKURS = 100.5;

  get kurslisteTypeFastrente(): number {
    return KurslisteType.fastrente;
  }

  get kurslisteDato(): string {
    return `Gælder til og med: ${this.data.kursDato}`;
  }

  ngOnInit(): void {
    this.visDelmaengde = true;
    this.filter();
  }

  showModal(kurslisteRow: KurslisteRow) {
    const modalInfo: InfoFkaModal = {
      kursTid: this.data.kursTid,
      kurslisteRow: kurslisteRow,
      kurslisteType: this.data.kurslisteType,
    };
    const config: ModalConfig = {
      flavor: 'modal',
      component: FkaModalComponent,
      componentProps: modalInfo,
    };
    this.modalController.showModal(config);
  }

  onClick() {
    this.visDelmaengde = !this.visDelmaengde;
    this.filter();
    if (this.visDelmaengde) {
      this.scroller.scrollToAnchor('top');
    }
  }

  filter() {
    if (this.data.kurslisteType === KurslisteType.fastrente) {
      this.obligationer = JSON.parse(JSON.stringify(this.data));
      if (this.visDelmaengde) {
        this.obligationer.tabelRaekker = [];
        this.data.tabelRaekker.forEach((element) => {
          if (
            element.tilbudskurs > this.MINIMUMSKURS &&
            element.tilbudskurs < this.MAXIMUMSKURS
          ) {
            this.obligationer.tabelRaekker.push(element);
          }
        });
      }
    }
  }
}
