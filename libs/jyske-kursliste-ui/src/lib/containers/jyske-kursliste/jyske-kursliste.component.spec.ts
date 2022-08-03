import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { JyskeKurslisteStateModule } from '../../+state/jyske-kursliste.state.module';
import { JyskeKurslisteComponent } from './jyske-kursliste.component';
import { JyskeKurslisteTabelComponent } from '../../presentational/jyske-kursliste-tabel/jyske-kursliste-tabel.component';
import { JyskeKurslisteServiceProxy } from '@jyske-beregner-api/proxies/jyske-kursliste.service.proxy';
import { KurslisteService } from '@jyske-beregner-api/api/kursliste.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KurslisteType } from '@jyske-kursliste-ui/+state/jyske-kursliste.interfaces';
import { JyskeKurslisteFacade } from '@jyske-kursliste-ui/+state/jyske-kursliste.facade';
import { JyskeKurslisteAreas } from '@jyske-kursliste-ui/jyske-kursliste-ui.constants';
import { KirbyTestingModule } from '@kirbydesign/designsystem/testing-jasmine';
import { createSpyFromClass } from 'jest-auto-spies';
import { JyskeKurslisteDataTestBuilder } from './jyske-kurs-liste-data.testbuilder';
import { JyskeKurslisteMapper } from '@jyske-kursliste-ui/+state/jyske-kursliste.map.service';

