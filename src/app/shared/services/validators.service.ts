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

  getFieldError(fomr: FormGroup, field: string): string| null{

    if(!fomr.controls[field].errors) return null;

    const errors = fomr.controls[field].errors || {};

    const keys = Object.keys(errors);

    for (const element of keys) {
      switch (element) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracters.`;

        case 'emailTaken':
          return `El email ya se esta usando`;

        case 'pattern':
          return `El formato del campo es incorrecto`;

        default:
          break;
      };
    };

    return null;
  };

};
