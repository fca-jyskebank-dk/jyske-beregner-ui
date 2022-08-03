import { COMPONENT_PROPS, ItemSize } from '@kirbydesign/designsystem';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  InfoFkaModal,
  KurslisteRow,
  KurslisteType,
} from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';

@Component({
  selector: 'jyske-kursliste-ui-fka-modal',
  templateUrl: './fka-modal.component.html',
  styleUrls: ['./fka-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FkaModalComponent {
  data: KurslisteRow;
  infoModal: InfoFkaModal;

  constructor(@Inject(COMPONENT_PROPS) private componentProps) {
    this.infoModal = componentProps;
    this.data = this.infoModal.kurslisteRow;
  }

  get kurslisteTypeFastrente(): number {
    return KurslisteType.fastrente;
  }
}
