import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from './user';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = "/api";

  constructor(
    private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUser(_id: string): Observable<User> {
    const url = `${this.apiUrl}/task/userid/${_id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${_id}`)),
      catchError(this.handleError<User>(`getUser id=${_id}`))
    );
  }

  getTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/task`;
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => console.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTask(_id: string): Observable<Task> {
    const url = `${this.apiUrl}/task/${_id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => console.log(`fetched task id=${_id}`)),
      catchError(this.handleError<Task>(`getTask id=${_id}`))
    );
  }

  updateTask(task: Task): Observable<any> {
    const url = `${this.apiUrl}/task/${task._id}`;
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(_ => console.log(`updated task id=${task._id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  createTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/task`;
    return this.http.post<Task>(url, task, this.httpOptions).pipe(
      tap((newTask: Task) => console.log(`added task with id = ${newTask._id}`)),
      catchError(this.handleError<Task>('createTask'))
    );
  }

  getUserTasks(_id: string): Observable<Task[]> {
    const url = `${this.apiUrl}/task/user/${_id}`;
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => console.log('fetched user tasks')),
        catchError(this.handleError<Task[]>('getUserTasks', []))
      );
  }

  deleteTask(_id: string): Observable<Task> {
    const url = `${this.apiUrl}/task/${_id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted task id=${_id}`)),
      catchError(this.handleError<Task>('deleteTask'))
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
