import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region, SmallCountry } from '../../interfaces/countyi.interface';
import { filter, switchMap, tap } from 'rxjs';
import { CountriesService } from '../../../../../shared/services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorPageComponent implements OnInit{

  public myForm: FormGroup = new FormGroup({});

  public coutriesByRegion: SmallCountry[] = [];

  public BoredersByCountries: any[] = [];

  constructor(
    private formb: FormBuilder,
    private countriesService: CountriesService,
  ) {};

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  private initFomr(): void {
    this.myForm = this.formb.group({
      region: [ '', Validators.required ],
      countries: [ '', Validators.required ],
      borders: [ '', Validators.required ],
    });
  };

  private onReginonChange(): void {
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap(() => this.myForm.get('countries')?.setValue('')),
        tap(() => this.BoredersByCountries = []),
        switchMap( (region) =>  this.countriesService.getCountrienByRegion(region) )
      )
      .subscribe(
        country => {
          this.coutriesByRegion = country;
          console.log(country);
        }
      )
  };

  private onCountryChange(): void {
    this.myForm.get('countries')?.valueChanges
      .pipe(
        tap(() => this.myForm.get('borders')?.setValue('')),
        filter(value => value.length > 0),
        switchMap( ( countryCode ) =>  this.countriesService.getCountryByCode( countryCode ) ),
        switchMap( ( country ) =>  this.countriesService.getCoutriesByCode( country.borders ) ),

      )
      .subscribe(
        countries => {
          this.BoredersByCountries = countries;
          console.log(countries);
        }
      )
  };

  ngOnInit(): void {
    this.initFomr();
    this.onReginonChange();
    this.onCountryChange();
  };

}
