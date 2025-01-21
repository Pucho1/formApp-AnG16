import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Component, type OnInit } from '@angular/core';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
    selector: 'app-basic-pages',
    templateUrl: './basic-page.component.html',
})
export class BasicPagesComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});

  constructor(
    private formb: FormBuilder,
    private validatorsService: ValidatorsService

  ) {};

  initForm(): void{
    this.myForm = this.formb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [ Validators.required, Validators.min(0)]],
    })
  };

  isInvalidField(field: string): boolean | null{
    return this.validatorsService.isInvalidField(this.myForm, field);
  };

  getFieldError(field: string): string| null{
    return this.validatorsService.getFieldError(this.myForm, field);
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
