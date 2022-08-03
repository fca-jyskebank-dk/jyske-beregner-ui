import { JyskeKurslisteTabelComponent } from '../../presentational/jyske-kursliste-tabel/jyske-kursliste-tabel.component';
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing-jasmine';
import { ModalController } from '@kirbydesign/designsystem';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import {
  KurslisteData,
  KurslisteType,
} from '@jyske-kursliste-ui/jyske-kursliste.interface';
import {
  JyskeKurslisteDataTestBuilder,
  JyskeKurslisteRaekkeDataTestBuilder,
} from '@jyske-kursliste-ui/containers/jyske-kursliste/jyske-kurs-liste-data.testbuilder';

describe('JyskeKurslisteTabel', () => {
  let spectator: Spectator<JyskeKurslisteTabelComponent>;
  let component: JyskeKurslisteTabelComponent;

  const createComponent = createComponentFactory({
    component: JyskeKurslisteTabelComponent,
    imports: [KirbyTestingModule],
    declarations: [JyskeKurslisteTabelComponent],
    mocks: [ModalController],
    detectChanges: false,
  });

  const kursliste: KurslisteData = new JyskeKurslisteDataTestBuilder()
    .withKurslisteType(KurslisteType.fastrente)
    .withTabelOverskrifter(['Løbetid', 'Rente', 'Afdragsfrihed', 'Tilbudskurs'])
    .withTabelRaekke(
      new JyskeKurslisteRaekkeDataTestBuilder()
        .withKurslisteRaekke([30, '1,00', 0, '99,099', true])
        .build()
    )
    .withTabelRaekke(
      new JyskeKurslisteRaekkeDataTestBuilder()
        .withKurslisteRaekke([30, '1,00', 0, '99,099', false])
        .build()
    )
    .build();

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should show "Åben/Lukket"-flag for fastrenteobligationer', () => {
    // arrange
    spectator.setInput('data', kursliste);
    // act
    spectator.detectChanges();
    // assert
    const flags = spectator.queryAll('[data-testid="flagId"]');
    expect(flags[0].innerHTML).toBe('Åben');
    expect(flags[1].innerHTML).toBe('Lukket');
  });
});
