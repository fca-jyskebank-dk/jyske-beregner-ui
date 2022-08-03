import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaxProvenuer } from '@jyske-frihed-ui/+state/jyske-frihed.interfaces';
import { ButtonSize } from '@kirbydesign/designsystem';
import { _USER_RUNTIME_CHECKS } from '@ngrx/store/src/tokens';
import { CustomNumberExt } from '@shared/pipes/custom-number.ext';
import { CustomNumberPipe } from '@shared/pipes/custom-number.pipe';
import { ValidatorService } from '@shared/validation/validator.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { JyskeFrihedFormData } from './jyske-frihed-input.interfaces';
import { BarChartData } from '@jyske-frihed-ui/presentational/jyske-frihed-bar-chart/jyske-frihed-bar-chart.interfaces';

@Component({
  selector: 'jyske-frihed-input',
  templateUrl: './jyske-frihed-input.component.html',
  styleUrls: ['./jyske-frihed-input.component.scss'],
})
export class JyskeFrihedInputComponent implements OnInit {
  private readonly INPUT_DEBOUNCE_TIME = 0;
  private readonly MINIMUM_LAANEBELOEB = 150000;
  private readonly MINIMUM_BOLIGPRIS = 500000;
  private readonly MAXIMUM_BOLIGPRIS = 1000000000;
  readonly MAXIMUM_BOLIGPRIS_UI = 9999999999;

  private editedLaaneoenske: ReplaySubject<string> = new ReplaySubject();
  private editedBoligvaerdi: ReplaySubject<string> = new ReplaySubject();

  formGroup: FormGroup;
  buttonSize = ButtonSize.MD;
  maxProvenuMedAfdrag: number;
  maxProvenuUdenAfdrag: number;
  beregnetBoligvaerdi: number;
  dropdownSize = ButtonSize.MD;
  dropdownItems: { aar: number; text: string }[] = [{ aar: 1, text: '1 år' }];
  visVaelgAfdragsperiode = false;
  barChartData: BarChartData;
  valgtAfdragsperiode: number = 10;
  beskedOmManglendeBoligvaerdi =
    'Hvis feltet ikke er udfyldt beregnes en 60% belåning';

  laaneoenskeLabel = 'Hvor meget ønsker du at låne?';
  boligvaerdiLabel = 'Hvad er din bolig værd?';
  isLoading = false;

  @Input()
  maximaltProvenu$: Observable<MaxProvenuer>; // Max provenu ved 75% og 60% belåning

  @Input()
  ejendomsvaerdi$: Observable<number>; // Max provenu ved 75% og 60% belåning

  @Input()
  isMaxProvenuLoading$: Observable<boolean>;

  @Input()
  isBeregningLoading$: Observable<boolean>;

  @Output()
  beregn: EventEmitter<JyskeFrihedFormData> = new EventEmitter<JyskeFrihedFormData>();

  @Output()
  beregnNytMaxLaaneoenske: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  grafVises: EventEmitter<boolean> = new EventEmitter<boolean>();

