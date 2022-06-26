import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRate } from '../interfaces/rate';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RateService {

    constructor(private http: HttpClient) { }
    private rateUrl = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

    getUahRates(): Observable<IRate[]> {
        return this.http.get<IRate[]>(this.rateUrl)
        .pipe(
            tap(_ => console.log('fetched rates')),
            catchError(this.handleError<IRate[]>('getUahRates', []))
        );
    }

    getRate = ( inputCurrency: string, outputCurrency: string ): Observable<IRate[]> => {
        return this.http.get<IRate[]>(`https://free.currconv.com/api/v7/convert?q=${ inputCurrency }_${ outputCurrency }&compact=ultra&apiKey=b0ef941b99503b4198ff`)
        .pipe(
            tap(_ => console.log('fetched rates')),
            catchError(this.handleError<IRate[]>('getRate', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          console.error(error);
      
          console.log(`${operation} failed: ${error.message}`);
      
          return of(result as T);
        };
      }
}