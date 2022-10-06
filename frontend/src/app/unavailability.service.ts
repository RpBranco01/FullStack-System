import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Unavailability } from './unavailability';

@Injectable({
  providedIn: 'root'
})
export class UnavailabilityService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createUnavailability(unavailability: Unavailability): Observable<Unavailability> {
    const url = `${this.apiUrl}/unavailability`;
    return this.http.post<Unavailability>(url, unavailability, this.httpOptions).pipe(
      tap((newUnavailability: Unavailability) => console.log(`added unavailability with id = ${newUnavailability._id}`)),
      catchError(this.handleError<Unavailability>('createUnavailability'))
    );
  }

  getUnavailability(_id: string): Observable<Unavailability> {
    const url = `${this.apiUrl}/unavailability/${_id}`;
    return this.http.get<Unavailability>(url).pipe(
      tap(_ => console.log(`fetched unavailability id=${_id}`)),
      catchError(this.handleError<Unavailability>(`getUnavailability id=${_id}`))
    );
  }

  getUnavailabilitiesByUser(_id: string): Observable<Unavailability[]> {
    const url = `${this.apiUrl}/unavailability/user/${_id}`;
    return this.http.get<Unavailability[]>(url).pipe(
      tap(_ => console.log(`fetched unavailabilities`)),
      catchError(this.handleError<Unavailability[]>(`getUnavailabilityByUser id=${_id}`))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
