import { KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ValidatorService } from '@shared/validation/validator.service';
import { JyskeFrihedBeregnerTextService } from '@jyske-frihed-beregner/services/jyske-frihed-beregner-text.service';
import { JyskeFrihedAreas } from '@jyske-frihed-beregner/jyske-frihed-beregner.constants';

export interface FormData {
  boligVaerdi: number;
  eksisterendeBoliggaeld: number;
  antalAarTilAfdragsfrihed: number;
  fastrenteperiode: number;
  restgaeldVedUdloeb: number;
}

@Component({
  selector: 'jyske-frihed-beregner-form',
  templateUrl: './jyske-frihed-beregner-form.component.html',
  styleUrls: ['./jyske-frihed-beregner-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JyskeFrihedBeregnerFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  subscriptions: Subscription[] = [];

  readonly EKSISTERENDE_BOLLIGGAELD_FAKTOR_DEFAULT = 0.3;
  readonly EKSISTERENDE_BOLLIGGAELD_FAKTOR_MAX = 0.75;

  readonly RESTGAELD_VED_UDLOEB_FAKTOR_DEFAULT = 0.3;
  readonly RESTGAELD_VED_UDLOEB_FAKTOR_MAX = 0.6;

  readonly SLIDER_STEP = 25000;
  readonly DEFAULT_AFDRAGSFRIHED_AAR = 10;

  oldBoligVaerdi: number;
  restgaeldVedUdloebValue: number;
  eksisterendeBoliggaeldMax: number;
  afdragsFrihedItems: KeyValue<number, string>[];
  afdragsFrihedSelectedKey: number;
  afdragsFrihedEnabled: boolean;
  fastrenteperiodeItems: KeyValue<number, string>[];

  @Input()
  area: number;

  @Input()
  boligvaerdiInitialValue: number;

  @Output()
  beregn: EventEmitter<FormData> = new EventEmitter<FormData>();

  get boligvaerdi(): AbstractControl {
    return this.formGroup.get('boligvaerdi');
  }

  get boligvaerdiValidationMessage(): string {
    return this.validatorService.getValidationMessage(this.boligvaerdi, {
      required: this.textService.getJyskeFrihedBeregnerFormText.boligvaerdi
        .required,
      min: this.textService.getJyskeFrihedBeregnerFormText.boligvaerdi.min,
    });
  }

  get eksisterendeBoliggaeld(): AbstractControl {
    return this.formGroup.get('eksisterendeBoliggaeld');
  }

  get fastrenteperiode(): AbstractControl {
    return this.formGroup.get('fastrenteperiode');
  }

  @HostListener('keydown.enter', ['$event.target'])
  @HostListener('focusout', ['$event.target'])
  onBlur(event) {
    if (event?.id === 'boligvaerdi') {
      this.boligvaerdi.setValidators([
        Validators.required,
        Validators.min(1500000),
      ]);
      this.boligvaerdi.updateValueAndValidity();

      if (this.formGroup.valid) {
        this._setGaeldSliders();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onChanges(event) {
    if (event.key !== 'Enter') {
      this.boligvaerdi.clearValidators();
      this.boligvaerdi.updateValueAndValidity();
    }
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    public textService: JyskeFrihedBeregnerTextService
  ) {}

  ngOnInit(): void {
    this._setupFormGroup();
    this._setupSubscriptions();
    this._setGaeldSliders();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onChangeAfdragsFrihed(item): void {
    this.afdragsFrihedSelectedKey = item.key;
    this.onBeregn();
  }

  getAfdragsFrihedSelectedIndex(): number {
    const selectedKey = this.afdragsFrihedSelectedKey || 0;
    const ix = this.afdragsFrihedItems.findIndex((f) => f.key === selectedKey);

    return ix === -1 ? this.DEFAULT_AFDRAGSFRIHED_AAR - 1 : ix;
  }

  onBeregn(): void {
    // validate formdata
    if (!this.formGroup.valid) return;

    const formData: FormData = {
      boligVaerdi: parseInt(this.boligvaerdi.value),
      eksisterendeBoliggaeld: parseInt(this.eksisterendeBoliggaeld.value),
      antalAarTilAfdragsfrihed: this.afdragsFrihedItems[
        this.getAfdragsFrihedSelectedIndex()
      ].key,
      fastrenteperiode: this.fastrenteperiode.value.key,
      restgaeldVedUdloeb: this.restgaeldVedUdloebValue,
    };

    this.beregn.emit(formData);
  }

  _setupFormGroup(): void {
    this._addAfdragsfrihedItems(false);
    this.fastrenteperiodeItems = this._addFastrenteperiodeItems();

    this.formGroup = this.fb.group({
      boligvaerdi: [this.boligvaerdiInitialValue],
      eksisterendeBoliggaeld: [0],
      fastrenteperiode: [this.fastrenteperiodeItems[0]],
    });

    if (this.area === JyskeFrihedAreas.erhverv) {
      this.fastrenteperiode.disable();
    }
  }

  _setupSubscriptions() {
    this.subscriptions = [
      this.eksisterendeBoliggaeld.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this._setRestgaeldVedUdloebSlider();
          this.onBeregn();
        }),

      this.fastrenteperiode.valueChanges.subscribe(() => {
        this.onBeregn();
      }),
    ];
  }

  _addAfdragsfrihedItems(skipStart: boolean): void {
    const items: KeyValue<number, string>[] = [];

    if (!skipStart) {
      items.push({ key: 0, value: `Fra start` });
      this.afdragsFrihedSelectedKey = 0;
    }

    for (let index = 1; index < 30; index++) {
      items.push({ key: index, value: `Efter ${index} år` });
    }

    this.afdragsFrihedItems = items;
  }

  _addFastrenteperiodeItems(): KeyValue<number, string>[] {
    const items: KeyValue<number, string>[] = [];

    items.push({ key: 30, value: `30 år` });

    for (let index = 1; index <= 6; index++) {
      items.push({ key: index, value: `${index} år` });
    }

    return items;
  }

  _setGaeldSliders() {
    const boligvaerdi: number = this.boligvaerdi.value;

    if (boligvaerdi === this.oldBoligVaerdi) {
      return;
    }

    const eksisterendeBoliggaeld =
      Math.ceil(
        (boligvaerdi * this.EKSISTERENDE_BOLLIGGAELD_FAKTOR_DEFAULT) /
          this.SLIDER_STEP
      ) * this.SLIDER_STEP;

    this.restgaeldVedUdloebValue =
      Math.ceil(
        (boligvaerdi * this.EKSISTERENDE_BOLLIGGAELD_FAKTOR_DEFAULT) /
          this.SLIDER_STEP
      ) * this.SLIDER_STEP;

    this.eksisterendeBoliggaeld.setValue(eksisterendeBoliggaeld);
    this.oldBoligVaerdi = boligvaerdi;
  }

  _setRestgaeldVedUdloebSlider() {
    // Restgæld ved udløb må ikke overstige gæld i huset.
    // Er gæld i huset > 60%, så må restgæld ikke overstige 60% af boligværdien
    const boligvaerdi: number = this.boligvaerdi.value;

    this.restgaeldVedUdloebValue = this.eksisterendeBoliggaeld.value;

    if (
      this.restgaeldVedUdloebValue >
      boligvaerdi * this.RESTGAELD_VED_UDLOEB_FAKTOR_MAX
    ) {
      this.restgaeldVedUdloebValue =
        boligvaerdi * this.RESTGAELD_VED_UDLOEB_FAKTOR_MAX;
      this._addAfdragsfrihedItems(true);
      this.afdragsFrihedEnabled = false;
    } else {
      this._addAfdragsfrihedItems(false);
      this.afdragsFrihedEnabled = true;
    }
  }
}
