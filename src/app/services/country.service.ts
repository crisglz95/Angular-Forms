import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, mergeMap } from "rxjs/operators";
import { Country } from '../interface/country.interface';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = 'https://restcountries.eu/rest/v2/all'
  
  constructor(private http: HttpClient) { }
  
  public GetCountries(){
    return this.http.get(this.url).pipe(
      mergeMap((countries: Country[]) =>from(countries).pipe(
        map((country) => country.name)
      ))
    );
  }
}
