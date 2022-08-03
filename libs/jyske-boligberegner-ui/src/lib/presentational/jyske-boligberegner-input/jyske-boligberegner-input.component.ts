import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ButtonSize,
  ColorHelper,
  SegmentedControlMode,
  SegmentItem,
} from '@kirbydesign/designsystem';
import { ChartData } from '@shared/components/doughnot-chart/doughnut-chart.interfaces';
import { CustomNumberExt } from '@shared/pipes/custom-number.ext';
import { CustomNumberPipe } from '@shared/pipes/custom-number.pipe';
import { ValidatorService } from '@shared/validation/validator.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormData } from './jyske-boligberegner-input.interfaces';

@Component({
  selector: 'jyske-boligberegner-ui-jyske-boligberegner-input',
  templateUrl: './jyske-boligberegner-input.component.html',
  styleUrls: ['./jyske-boligberegner-input.component.scss'],
})
export class JyskeBoligberegnerInputComponent implements OnInit, OnDestroy {
  private readonly INPUT_DEBOUNCE_TIME = 0;
  private readonly MINIMUM_UDBETALING = 0.05;
  private readonly MINIMUM_BOLIGPRIS = 500000;

  readonly MAXIMUM_BOLIGPRIS_UI = 9999999999;
  readonly MAXIMUM_BOLIGPRIS = 1000000000;

  private editedBoligvaerdi: ReplaySubject<string> = new ReplaySubject();
  private editedEgenbetaling: ReplaySubject<string> = new ReplaySubject();
  formGroup: FormGroup;
  segmentedControlMode = SegmentedControlMode.chip;
  tidligereEgenbetaling = null;
  egenbetalingErBeregnet = true;
  tidligereBoligvaerdi = null;
  buttonSize = ButtonSize.MD;
  chartData: ChartData;
  defaultSegmentItem: SegmentItem = { text: 'Helårsbolig', id: 'Helaarsbolig' };
  segmentItems: SegmentItem[] = [
    this.defaultSegmentItem,
    { text: 'Fritidsbolig', id: 'Fritidshus' },
  ];
  selectedSegment: SegmentItem = this.defaultSegmentItem;
  boligvaerdiLabel = 'Pris på bolig';
  egenbetalingLabel =
    'Din opsparing (min. ' +
    100 * this.MINIMUM_UDBETALING +
    '% af boligens pris + omkostninger)';

  @Output()
  disableAfdragsfrihedToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  beregn: EventEmitter<FormData> = new EventEmitter<FormData>();

  get boligvaerdi(): AbstractControl {
    return this.formGroup.get('boligvaerdi');
  }

