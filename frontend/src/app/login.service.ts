import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  init(): Observable<Admin[]> {
    const url = `${this.apiUrl}/admin`;
    return this.http.get<Admin[]>(url, this.httpOptions).pipe(
      tap(_ => console.log(`init done`)),
      catchError(this.handleError<Admin[]>('init'))
    );
  }

  /** GET admins from the server */
  getAdmins(): Observable<Admin[]> {
    const url = `${this.apiUrl}/admin`;
    return this.http.get<Admin[]>(url)
      .pipe(
        tap(_ => console.log('fetched admins')),
        catchError(this.handleError<Admin[]>('getAdmins', []))
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
