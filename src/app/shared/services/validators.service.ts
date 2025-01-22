import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

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

  getFieldError(fomr: AbstractControl, field: string): string| null{

    if(!fomr.get(field)?.errors) return null;

    const errors = fomr.get(field)?.errors || {};

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

  isFieldOneEqualFielTwo(field1: string, field2: string) {

    // Devuelve una funcion en la que tengo acceso al formulario completo
    // para hacerlo asincrono la funcion es la que debe devover algo que esea asincrono el esto es igual
    return (form: AbstractControl) : ValidationErrors | null => {

      const field1Value = form.get(field1)?.value;
      const field2Value = form.get(field2)?.value;

      if( field1Value !== field2Value ) {
        form.get(field1)?.setErrors( { notEquals: true } )
        return {notEquals: true};
      };

      form.get(field1)?.setErrors( null );
      return null;
    };
  };

};
