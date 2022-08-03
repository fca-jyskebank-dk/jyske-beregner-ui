import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Procentfordeling } from '@beregn-laan-i-frivaerdi-ui/+state/laan-i-frivaerdi.interfaces';
import {
  ButtonSize,
  ColorHelper,
  SegmentedControlMode,
  SegmentItem,
} from '@kirbydesign/designsystem';
import { _USER_RUNTIME_CHECKS } from '@ngrx/store/src/tokens';
import { ChartData } from '@shared/components/doughnot-chart/doughnut-chart.interfaces';
import { CustomNumberExt } from '@shared/pipes/custom-number.ext';
import { CustomNumberPipe } from '@shared/pipes/custom-number.pipe';
import { ValidatorService } from '@shared/validation/validator.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { first, skip, skipWhile } from 'rxjs/operators';
import { LaanIFrivaerdiFormData } from './laan-i-frivaerdi-input.interfaces';

@Component({
  selector: 'laan-i-frivaerdi-input',
  templateUrl: './laan-i-frivaerdi-input.component.html',
  styleUrls: ['./laan-i-frivaerdi-input.component.scss'],
})
export class LaanIFrivaerdiInputComponent implements OnInit {
  private readonly MINIMUM_LAANEBELOEB = 150000;
  private readonly MINIMUM_BOLIGPRIS = 500000;
  private readonly MAXIMUM_BOLIGPRIS = 1000000000;
  readonly MAXIMUM_BOLIGPRIS_UI = 9999999999;

  private readonly HELAARSBOLIG_ID = 'Helaarsbolig';
  private readonly FRITIDSBOLIG_ID = 'Fritidshus';

  private valideretLaaneoenske;
  private valideretBoligvaerdi;
  private valideretRestgaeld;

  formGroup: FormGroup;
  segmentedControlMode = SegmentedControlMode.chip;
  buttonSize = ButtonSize.MD;
  dropdownSize = ButtonSize.MD;
  chartData: ChartData;
  maxProvenu: number;
  procentfordeling: Procentfordeling;

  segmentItems: SegmentItem[] = [
    { text: 'Helårsbolig', id: this.HELAARSBOLIG_ID },
    { text: 'Fritidsbolig', id: this.FRITIDSBOLIG_ID },
  ];
  selectedSegment: SegmentItem = this.segmentItems[0];
  dropdownItems: { aar: number; text: string }[] = [
    { aar: 30, text: '30 år' },
    { aar: 25, text: '25 år' },
    { aar: 20, text: '20 år' },
    { aar: 15, text: '15 år' },
    { aar: 10, text: '10 år' },
    { aar: 9, text: '9 år' },
    { aar: 8, text: '8 år' },
    { aar: 7, text: '7 år' },
    { aar: 6, text: '6 år' },
    { aar: 5, text: '5 år' },
    { aar: 4, text: '4 år' },
  ];
  initialSelectedIndex = 0;
  selectedLoebetid: number = this.dropdownItems[this.initialSelectedIndex].aar;

  laaneoenskeLabel = 'Hvor meget ønsker du at låne?';
  boligvaerdiLabel = 'Hvad er din bolig værd?';
  restgaeldLabel = 'Hvor meget skylder du i din bolig?';

  @Input()
  maximaltProvenu$: Observable<number>;

  @Input()
  procentfordeling$: Observable<Procentfordeling>;

  @Input()
  isMaxProvenuLoading$: Observable<boolean>;

  @Output()
  disableAfdragsfrihedToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  beregn: EventEmitter<LaanIFrivaerdiFormData> = new EventEmitter<LaanIFrivaerdiFormData>();

  @Output()
  beregnNytMaxLaaneoenske: EventEmitter<LaanIFrivaerdiFormData> = new EventEmitter<LaanIFrivaerdiFormData>();

  @Output()
  resetBeregning: EventEmitter<void> = new EventEmitter<void>();

  get laaneoenske(): AbstractControl {
    return this.formGroup.get('laaneoenske');
  }
  get boligvaerdi(): AbstractControl {
    return this.formGroup.get('boligvaerdi');
  }
  get restgaeld(): AbstractControl {
    return this.formGroup.get('restgaeld');
  }

