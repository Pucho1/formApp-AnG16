import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
    selector: 'app-switches-page',
    templateUrl: './switches-page.component.html',
    styles: ` :host { display: block } `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});

  constructor(
    private formb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {};

  initForm(): void {
    this.myForm = this.formb.group({
      genero: ['', [ Validators.required ]],
      notificaciones: [false ],
      terminosCondiciones: [false, Validators.requiredTrue]
    })
  };

  isInvalidField(field: string): boolean | null{
    return this.validatorsService.isInvalidField(this.myForm, field);
  };

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    const { terminosCondiciones , ...newPerson } = this.myForm.value;

    console.log(newPerson);

    this.myForm.reset();
  };

  ngOnInit(): void {
    this.initForm();
  };
};
