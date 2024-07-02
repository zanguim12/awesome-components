import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validValidator } from '../../validators/valid.validator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Ajouté le module
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';


@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  emailForm!: FormGroup;
  loginInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  loading = false;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!:Observable<boolean>;
  showPasswordError$!:Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
        private complexFormService: ComplexFormService
  ) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  initFormControls(): void {
    this.contactPreferenceCtrl = this.formBuilder.control('', Validators.required);
    this.phoneCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]);

    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      confirm: ['', [Validators.required, Validators.email]]
    }, {
      Validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    });

    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
  });
  }

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      emailForm: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }

  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => {
        const emailCtrl = this.emailForm.get('email');
        const confirmEmailCtrl = this.emailForm.get('confirm');
        return status === 'INVALID' &&
               emailCtrl?.value &&
               confirmEmailCtrl?.value;
      })
    );

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status =>
        status === 'INVALID' &&
        this.loginInfoForm.get('password')?.value &&
        this.loginInfoForm.get('confirmPassword')?.value &&
        this.loginInfoForm.hasError('confirmEqual')
      )
    );
  }

  private setEmailValidators(showEmailCtrl: boolean) {
    const emailCtrl = this.emailForm.get('email');
    const confirmEmailCtrl = this.emailForm.get('confirm');

    if (showEmailCtrl) {
      emailCtrl?.setValidators([Validators.required, Validators.email, validValidator()]);
      confirmEmailCtrl?.setValidators([Validators.required, Validators.email]);
    } else {
      emailCtrl?.clearValidators();
      confirmEmailCtrl?.clearValidators();
    }
    emailCtrl?.updateValueAndValidity();
    confirmEmailCtrl?.updateValueAndValidity();

  }

  private setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
      this.phoneCtrl.setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }

  onSubmitForm() {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
        tap(saved => {
            this.loading = false;
            if (saved) {
            this.resetForm();
            } else {
            console.error('Echec de l\'enregistrement');
            }
        })
    ).subscribe();
}

private resetForm() {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
}
  getFormControlErrorText(ctrl: AbstractControl | null) {
    if (!ctrl) return '';

    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else if (ctrl.hasError('validValidator')) {
      return 'Ce texte ne contient pas le mot VALID';
  } else {
      return 'Ce champ contient une erreur';
    }
  }

}
