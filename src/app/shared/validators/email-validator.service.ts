import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    return this.checkEmailNotTaken(email).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null))
    );
  };

  // registerOnValidatorChange?(fn: () => void): void {
  //   // Optional method, can be left unimplemented if not needed
  // }

  private checkEmailNotTaken(email: string): Observable<boolean> {

    // Simulate an HTTP request
    const takenEmails = ['test@example.com', 'hello@world.com'];

    const isTaken = takenEmails.includes(email);

    return of(isTaken).pipe(delay(1000)); // Simulate network delay

  };
};
