import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable( { providedIn: 'root' } )

export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantByStrider = ( control: FormControl) => {

    if('strider' === control.value.trim().toLowerCase()){
      return {
        noStrider: true
      };
    };

    return null;
  };

  public isInvalidField(fomr: FormGroup, field: string): boolean | null{

    if(!fomr.controls[field]) return null;

    return fomr.controls[field].errors && fomr.controls[field].touched;
  };

};
