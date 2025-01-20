import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dynamic-page',
    templateUrl: './dynamic-page.component.html',
    styles: `
      :host { display: block }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DynamicPageComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});

  public newFieldGame: FormControl = new FormControl('', Validators.required);


  constructor( private formb: FormBuilder) {};

  initForm(): void{
    this.myForm = this.formb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.formb.array([
      ['Metal Gear', Validators.required],
      ['Deat Stranding', Validators.required],
      ])
    })
  };

  get listOfGames (){
    return this.myForm.get('favoriteGames') as FormArray;
  };

  isInvalidField(field: string): boolean | null{
    if(!this.myForm.controls[field]) return null;
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  };

  isInvalidFieldArry(filedArry: FormArray, index: number): boolean | null{
    if(!filedArry.controls[index]) return null;

    return filedArry.controls[index].errors && filedArry.controls[index].touched;
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

  onDeleteFavorite(index: number): void {
    this.listOfGames.removeAt(index);
  };

  onAddfavorites(): void {

    if(this.newFieldGame.errors) return;

    const newGame = this.newFieldGame.value;

    this.listOfGames.push(
      this.formb.control(newGame, Validators.required)
    );

    this.newFieldGame.reset();
  };

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };

    (this.myForm.controls['favoriteGames'] as FormArray) = this.formb.array([])

    this.newFieldGame.reset()
    this.myForm.reset();
  };

  ngOnInit(): void {
    this.initForm();
  };
};
