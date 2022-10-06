import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUser(username: string): Observable<User> {
    const url = `${this.apiUrl}/user/${username}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user username=${username}`)),
      catchError(this.handleError<User>(`getUser username=${username}`))
    );
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/user`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  createUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/user`;
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added user with id = ${newUser._id}`)),
      catchError(this.handleError<User>('createUser'))
    );
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/user/${user._id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
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
