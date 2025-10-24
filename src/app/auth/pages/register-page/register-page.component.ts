import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
    selector: 'app-register-pages',
    templateUrl: './register-page.component.html',
    styles: `:host { display: block }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPagesComponent implements OnInit {

  private fomrBuild         = inject( FormBuilder );
  private validatorsService         = inject( ValidatorsService );


  public myForm: FormGroup =  this.fomrBuild.group({
      name: ['',  Validators.required ],
      email: ['',[ Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidatorService] ],
      userName: ['',[ Validators.required, this.validatorsService.cantByStrider]],
      password: ['', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: ['', [ Validators.required, Validators.minLength(8) ] ],
    }, {
      Validators: [
        this.validatorsService.isFieldOneEqualFielTwo('password', 'confirmPassword')
      ]
    });




  initForm(): void {
    // this.myForm = this.formb.group({
    //   name: ['',  Validators.required ],
    //   email: ['',[ Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidatorService] ],
    //   userName: ['',[ Validators.required, this.validatorsService.cantByStrider]],
    //   password: ['', [ Validators.required, Validators.minLength(8) ] ],
    //   confirmPassword: ['', [ Validators.required, Validators.minLength(8) ] ],
    // }, {
    //   Validators: [
    //     this.validatorsService.isFieldOneEqualFielTwo('password', 'confirmPassword')
    //   ]
    // });
  };

  isInvalidField(field: string): boolean | null{
   return this.validatorsService.isInvalidField(this.myForm, field)
  };

  getFieldError(field: string): string| null{
    return this.validatorsService.getFieldError(this.myForm, field);
  };

  onSave(): void {
    this.myForm.markAllAsTouched();
  };

  ngOnInit(): void {
    this.initForm();
  };
};
