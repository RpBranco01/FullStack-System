import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private apiUrl = '/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new user to the server */
  createUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/user`;
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`created user w/ id=${newUser._id}`)),
      catchError(this.handleError<User>('createUser'))
    );
  }

  /** DELETE: delete a user from the server */
  deleteUser(_id: string): Observable<User> {
    const url = `${this.apiUrl}/user`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted user w/ id=${_id}`)),
      catchError(this.handleError<User>('deleteUser'))
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
