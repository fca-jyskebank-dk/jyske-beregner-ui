import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Beregningsresultat } from '@beregningsresultat-ui/finansieringsforslag/finansieringsforslag.interfaces';
import {
  AlertConfig,
  COMPONENT_PROPS,
  Modal,
  ModalController,
} from '@kirbydesign/designsystem';
import { ValidatorService } from '@shared/validation/validator.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, skip } from 'rxjs/operators';
import { sendBeregning } from '../../+state/send-beregning/send-beregning.actions';
import { SendBeregningFacade } from '../../+state/send-beregning/send-beregning.facade';

@Component({
  selector: 'send-beregning',
  templateUrl: './send-beregning.component.html',
  styleUrls: ['./send-beregning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendBeregningComponent implements OnInit, OnDestroy {
  // INPUT_DEBOUNCE_TIME = 1000; // millisekunder

  get navn(): AbstractControl {
    return this.formGroup.get('navn');
  }
  get email(): AbstractControl {
    return this.formGroup.get('email');
  }
  get navnValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(this.navn, {
      required: 'Navn skal udfyldes',
      pattern: 'Navn skal indeholde minimum fornavn og efternavn',
    });
  }
  get emailValidationMessage(): string {
    return this.validatorService.getValidationMessageEvenNotDirty(this.email, {
      required: 'Email skal udfyldes',
      pattern: 'Ikke en valid email',
    });
  }

  kontaktMigChecked = false;
  mock = false;
  formGroup: FormGroup;
  formInvalid = true;
  emailLabel = 'Indtast email';
  navnLabel = 'Indtast fornavn og efternavn';
  subsciptions: Subscription[] = [];
  beregningsresultat: Beregningsresultat;
  partnerId: string;

  private editedNavn: ReplaySubject<string> = new ReplaySubject();
  private editedEmail: ReplaySubject<string> = new ReplaySubject();

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    public sendBeregningFacade: SendBeregningFacade,
    private modalController: ModalController,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    this.beregningsresultat = componentProps.beregningsresultat;
    this.partnerId = componentProps.partnerId;
  }

  @HostListener('focusout', ['$event.target'])
  validateInput(event) {
    if (event?.id === 'navn') {
      this._handleInput();
    }
    if (event?.id === 'email') {
      this._handleInput();
    }
  }

  private _handleInput() {
    this._validerEmail();
    this._validerNavn();
    this.formInvalid = this.navn.invalid || this.email.invalid;
  }

  ngOnInit(): void {
    this._setupFormGroup();

    this.mock =
      new URLSearchParams(window.location.search).get('mock') === 'true';

    this.subsciptions.push(
      this.sendBeregningFacade.SendBeregningSuccess$.pipe(
        skip(1),
        filter((s) => s === true)
      ).subscribe((s) => {
        this.ShowSuccessAlert();
      })
    );

    this.subsciptions.push(
      this.sendBeregningFacade.SendBeregningHasError$.pipe(
        skip(1),
        filter((s) => s === true)
      ).subscribe((s) => {
        this.ShowErrorAlert();
      })
    );

    this.subsciptions.push(
      this.editedNavn
        .pipe()
        // .pipe(debounceTime(this.INPUT_DEBOUNCE_TIME))
        // .pipe(distinctUntilChanged(), debounceTime(this.INPUT_DEBOUNCE_TIME))
        .subscribe(() => {
          this._handleInput();
        })
    );

    this.subsciptions.push(
      this.editedEmail
        .pipe(distinctUntilChanged())
        // .pipe(debounceTime(this.INPUT_DEBOUNCE_TIME))
        // .pipe(distinctUntilChanged(), debounceTime(this.INPUT_DEBOUNCE_TIME))
        .subscribe(() => {
          this._handleInput();
        })
    );
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((s) => s.unsubscribe());
  }

  private async ShowSuccessAlert() {
    const config: AlertConfig = {
      title: '',
      message: 'Vi sender dig en beregning hurtigst muligt',
      okBtn: 'Ok',
      icon: {
        name: 'verify',
        themeColor: 'success',
      },
    };
    this.modalController.showAlert(config, this._onAlertClose);
  }
  private _onAlertClose = (result: boolean) => {
    this.modal.close();
  };

  private async ShowErrorAlert() {
    const alertConfig: AlertConfig = {
      title: '',
      message: 'Ups, noget gik galt. Prøv igen',
      okBtn: 'Ok',
      icon: {
        name: 'close',
        themeColor: 'danger',
      },
    };
    this.modalController.showAlert(alertConfig);
  }

  _setupFormGroup(): void {
    this.formGroup = this.fb.group({
      navn: null,
      email: null,
      kontaktMig: false,
    });
  }

  private _validerNavn() {
    this.navn.setValidators([
      Validators.required,
    ]);
    this.navn.updateValueAndValidity();
  }

  private _validerEmail() {
    this.email.setValidators([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    ]);
    this.email.updateValueAndValidity();
  }

  onKeyUpNavn(currentString): void {
    this.editedNavn.next(currentString);
  }
  onKeyUpEmail(currentString): void {
    this.editedEmail.next(currentString);
  }
  changeKontaktMigCheckbox(checked: boolean) {
    this.kontaktMigChecked = checked;
  }
  onSend(): void {
    const params = {
      mockData: this.mock,
      beregningsresultat: this.beregningsresultat,
      navn: this.navn.value,
      email: this.email.value,
      kontaktMig: this.kontaktMigChecked,
      partnerId: this.partnerId,
    };
    this.sendBeregningFacade.dispatch(sendBeregning(params));
  }

  onPersondataClick(): void {
    window.open('https://www.jyskebank.dk/omjyskebank/aftaler/politik');
  }
}
