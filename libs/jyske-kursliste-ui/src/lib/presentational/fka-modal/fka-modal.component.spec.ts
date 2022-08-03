import { KirbyTestingModule } from '@kirbydesign/designsystem/testing-jasmine';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import {
  InfoFkaModal,
  KurslisteType,
} from '@jyske-kursliste-ui/jyske-kursliste.interface';
import {
  FkaKursDataTestBuilder,
  InfoFkaModalDataTestBuilder,
  JyskeKurslisteRaekkeDataTestBuilder,
} from '@jyske-kursliste-ui/containers/jyske-kursliste/jyske-kurs-liste-data.testbuilder';
import { FkaModalComponent } from './fka-modal.component';

describe('FkaModal', () => {
  let spectator: Spectator<FkaModalComponent>;
  let component: FkaModalComponent;

  describe('Fast rente', () => {
    const injectedData: InfoFkaModal = new InfoFkaModalDataTestBuilder()
      .withKursTid('10:15')
      .withKurslisteType(KurslisteType.fastrente)
      .withKurslisteRow(
        new JyskeKurslisteRaekkeDataTestBuilder()
          .withAktuelKurs('99,001')
          .withKurslisteRaekke([30, '1,00', 0, '99,003', true])
          .withFkaKurs(
            new FkaKursDataTestBuilder()
              .withFkaKurs(['Dato1', '99,002'])
              .build()
          )
          .withFkaKurs(
            new FkaKursDataTestBuilder()
              .withFkaKurs(['Dato2', '99,020'])
              .build()
          )
          .build()
      )
      .build();

    const createComponent = createComponentFactory({
      component: FkaModalComponent,
      imports: [KirbyTestingModule],
      declarations: [FkaModalComponent],
      providers: [{ provide: COMPONENT_PROPS, useValue: injectedData }],
      detectChanges: false,
    });

    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
    });

    it('should be created', () => {
      expect(component).toBeDefined();
    });

    it('should show tilbudskurs for fastrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="fastRenteHero"]');
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('99,003');
      expect(templ[0].innerHTML).toContain('Jyske Fast Rente');
    });

    it('should show aktuel kurs for fastrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="aktuelkurs"]');
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('99,001');
    });

    it('should show overskrift for kursaftalekurser for fastrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll(
        '[data-testid="fastkursaftaleTemplate"]'
      );
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('Udbetalingskurs med fastkursaftale');
    });

    it('should show detaljer for fastrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="fastRenteTemplate"]');
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('Rente');
    });

    it('should show kurser for fastrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="fkaKurserRenter"]');
      expect(templ.length).toBe(2);
    });
  });

  describe('Variabel rente', () => {
    const injectedData: InfoFkaModal = new InfoFkaModalDataTestBuilder()
      .withKursTid('08:59')
      .withKurslisteType(KurslisteType.default)
      .withKurslisteRow(
        new JyskeKurslisteRaekkeDataTestBuilder()
          .withAktuelKurs('0,00123')
          .withKurslisteRaekke([30, '0 - 10 - 30', '0,00312'])
          .withFkaKurs(
            new FkaKursDataTestBuilder()
              .withFkaKurs(['Dato1', '0,00231'])
              .build()
          )
          .withFkaKurs(
            new FkaKursDataTestBuilder()
              .withFkaKurs(['Dato2', '0,00232'])
              .build()
          )
          .withFkaKurs(
            new FkaKursDataTestBuilder()
              .withFkaKurs(['Dato3', '0,00233'])
              .build()
          )
          .build()
      )
      .build();

    const createComponent = createComponentFactory({
      component: FkaModalComponent,
      imports: [KirbyTestingModule],
      declarations: [FkaModalComponent],
      providers: [{ provide: COMPONENT_PROPS, useValue: injectedData }],
      detectChanges: false,
    });

    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
    });

    it('should be created', () => {
      expect(component).toBeDefined();
    });

    it('should show tilbuds-"rente" for variabelrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="variableRenteHero"]');
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('0,00312');
      expect(templ[0].innerHTML).toContain('Jyske Rentetilpasning');
    });

    it('should show overskrift for kursaftalerenter for variabelrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll(
        '[data-testid="kontantlaansrenteTemplete"]'
      );
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('Kontantlånsrente');
    });

    it('should show detaljer for variabelrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="variabelRenteTemplate"]');
      expect(templ.length).toBe(1);
      expect(templ[0].innerHTML).toContain('Fastrenteperiode');
    });

    it('should NOT show aktuel kurs når variabelrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="aktuelkurs"]');
      expect(templ.length).toBe(0);
    });

    it('should show renter for variabelrenteobligation', () => {
      // arrange
      // act
      spectator.detectChanges();
      // assert
      const templ = spectator.queryAll('[data-testid="fkaKurserRenter"]');
      expect(templ.length).toBe(3);
    });
  });
});
