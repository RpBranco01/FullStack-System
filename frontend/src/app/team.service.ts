import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTeam(_id: string): Observable<Team> {
    const url = `${this.apiUrl}/team/${_id}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => console.log(`fetched team id=${_id}`)),
      catchError(this.handleError<Team>(`getTeam id=${_id}`))
    );
  }

  createTeam(team: Team): Observable<Team> {
    const url = `${this.apiUrl}/team`;
    return this.http.post<Team>(url, team, this.httpOptions).pipe(
      tap((newTeam: Team) => console.log(`added team with id=${newTeam._id}`)),
      catchError(this.handleError<Team>('createTeam'))
    );
  }

  getTeams(): Observable<Team[]> {
    const url = `${this.apiUrl}/team`;
    return this.http.get<Team[]>(url)
      .pipe(
        tap(_ => console.log('fetched teams')),
        catchError(this.handleError<Team[]>('getTeams', []))
      );
  }

  updateTeam(team: Team): Observable<any> {
    const url = `${this.apiUrl}/team/${team._id}`;
    return this.http.put(url, team, this.httpOptions).pipe(
      tap(_ => console.log(`updated team id=${team._id}`)),
      catchError(this.handleError<any>('updateTeam'))
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
