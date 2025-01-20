import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-basic-pages',
    templateUrl: './basic-page.component.html',
})
export class BasicPagesComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});

  constructor( private formb: FormBuilder) {};

  initForm(): void{
    this.myForm = this.formb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [ Validators.required, Validators.min(0)]],
    })
  };

  isInvalidField(field: string): boolean | null{
    if(!this.myForm.controls[field]) return null;
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  };

  getFieldError(field: string): string| null{

    if(!this.myForm.controls[field].errors) return null;

    const errors = this.myForm.controls[field].errors || {};

    const keys = Object.keys(errors);

    for (const element of keys) {
      switch (element) {
        case 'required':
          return 'Este campo es requerido';

          case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracters.`;

        default:
          break;
      };
    };
    return null;
  };


  onSave(): void {
    if(this.myForm.invalid) return;
    const initialValues = {price: 0, inStorage: 0};
    this.myForm.reset(initialValues);
  };

  ngOnInit(): void {
    this.initForm()
  };
};
