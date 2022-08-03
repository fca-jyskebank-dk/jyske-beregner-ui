import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemType } from '@shared/store/common';

@Component({
  selector: 'jyske-beregner-transparent-item-list',
  templateUrl: './transparent-item-list.component.html',
  styleUrls: ['./transparent-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransparentItemListComponent {
  @Input()
  title: string;

  @Input()
  items: ItemType[];
}