  get egenbetaling(): AbstractControl {
    return this.formGroup.get('egenbetaling');
  }
  get boligvaerdiValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(
      this.boligvaerdi,
      {
        required: 'Feltet skal være udfyldt',
        min:
          'Pris på bolig skal mindst være ' +
          this.customNumberPipe.transform(
            this.MINIMUM_BOLIGPRIS,
            CustomNumberExt.kr
          ),
        max:
          'Pris på bolig må højst være ' +
          this.customNumberPipe.transform(
            this.MAXIMUM_BOLIGPRIS,
            CustomNumberExt.kr
          ),
      }
    );
  }

  get egenbetalingValidationMessage(): string {
    const minimum =
      this.boligvaerdi.value !== undefined
        ? Math.ceil(this.boligvaerdi.value * this.MINIMUM_UDBETALING)
        : 0;
    const maximumOverskredet =
      this.boligvaerdi.value !== undefined &&
      this.egenbetaling.value !== undefined &&
      this.egenbetaling.value > 0 &&
      this.boligvaerdi.value - this.egenbetaling.value < 1;
    return this.validatorService.getValidationMessageEvenNotDirty(
      this.egenbetaling,
      {
        required: 'Feltet skal være udfyldt',
        min:
          minimum > 0
            ? 'Egenbetaling skal være min. ' +
              this.customNumberPipe.transform(minimum, CustomNumberExt.kr)
            : Math.ceil(100 * this.MINIMUM_UDBETALING) +
              ' procent af boligens pris.',
        max: maximumOverskredet
          ? 'Opsparing skal være mindre end boligens pris'
          : '',
      }
    );
  }

  @HostListener('keydown.enter', ['$event.target'])
  @HostListener('focusout', ['$event.target'])
  validateInput(event) {
    if (event?.id === 'boligvaerdi') {
      this._handleBoligvaerdiInput();
    }
    if (event?.id === 'egenbetaling') {
      this._handleEgenbetalingInput();
    }
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private customNumberPipe: CustomNumberPipe
  ) {}

  ngOnInit(): void {
    this._setupFormGroup();
    this._setupChart(5, 15, 80);
    this.editedBoligvaerdi
      .pipe(distinctUntilChanged(), debounceTime(this.INPUT_DEBOUNCE_TIME))
      .subscribe(() => {
        this._handleBoligvaerdiInput();
      });
    this.editedEgenbetaling
      .pipe(distinctUntilChanged(), debounceTime(this.INPUT_DEBOUNCE_TIME))
      .subscribe(() => {
        this._setChartData();
      });
  }

  ngOnDestroy(): void {
    this.editedBoligvaerdi.unsubscribe();
  }

  onSegmentSelect(segment: SegmentItem) {
    this.selectedSegment = segment;
    this.onBeregn();
    this._setChartData();
  }

  onKeyUpBoligvaerdi(currentString) {
    this.editedBoligvaerdi.next(currentString);
  }

  onKeyUpEgenbetaling(currentString) {
    this.editedEgenbetaling.next(currentString);
  }

  onBeregn(): void {
    if (!this.formGroup.valid) return;
    this.validateInput(null);

    const formData: FormData = {
      boligVaerdi: parseInt(this.boligvaerdi.value),
      egenbetaling: parseInt(this.egenbetaling.value),
      boligtype: this.selectedSegment.id,
    };
    if (formData.boligVaerdi > 0 && formData.egenbetaling > 0)
      this.beregn.emit(formData);
  }

  _setupFormGroup(): void {
    this.formGroup = this.fb.group({
      boligvaerdi: null,
      egenbetaling: null,
    });
  }

  private _validerBoligvaerdi() {
    this.boligvaerdi.setValidators([
      Validators.required,
      Validators.min(this.MINIMUM_BOLIGPRIS),
      Validators.max(this.MAXIMUM_BOLIGPRIS),
    ]);
    this.boligvaerdi.updateValueAndValidity();
  }

  private _validerEgenbetaling() {
    const minVaerdi = Math.ceil(
      this.boligvaerdi.value * this.MINIMUM_UDBETALING
    );
    const maxVaerdi = this.boligvaerdi.value - 1;
    if (this.boligvaerdi.valid) {
      this.egenbetaling.setValidators([
        Validators.required,
        Validators.min(minVaerdi),
        Validators.max(maxVaerdi),
      ]);
    }
    this.egenbetaling.updateValueAndValidity();
  }

  private _handleEgenbetalingInput() {
    let udbetaling = null;
    if (this.egenbetaling.value) {
      udbetaling = Math.ceil(this.egenbetaling.value);
      this.egenbetaling.setValue(udbetaling);
      if (this.egenbetaling.value !== this.tidligereEgenbetaling + '') {
        this.disableAfdragsfrihedToggle.emit(true);
        this.egenbetalingErBeregnet = false;
        this._validerEgenbetaling();
        if (this.egenbetaling.valid) {
          this.tidligereEgenbetaling = this.egenbetaling.value;
        }
      }
    }

    this._setChartData();
  }

  private _handleBoligvaerdiInput() {
    if (this.boligvaerdi.value !== this.tidligereBoligvaerdi + '') {
      this.disableAfdragsfrihedToggle.emit(true);
      this._validerBoligvaerdi();
      if (this.boligvaerdi.valid) {
        this.tidligereBoligvaerdi = this.boligvaerdi.value;
        if (
          this.egenbetaling.value === (undefined || null) ||
          this.egenbetalingErBeregnet
        ) {
          const udbetaling = Math.ceil(
            this.boligvaerdi.value * this.MINIMUM_UDBETALING
          );
          this.egenbetaling.setValue(udbetaling === 0 ? null : udbetaling);
          this.egenbetalingErBeregnet = true;
          this.tidligereEgenbetaling = udbetaling;
        }
        this._validerEgenbetaling();
      } else {
        this.tidligereBoligvaerdi = null;
        if (this.egenbetalingErBeregnet) {
          this.egenbetaling.setValue(null);
        }
        this.egenbetaling.setValidators(null);
        this.egenbetaling.updateValueAndValidity();
      }

      this._setChartData();
    }
  }

  private _setupChart(
    udbetaling: number,
    boliglaan: number,
    realkreditlaan: number
  ) {
    this.chartData = {
      labels: ['Udbetaling', 'Boliglån', 'Realkreditlån'],
      colors: [
        ColorHelper.getThemeColorHexString('background-color'),
        ColorHelper.getThemeColorHexString('warning'),
        ColorHelper.getThemeColorHexString('success'),
      ],
      data: [udbetaling, boliglaan, realkreditlaan],
    };
  }

  _setChartData(): void {
    // if (!this.formGroup.valid) return;
    const maxRealkredit = this.selectedSegment.id === 'Fritidshus' ? 75 : 80;
    if (this.boligvaerdi.valid && this.egenbetaling.value) {
      const laanebehov =
        ((this.boligvaerdi.value - this.egenbetaling.value) /
          this.boligvaerdi.value) *
        100;
      let udbetaling = (this.egenbetaling.value / this.boligvaerdi.value) * 100;
      let laanRealkredit = laanebehov;
      let laanBank = 0;
      if (maxRealkredit < laanebehov) {
        laanBank = laanebehov - maxRealkredit;
        laanRealkredit = maxRealkredit;
      }
      if (udbetaling < 5) {
        laanBank = 95 - maxRealkredit;
        laanRealkredit = maxRealkredit;
        udbetaling = 5;
      }
      if (udbetaling > 100) {
        laanBank = 0;
        laanRealkredit = 0;
      }

      this._updateChart([udbetaling, laanBank, laanRealkredit]);
    } else {
      this._updateChart([5, 95 - maxRealkredit, maxRealkredit]);
    }
  }

  private _updateChart = (data) =>
    (this.chartData = { ...this.chartData, data });
}
