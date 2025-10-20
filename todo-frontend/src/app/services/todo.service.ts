import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo, TodoCreate, TodoUpdate } from '../model/todo.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private base = environment.apiBaseUrl;
  private todoHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;

      if (error.status === 0) {
        errorMessage =
          'Unable to connect to server. Please check if the backend is running.';
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  getAll(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.base)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: string): Observable<Todo> {
    return this.http
      .get<Todo>(`${this.base}/${id}`)
      .pipe(catchError(this.handleError));
  }

  testBackend(): Observable<string> {
    return this.http
      .get(`${this.base}/health`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  create(payload: TodoCreate): Observable<Todo> {
    return this.http
      .post<Todo>(this.base, payload)
      .pipe(catchError(this.handleError));
  }

  complete(id: string): Observable<Todo> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }
    return this.http
      .patch<Todo>(
        `${this.base}/${id}/complete`,
        {}, // Leerer Body für PATCH
        { headers: this.todoHeaders }
      )
      .pipe(catchError(this.handleError));
  }

  markIncomplete(id: string): Observable<Todo> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }
    return this.http
      .patch<Todo>(
        `${this.base}/${id}/incomplete`,
        {}, // Leerer Body für PATCH
        { headers: this.todoHeaders }
      )
      .pipe(catchError(this.handleError));
  }

  getTodoCounts(): Observable<{
    total: number;
    completed: number;
    pending: number;
  }> {
    return this.http
      .get<{ total: number; completed: number; pending: number }>(
        `${this.base}/count`
      )
      .pipe(catchError(this.handleError));
  }

  searchTodos(searchTerm: string): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${this.base}/search`, {
        params: { q: searchTerm },
      })
      .pipe(catchError(this.handleError));
  }

  getTodosByStatus(completed: boolean): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.base, {
        params: { completed: completed.toString() },
      })
      .pipe(catchError(this.handleError));
  }

  getTodosByPriority(
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  ): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.base, {
        params: { priority },
      })
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }

    return this.http
      .delete<void>(`${this.base}/${id}`)
      .pipe(catchError(this.handleError));
  }

  update(id: string, payload: TodoUpdate): Observable<Todo> {
    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }
    return this.http
      .put<Todo>(`${this.base}/${id}`, payload)
      .pipe(catchError(this.handleError));
  }
}