  get laaneoenske(): AbstractControl {
    return this.formGroup.get('laaneoenske');
  }
  get boligvaerdi(): AbstractControl {
    return this.formGroup.get('boligvaerdi');
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
          this.maxProvenuMedAfdrag < this.MINIMUM_LAANEBELOEB
            ? 'Der er ikke friværdi nok i din ejendom til at låne det minimale lånebeløb på ' +
              this.customNumberPipe.transform(
                this.MINIMUM_LAANEBELOEB,
                CustomNumberExt.kr
              )
            : 'Låneønske kan maksimalt være ' +
              this.customNumberPipe.transform(
                this.maxProvenuMedAfdrag,
                CustomNumberExt.kr
              ),
      }
    );
  }
  get boligvaerdiValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(
      this.boligvaerdi,
      {
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

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private customNumberPipe: CustomNumberPipe
  ) {}

  ngOnInit(): void {
    this._setupFormGroup();
    this._addAarMedAfdragDropdownItems();
    this._setupChart(0, 0, 0, true);
    this.visVaelgAfdragsperiode = false;

    this.ejendomsvaerdi$.pipe(skip(1)).subscribe((vaerdi) => {
      this.beregnetBoligvaerdi = vaerdi;
      if (!Number.isNaN(vaerdi)) {
        this._updateChartData();
      }
    });

    this.isBeregningLoading$.pipe(skip(1)).subscribe((vaerdi) => {
      if (!vaerdi) {
        this._updateChartData();
      }
    });

    this.isMaxProvenuLoading$.pipe(skip(1)).subscribe((vaerdi) => {
      this.isLoading = vaerdi;
    });

    this.editedLaaneoenske
      .pipe(distinctUntilChanged(), debounceTime(this.INPUT_DEBOUNCE_TIME))
      .subscribe(() => {
        this._validerLaaneoenske();
      });

    this.editedBoligvaerdi
      .pipe(distinctUntilChanged(), debounceTime(this.INPUT_DEBOUNCE_TIME))
      .subscribe(() => {
        this._validerBoligvaerdi();
      });

    this.maximaltProvenu$.pipe(skip(1)).subscribe((maxProvenuer) => {
      this.maxProvenuMedAfdrag = maxProvenuer.maxProvenuMedAfdrag;
      this.maxProvenuUdenAfdrag = maxProvenuer.maxProvenuUdenAfdrag;
      this._validerLaaneoenske();
    });
  }

  onKeyUpBoligvaerdi(currentString) {
    this.editedBoligvaerdi.next(currentString);
  }

  onKeyUpLaaneoenske(currentString) {
    this.editedLaaneoenske.next(currentString);
  }

  onSelectAntalAarMedAfdrag(event) {
    this.valgtAfdragsperiode = event;
    this.onBeregn();
  }

  onBeregn(): void {
    if (this.formGroup.invalid || this.isLoading) return;

    this._setDropdown();

    const formData: JyskeFrihedFormData = {
      boligVaerdi: this._parseBoligvaerdi(),
      laaneoenske: parseInt(this.laaneoenske.value),
      antalAarTilAfdragsfrihed: this.visVaelgAfdragsperiode
        ? this.valgtAfdragsperiode
        : 0,
    };
    if (formData.laaneoenske > 0) this.beregn.emit(formData);
  }

  _updateChartData() {
    if (this.formGroup.valid) {
      this._setupChart(
        this.beregnetBoligvaerdi,
        this.laaneoenske.value,
        (this.laaneoenske.value / this.maxProvenuUdenAfdrag) * 60,
        false
      );
    } else {
      this._setupChart(
        this.barChartData.ejendomsvaerdi,
        this.barChartData.laaneoenske,
        (this.laaneoenske.value / this.maxProvenuUdenAfdrag) * 60,
        true
      );
    }
  }

  _setupChart(
    boligvaerdi: number,
    laaneoenske: number,
    belaaningspct: number,
    rangeDisabled: boolean
  ) {
    this.barChartData = {
      ...this.barChartData,
      rangeDisabled: rangeDisabled,
      laaneoenske: laaneoenske,
      belaaningspct: belaaningspct,
      ejendomsvaerdi: boligvaerdi,
    };
  }

  _parseBoligvaerdi(): number {
    return this.boligvaerdi.value ? parseInt(this.boligvaerdi.value) : 0;
  }

  _setupFormGroup(): void {
    this.formGroup = this.fb.group({
      boligvaerdi: null,
      laaneoenske: null,
    });
  }

  _validerLaaneoenske() {
    if (this.maxProvenuMedAfdrag !== undefined) {
      this.laaneoenske.setValidators([
        Validators.required,
        Validators.min(this.MINIMUM_LAANEBELOEB),
        Validators.max(this.maxProvenuMedAfdrag),
      ]);
    } else {
      this.laaneoenske.setValidators([
        Validators.required,
        Validators.min(this.MINIMUM_LAANEBELOEB),
      ]);
    }
    this.laaneoenske.updateValueAndValidity();
    if (this.formGroup.invalid) {
      this.visVaelgAfdragsperiode = false;
    }
  }

  _validerBoligvaerdi() {
    this.boligvaerdi.setValidators([
      Validators.min(this.MINIMUM_BOLIGPRIS),
      Validators.max(this.MAXIMUM_BOLIGPRIS),
    ]);
    if (this._boligvaerdiIkkeUdfyldt()) {
      this.laaneoenske.setValidators([
        Validators.required,
        Validators.min(this.MINIMUM_LAANEBELOEB),
      ]);
      this.laaneoenske.updateValueAndValidity();
    } else {
      this._emitBeregnNytMaxLaaneoenske();
    }
    this.boligvaerdi.updateValueAndValidity();
    if (this.formGroup.invalid) {
      this.visVaelgAfdragsperiode = false;
    }
  }

  _boligvaerdiIkkeUdfyldt() {
    return (
      this.boligvaerdi.value === '' ||
      this.boligvaerdi.value === null ||
      parseInt(this.boligvaerdi.value) === 0
    );
  }

  _emitBeregnNytMaxLaaneoenske() {
    if (this.boligvaerdi.valid && this.boligvaerdi.value > 0) {
      this.beregnNytMaxLaaneoenske.emit(this._parseBoligvaerdi());
    }
  }

  _setDropdown() {
    if (this.boligvaerdi.invalid || this.laaneoenske.invalid) {
      return;
    }

    if (!this.visVaelgAfdragsperiode && this._skalDropdownVises()) {
      this.valgtAfdragsperiode = 10;
    }

    this.visVaelgAfdragsperiode = this._skalDropdownVises();
  }

  _skalDropdownVises() {
    return this._erIkkeUdfyldt(this.boligvaerdi.value)
      ? false
      : this.laaneoenske.value > this.maxProvenuUdenAfdrag;
  }

  _erUdfyldt(any: AbstractControl) {
    return typeof any != 'undefined' && any;
  }

  _erIkkeUdfyldt(any: AbstractControl) {
    return !this._erUdfyldt(any);
  }

  _addAarMedAfdragDropdownItems(): void {
    this.dropdownItems = [];
    for (let index = 1; index < 29; index++) {
      // max afdragsperiode er 28 år grundet fejl i visse rtl-lån på visse tider af året
      this.dropdownItems.push({ aar: index, text: `${index} år` });
      this.valgtAfdragsperiode = 10;
    }
  }
}
