import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

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

  constructor(
    private formb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {};

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
    return this.validatorsService.isInvalidField(this.myForm, field);
  };

  isInvalidFieldArry(filedArry: FormArray, index: number): boolean | null{
    if(!filedArry.controls[index]) return null;

    return filedArry.controls[index].errors && filedArry.controls[index].touched;
  };

  getFieldError(field: string): string| null{
    return this.validatorsService.getFieldError(this.myForm, field);
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