describe('JyskeKursliste', () => {
  // const raekkeOpen = {
  //   tabelRaekke: ['10 år', '98,321', true, '0 år', '-0,5 %'],
  // } as KurslisteRow;
  // const raekkeClosed = {
  //   tabelRaekke: ['10 år', '99,998', false, '0 år', '0 %'],
  // } as KurslisteRow;

  // const jyskeKurslisteFacadeMock = {
  //   JyskeKurslisteFastRente$: () =>
  //     of({
  //       kurslisteType: KurslisteType.default,
  //       infoTekst: 'Info',
  //       kursDato: '12-05-2021',
  //       kursTid: null,
  //       opdateringstidspunkt: null,
  //       overskrift: 'Overskrift',
  //       tabelOverskrifter: ['Løbetid', 'Kurs', 'Afdragsfrihed', 'Rente'],
  //       tabelRaekker: [raekkeOpen, raekkeClosed],
  //     } as KurslisteData),
  //   dispatch: () => (null),
  // };

  // const getInitialState = () => {
  //   return {
  //     kurslisteType: KurslisteType.default,
  //     infoTekst: 'Info',
  //     kursDato: '12-05-2021',
  //     kursTid: null,
  //     opdateringstidspunkt: null,
  //     overskrift: 'Overskrift',
  //     tabelOverskrifter: ['Løbetid', 'Kurs', 'Afdragsfrihed', 'Rente'],
  //     tabelRaekker: [raekkeOpen, raekkeClosed],
  //   } as KurslisteData
  // };
  // const initialState = getInitialState();
  // let store: MockStore<KurslisteData>;

  let spectator: Spectator<JyskeKurslisteComponent>;
  let component: JyskeKurslisteComponent;

  const JyskeKurslisteFacadeTestDouble = createSpyFromClass(
    JyskeKurslisteFacade,
    {
      observablePropsToSpyOn: [
        'JyskeKurslisteFastRente$',
        'JyskeKurslisteVariabelRente$',
      ],
    }
  );

  JyskeKurslisteFacadeTestDouble.JyskeKurslisteFastRente$.nextWith(
    new JyskeKurslisteDataTestBuilder()
      .withKurslisteType(KurslisteType.fastrente)
      .build()
  );

  JyskeKurslisteFacadeTestDouble.JyskeKurslisteVariabelRente$.nextWith(
    new JyskeKurslisteDataTestBuilder().build()
  );

  const createComponent = createComponentFactory({
    component: JyskeKurslisteComponent,
    imports: [
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      JyskeKurslisteStateModule,
      KirbyTestingModule,
    ],
    declarations: [JyskeKurslisteTabelComponent],
    providers: [
      HttpClient,
      HttpHandler,
      KurslisteService,
      JyskeKurslisteServiceProxy,
      JyskeKurslisteMapper,
    ],
    detectChanges: false,
    componentProviders: [
      {
        provide: JyskeKurslisteFacade,
        useValue: JyskeKurslisteFacadeTestDouble,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('area logic', () => {
    it('should set selected area to default when area from input is undefined', () => {
      // arrange
      // component.area = undefined;
      // act
      spectator.component.ngOnInit();
      // assert
      expect(component.selectedArea).toBe(JyskeKurslisteAreas.default);
    });

    it('should set selected area to default when area from input is unknown', () => {
      // arrange
      spectator.setInput('area', 'abc');
      // act
      spectator.component.ngOnInit();
      // assert
      expect(component.selectedArea).toBe(JyskeKurslisteAreas.default);
    });

    it('should set selected area to variabel when area from input is variabel', () => {
      // arrange
      spectator.setInput('area', 'variabelrente');
      // act
      spectator.component.ngOnInit();
      // assert
      expect(component.selectedArea).toBe(JyskeKurslisteAreas.variabelrente);
    });

    it('should set selected area to variabel when area from input is variabel', () => {
      // arrange
      spectator.setInput('area', 'fastrente');
      // act
      spectator.component.ngOnInit();
      // assert
      expect(component.selectedArea).toBe(JyskeKurslisteAreas.default);
    });
  });

  describe('calls to facade', () => {
    it('should call JyskeKurslisteFastRente selecter when selected area is default', () => {
      // arrange
      spectator.setInput('area', 'default');

      // act
      spectator.component.ngOnInit();

      // assert
      expect(spectator.component.kursliste.kurslisteType).toBe(
        KurslisteType.fastrente
      );
    });

    it('should call JyskeKurslisteVariabelRente selecter when selected area is variabelrente', () => {
      // arrange
      spectator.setInput('area', 'variabelrente');

      // act
      spectator.component.ngOnInit();

      // assert
      expect(spectator.component.kursliste.kurslisteType).toBe(
        KurslisteType.default
      );
    });
  });

  //   it('should spy', () => {
  //     // arrange
  //     // spyOn(component, 'ngOnInit').and.stub();
  //     // it('should call mockUserFinderService to set selected user (in session storage)', () => {
  //     // Arrange
  //     // spyOn(spectator.component.jyskeKurslisteFacade, 'dispatch').and.callThrough();
  //     // spyOn(spectator.component.jyskeKurslisteFacade, 'JyskeKurslisteFastRente$').and.returnValue(state);
  //     // spyOn(spectator.component.jyskeKurslisteFacade, 'JyskeKurslisteVariabelRente$').and.returnValue(state);
  //     // spectator.component.ngOnInit();
  //     spectator.detectChanges();

  //     // Act

  //     // Assert
  //     const status = spectator.queryAll('j');
  //     // const status = spectator.query('data-testid="open-closed-flag"');
  //     console.log(status);
  //     // expect(spectator.component.onUserSelect).toHaveBeenCalledTimes(1);
  //     // expect(mockUserFinderService.setActiveMockUserId).toHaveBeenCalledWith(
  //     //   MOCKUSER2_FEATURE_2.userid
  //     // );
  //     // });
  //   });
  // });

  // // act
  // // assert
  // // })
  // // it('should bind bff-service.getLoanDetails response to headline', () => {
  // //   // Arrange
  // //   const expected = DEFAULT_RESPONSE.moreDetails.shortLoanName;

  // //   // Act
  // //   const loanDetailsShortLoanName = spectator.query(
  // //     '[data-testId="loanDetailsShortLoanName"]'
  // //   );

  // //   // Assert
  // //   expect(loanDetailsShortLoanName.innerHTML).toContain(expected);
  // // });

  // // it('should bind bff-service.getLoanDetails response to nextPayment component', () => {
  // //   // Arrange
  // //   const expected = DEFAULT_RESPONSE.nextPayment;

  // //   // Act
  // //   const [
  // //     paymentDate,
  // //     period,
  // //     instalmentFree,
  // //     paymentAfterTax,
  // //     paymentBeforeTax,
  // //     interest,
  // //     repayment,
  // //     administrationMargin,
  // //   ] = spectator.queryAll('jbl-loan-details-next-payment kirby-item data');

  // //   // Assert
  // //   expect(paymentDate.innerHTML).toEqual(expected.paymentDate);
  // //   expect(period.innerHTML).toEqual(expected.period);
  // //   expect(instalmentFree).toBeDefined();
  // //   expect(paymentAfterTax.innerHTML).toEqual(expected.paymentAfterTax);
  // //   expect(paymentBeforeTax.innerHTML).toEqual(expected.paymentBeforeTax);
  // //   expect(interest.innerHTML).toEqual(expected.interest);
  // //   expect(repayment.innerHTML).toEqual(expected.repayment);
  // //   expect(administrationMargin.innerHTML).toEqual(
  // //     expected.administrationMargin
  // //   );
  // // });

  // // it('should bind bff-service.getLoanDetails response to loanStatus component', () => {
  // //   // Arrange
  // //   const expected = DEFAULT_RESPONSE.loanStatus;

  // //   // Act
  // //   const [
  // //     outstandingDebt,
  // //     remainingTerm,
  // //     fixedPaymentPerYear,
  // //     estimatedRemainingTerm,
  // //     plannedInstalmentFreeOption,
  // //     endOfInstalmentFreePeriods,
  // //     availableInstalmentFreePeriods,
  // //   ] = spectator.queryAll('jbl-loan-details-loan-status kirby-item data');
  // //   const loanStatusTitle = spectator.query('[data-testId="loanStatusTitle"]');
  // //   const fixedPayment = spectator.query('[data-testId="fixedPayment"]');
  // //   const principleForReferredPayments = spectator.query(
  // //     '[data-testId="principleForReferredPayments"]'
  // //   );

  // //   // Assert
  // //   expect(loanStatusTitle.innerHTML).toContain(expected.dateOfStatus);
  // //   expect(outstandingDebt.innerHTML).toEqual(expected.outstandingDebt);
  // //   expect(remainingTerm.innerHTML).toContain(expected.remainingTerm);
  // //   expect(fixedPayment).toBeDefined();
  // //   expect(fixedPaymentPerYear.innerHTML).toEqual(expected.fixedPaymentPerYear);
  // //   expect(estimatedRemainingTerm.innerHTML).toContain(
  // //     expected.estimatedRemainingTerm
  // //   );
  // //   expect(plannedInstalmentFreeOption.innerHTML).toContain(
  // //     expected.plannedInstalmentFreeYears
  // //   );
  // //   expect(endOfInstalmentFreePeriods.innerHTML).toEqual(
  // //     expected.endOfInstalmentFreePeriods
  // //   );
  // //   expect(availableInstalmentFreePeriods.innerHTML).toContain(
  // //     expected.availableInstalmentFreeYears
  // //   );
  // //   expect(principleForReferredPayments).toBeDefined();
  // // });

  // // it('should bind bff-service.getLoanDetails response to redemption component', () => {
  // //   // Arrange
  // //   const expected = DEFAULT_RESPONSE.redemption;

  // //   // Act
  // //   const [redemptionPrice] = spectator.queryAll(
  // //     'jbl-loan-details-redemption kirby-item data'
  // //   );

  // //   // Assert
  // //   expect(redemptionPrice.innerHTML).toEqual(expected.redemptionPrice);
  // // });

  // // it('should bind bff-service.getLoanDetails response to moreDetails component', () => {
  // //   // Arrange
  // //   const expected = DEFAULT_RESPONSE.moreDetails;

  // //   // Act
  // //   const interestRateVariable = spectator.query(
  // //     '[data-testId="interestRateVariable"]'
  // //   );
  // //   const [
  // //     debtorRate,
  // //     interestRate,
  // //     baseRate,
  // //     interestRatePremium,
  // //     administrationMarginRate,
  // //     nextRateFixingDate,
  // //     closingDateForChangeOfTerms,
  // //     fixedRatePeriodYear,
  // //     interestRateCeiling,
  // //     interestRateCeilingExpiryDate,
  // //     principalAmount,
  // //     longLoanName,
  // //     municipalName,
  // //     taxRate,
  // //   ] = spectator.queryAll('jbl-loan-details-more-details kirby-item data');

  // //   // Assert
  // //   expect(interestRateVariable).toBeDefined();
  // //   expect(debtorRate.innerHTML).toContain(expected.debtorRate);
  // //   expect(interestRate.innerHTML).toContain(expected.interestRate);
  // //   expect(baseRate.innerHTML).toContain(expected.baseRate);
  // //   expect(interestRatePremium.innerHTML).toContain(
  // //     expected.interestRatePremium
  // //   );
  // //   expect(administrationMarginRate.innerHTML).toContain(
  // //     expected.administrationMarginRate
  // //   );
  // //   expect(nextRateFixingDate.innerHTML).toEqual(expected.nextRateFixingDate);
  // //   expect(closingDateForChangeOfTerms.innerHTML).toEqual(
  // //     expected.closingDateForChangeOfTerms
  // //   );
  // //   expect(fixedRatePeriodYear.innerHTML).toContain(
  // //     expected.fixedRatePeriodYear
  // //   );
  // //   expect(interestRateCeiling.innerHTML).toContain(
  // //     expected.interestRateCeiling
  // //   );
  // //   expect(interestRateCeilingExpiryDate.innerHTML).toEqual(
  // //     expected.interestRateCeilingExpiryDate
  // //   );
  // //   expect(principalAmount.innerHTML).toEqual(expected.principalAmount);
  // //   expect(longLoanName.innerHTML).toEqual(expected.longLoanName);
  // //   expect(municipalName.innerHTML).toEqual(expected.tax.municipalName);
  // //   expect(taxRate.innerHTML).toContain(expected.tax.taxRate);
  // // });
});
