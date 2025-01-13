import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {  Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-basic-pages',
    templateUrl: './basic-page.component.html',
})
export class BasicPagesComponent implements OnInit {
  constructor( private formb: FormBuilder) {}

  // myForm: FormGroup
  myForm: any

  initForm(){
    this.myForm = this.formb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [ Validators.required, Validators.min(0)]],
    })
  }


  onSave() {
    if(this.myForm.invalid) return;

    console.log(this.myForm.value)

    this.myForm.reset({price: 0, inStorage: 0});
  }

  ngOnInit(): void {
    this.initForm()
  };
}