  get laaneoenskeValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(
      this.laaneoenske,
      {
        required: 'Feltet skal være udfyldt',
        min:
          'Låneønske skal være min.' +
          this.customNumberPipe.transform(
            this.MINIMUM_LAANEBELOEB,
            CustomNumberExt.kr
          ),
        max:
          this.maxProvenu < this.MINIMUM_LAANEBELOEB
            ? 'Der er ikke friværdi nok i din ejendom til at låne det minimale lånebeløb på ' +
              this.customNumberPipe.transform(
                this.MINIMUM_LAANEBELOEB,
                CustomNumberExt.kr
              )
            : 'Låneønske kan maksimalt være ' +
              this.customNumberPipe.transform(
                this.maxProvenu,
                CustomNumberExt.kr
              ),
      }
    );
  }
  get boligvaerdiValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(
      this.boligvaerdi,
      {
        required:
          'Når restgæld er udfyldt, skal du også udfylde din boligs værdi.',
        min:
          'Værdi af bolig skal være mindst ' +
          this.customNumberPipe.transform(
            this.MINIMUM_BOLIGPRIS,
            CustomNumberExt.kr
          ),
        max: 'Beløbet er for stort',
      }
    );
  }
  get restgaeldValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(
      this.restgaeld,
      {
        max: 'Restgæld er så stor, at der ikke kan lånes mere i dit hus',
      }
    );
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private customNumberPipe: CustomNumberPipe
  ) {}

  ngOnInit(): void {
    this._setupFormGroup();
    this._setupChart(0, 80, 20);

    this.maximaltProvenu$.pipe(skip(1)).subscribe((max) => {
      this.maxProvenu = max;
      this._validerLaaneoenske();
    });

    this.procentfordeling$.pipe(skip(1)).subscribe((p) => {
      p === undefined
        ? (this.chartData.data = [0, 0, 100])
        : (this.chartData.data = [
            p.restgaeldPct,
            p.nytLaanPct,
            p.frivaerdiPct,
          ]);
      this._setChartData();
    });
  }

  @HostListener('keyup.0', ['$event.target'])
  @HostListener('keyup.1', ['$event.target'])
  @HostListener('keyup.2', ['$event.target'])
  @HostListener('keyup.3', ['$event.target'])
  @HostListener('keyup.4', ['$event.target'])
  @HostListener('keyup.5', ['$event.target'])
  @HostListener('keyup.6', ['$event.target'])
  @HostListener('keyup.7', ['$event.target'])
  @HostListener('keyup.8', ['$event.target'])
  @HostListener('keyup.9', ['$event.target'])
  @HostListener('keyup.backspace', ['$event.target'])
  @HostListener('keyup.delete', ['$event.target'])
  validateInput(event) {
    if (event?.id === 'restgaeld') {
      this._validerRestgaeld();
    }
    if (event?.id === 'boligvaerdi') {
      this._validerBoligvaerdi();
    }
    if (event?.id === 'laaneoenske') {
      this._validerLaaneoenske();
    }
  }

  onSegmentSelect(segment: SegmentItem) {
    this.selectedSegment = segment;
    this.resetBeregning.emit();
    if (this._parseBoligvaerdi() >= this.MINIMUM_BOLIGPRIS) {
      this._emitBeregnNytMaxLaaneoenske();
      this.maximaltProvenu$
        .pipe(
          skipWhile((x) => x === null),
          first()
        )
        .subscribe(() => {
          this._validateAll();
        });
    }
  }

  onSelectLoebetid(event) {
    this.selectedLoebetid = event.aar;
  }

  onBeregn(): void {
    const formData: LaanIFrivaerdiFormData = {
      boligVaerdi: this.valideretBoligvaerdi,
      restgaeld: this.valideretRestgaeld,
      laaneoenske: this.valideretLaaneoenske,
      boligtype: this.selectedSegment.id,
      oensketLoebetidIAar: this.selectedLoebetid,
    };
    if (this.valideretLaaneoenske > 0) this.beregn.emit(formData);
  }

  _parseBoligvaerdi(): number {
    return this.boligvaerdi.value ? parseInt(this.boligvaerdi.value) : 0;
  }

  _parseRestgaeld(): number {
    return this.restgaeld.value ? parseInt(this.restgaeld.value) : 0;
  }

  _setupFormGroup(): void {
    this.formGroup = this.fb.group({
      boligvaerdi: null,
      restgaeld: null,
      laaneoenske: null,
    });
  }

  _validateAll() {
    this._validerLaaneoenske();
    this._validerRestgaeld();
    this._validerBoligvaerdi();
    this._resetBeregning();
  }

  _validerLaaneoenske() {
    this.laaneoenske.setValidators([
      Validators.required,
      Validators.min(this.MINIMUM_LAANEBELOEB),
      Validators.max(this.maxProvenu),
    ]);
    this.laaneoenske.updateValueAndValidity();
    if (this.laaneoenske.valid)
      this.valideretLaaneoenske = this.laaneoenske.value;
    this._resetBeregning();
  }

  _validerBoligvaerdi() {
    if (this._boligvaerdiIkkeUdfyldt()) {
      this.maximaltProvenu$ = of(0);
      this.laaneoenske.setValidators([
        Validators.required,
        Validators.min(this.MINIMUM_LAANEBELOEB),
      ]);
      this.laaneoenske.updateValueAndValidity();

      if (this._restgaeldUdfyldt()) {
        this.boligvaerdi.setValidators([
          Validators.required,
          Validators.min(this.MINIMUM_BOLIGPRIS),
          Validators.max(this.MAXIMUM_BOLIGPRIS),
        ]);
        this.boligvaerdi.updateValueAndValidity();
      }
    } else {
      // boligvaerdiUdfyldt
      this.boligvaerdi.setValidators([
        Validators.min(this.MINIMUM_BOLIGPRIS),
        Validators.max(this.MAXIMUM_BOLIGPRIS),
      ]);
      this.boligvaerdi.updateValueAndValidity();

      if (this._restgaeldUdfyldt) {
        this.restgaeld.setValidators([
          Validators.min(0),
          Validators.max(this.boligvaerdi.value - 1),
        ]);
        this.restgaeld.updateValueAndValidity();
      }

      if (this.boligvaerdi.valid && this.restgaeld.valid) {
        this._emitBeregnNytMaxLaaneoenske();
      }
    }
    if (this.boligvaerdi.valid) {
      this.valideretBoligvaerdi = this._boligvaerdiIkkeUdfyldt()
        ? '0'
        : this.boligvaerdi.value;
    }
    if (this.restgaeld.valid) {
      this.valideretRestgaeld = this._restgaeldIkkeUdfyldt()
        ? '0'
        : this.restgaeld.value;
    }
    this._resetBeregning();
  }

  private _restgaeldIkkeUdfyldt() {
    return (
      this.restgaeld.value === '' ||
      this.restgaeld.value === null ||
      parseInt(this.restgaeld.value) === 0
    );
  }

  private _restgaeldUdfyldt() {
    return !this._restgaeldIkkeUdfyldt();
  }

  private _boligvaerdiIkkeUdfyldt() {
    return (
      this.boligvaerdi.value === '' ||
      this.boligvaerdi.value === null ||
      parseInt(this.boligvaerdi.value) === 0
    );
  }

  _validerRestgaeld() {
    if (this._restgaeldUdfyldt()) {
      this.boligvaerdi.setValidators([
        Validators.required,
        Validators.min(this.MINIMUM_BOLIGPRIS),
        Validators.max(this.MAXIMUM_BOLIGPRIS),
      ]);
      this.boligvaerdi.updateValueAndValidity();

      if (this.boligvaerdi.valid) {
        this.restgaeld.setValidators([
          Validators.min(0),
          Validators.max(this.boligvaerdi.value - 1),
        ]);
        this.restgaeld.updateValueAndValidity();

        if (this.restgaeld.valid) {
          this.valideretRestgaeld = this._restgaeldUdfyldt()
            ? this.restgaeld.value
            : 0;
          this._emitBeregnNytMaxLaaneoenske();
        }
      }
    } else {
      // restgaeldIkkeUdfyldt
      this.boligvaerdi.setValidators([
        Validators.min(this.MINIMUM_BOLIGPRIS),
        Validators.max(this.MAXIMUM_BOLIGPRIS),
      ]);
      this.boligvaerdi.updateValueAndValidity();
      if (this._boligvaerdiIkkeUdfyldt()) {
        this.maximaltProvenu$ = of(0);
        this.laaneoenske.setValidators([
          Validators.required,
          Validators.min(this.MINIMUM_LAANEBELOEB),
        ]);
        this.laaneoenske.updateValueAndValidity();
      } else {
        if (this.boligvaerdi.valid) {
          this._emitBeregnNytMaxLaaneoenske();
        }
      }
      this.valideretRestgaeld = 0;
    }
  }

  _emitBeregnNytMaxLaaneoenske() {
    const x: LaanIFrivaerdiFormData = {
      boligVaerdi: this._parseBoligvaerdi(),
      restgaeld: this._parseRestgaeld(),
      laaneoenske: this.laaneoenske.value
        ? parseInt(this.laaneoenske.value)
        : 0,
      boligtype: this.selectedSegment.id,
      oensketLoebetidIAar: this.selectedLoebetid,
    };
    if (x.restgaeld < x.boligVaerdi) {
      this.beregnNytMaxLaaneoenske.emit(x);
    }
    this._resetBeregning();
  }

  _resetBeregning() {
    if (this.formGroup.invalid) this.resetBeregning.emit();
  }

  _setupChart(restgaeld: number, nytLaan: number, frivaerdi: number) {
    this.chartData = {
      labels: ['Restgæld', 'Nyt lån', 'Friværdi'],
      colors: [
        ColorHelper.getThemeColorHexString('warning'),
        ColorHelper.getThemeColorHexString('success'),
        ColorHelper.getThemeColorHexString('background-color'),
      ],
      data: [restgaeld, nytLaan, frivaerdi],
    };
  }

  _setChartData(): void {
    this._updateChart(this.chartData.data);
  }

  _updateChart = (data) => (this.chartData = { ...this.chartData, data });
}
