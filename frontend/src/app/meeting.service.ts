import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Meeting } from './meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET users from the server */
  getMeetings(): Observable<Meeting[]> {
    const url = `${this.apiUrl}/meeting`;
    return this.http.get<Meeting[]>(url)
      .pipe(
        tap(_ => console.log('fetched meetings')),
        catchError(this.handleError<Meeting[]>('getMeetings', []))
      );
  }

  getMeeting(_id: string): Observable<Meeting> {
    const url = `${this.apiUrl}/meeting/${_id}`;
    return this.http.get<Meeting>(url).pipe(
      tap(_ => console.log(`fetched meeting id=${_id}`)),
      catchError(this.handleError<Meeting>(`getMeeting id=${_id}`))
    );
  }

  getMeetingsByUser(_id: string): Observable<Meeting[]> {
    const url = `${this.apiUrl}/meeting/user/${_id}`;
    return this.http.get<Meeting[]>(url).pipe(
      tap(_ => console.log(`fetched meetings`)),
      catchError(this.handleError<Meeting[]>(`getMeetingsByUser id=${_id}`))
    );
  }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    const url = `${this.apiUrl}/meeting`;
    return this.http.post<Meeting>(url, meeting, this.httpOptions).pipe(
      tap((newMeeting: Meeting) => console.log(`added meeting with id = ${newMeeting._id}`)),
      catchError(this.handleError<Meeting>('createMeeting'))
    );
  }

  updateMeeting(meeting: Meeting): Observable<any> {
    const url = `${this.apiUrl}/meeting/${meeting._id}`;
    return this.http.put(url, meeting, this.httpOptions).pipe(
      tap(_ => console.log(`updated meeting id=${meeting._id}`)),
      catchError(this.handleError<any>('updateMeeting'))
    );
  }

  removeMeeting(_id: string): Observable<Meeting> {
    const url = `${this.apiUrl}/meeting/${_id}`;
    return this.http.delete<Meeting>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted meeting id=${_id}`)),
      catchError(this.handleError<Meeting>('removeMeeting'))
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
