import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET users from the server */
  getProjects(): Observable<Project[]> {
    const url = `${this.apiUrl}/project`;
    return this.http.get<Project[]>(url)
      .pipe(
        tap(_ => console.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  createProject(project: Project): Observable<Project> {
    const url = `${this.apiUrl}/project`;
    return this.http.post<Project>(url, project, this.httpOptions).pipe(
      tap((newProject: Project) => console.log(`added project with id = ${newProject._id}`)),
      catchError(this.handleError<Project>('createProject'))
    );
  }

  getProject(_id: string): Observable<Project> {
    const url = `${this.apiUrl}/project/${_id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => console.log(`fetched project id=${_id}`)),
      catchError(this.handleError<Project>(`getProject id=${_id}`))
    );
  }

  updateProject(project: Project): Observable<any> {
    const url = `${this.apiUrl}/project/${project._id}`;
    return this.http.put(url, project, this.httpOptions).pipe(
      tap(_ => console.log(`updated project id=${project._id}`)),
      catchError(this.handleError<Project>('updateProject'))
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
