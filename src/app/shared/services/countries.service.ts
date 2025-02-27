import { Injectable } from '@angular/core';

import { catchError, combineLatest, map, Observable, of } from 'rxjs';
import { Country, Region, SmallCountry } from '../../reactive/pages/countries-pages/interfaces/countyi.interface';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1/';

  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ]

  constructor( private http: HttpClient) { }

  get regions (): Region[] {
    return [ ...this._regions];
  };

  getCountrienByRegion(region: Region): Observable<SmallCountry[]>{
    const url = `${this.baseUrl}region/${ region }`

    return this.http.get<Country[]>(url)
    .pipe(
      map( countries  => countries.map( country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      }))),
      catchError((res) => of([]))
    );
  };

  getCountryByCode(CountryCode: string): Observable<SmallCountry>{

    const url = `${this.baseUrl}alpha/${ CountryCode }?fields=cca3,name,borders`;

    return this.http.get<Country>(url)
    .pipe(
      map( country  => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      })),

    );
  };

  getCoutriesByCode(CountriesCode: string[]): Observable<SmallCountry[]> {

    if(!CountriesCode || CountriesCode.length === 0 ) return of([]);

    const listOfCountryByCode: Observable<SmallCountry>[] = [];

    CountriesCode.forEach( country => {
      const reqest = this.getCountryByCode(country);
      listOfCountryByCode.push( reqest );
    });

    return combineLatest(listOfCountryByCode);
  };

};
