import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as customValidators from '../../../shared/validators/form-validators';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
    selector: 'app-register-pages',
    templateUrl: './register-page.component.html',
    styles: `:host { display: block }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPagesComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});

  constructor(
    private formb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {};

  initForm(): void {
    this.myForm = this.formb.group({
      name: ['',  Validators.required ],
      email: ['',[ Validators.required, Validators.pattern(this.validatorsService.emailPattern)] ],
      userName: ['',[ Validators.required, this.validatorsService.cantByStrider]],
      password: ['', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8) ] ],
    });
  };

  isInvalidField(field: string): boolean | null{
   return this.validatorsService.isInvalidField(this.myForm, field)
  };

  onSave(): void {
    this.myForm.markAllAsTouched();
  };

  ngOnInit(): void {
    this.initForm();
  };

};
