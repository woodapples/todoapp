import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo, TodoCreate, TodoUpdate } from '../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private base = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('❌ TodoService Error:', error);
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
    console.log('🔄 Fetching all todos from:', this.base);
    return this.http
      .get<Todo[]>(this.base)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: string): Observable<Todo> {
    console.log('🔄 Fetching todo by ID:', `${this.base}/${id}`);
    return this.http
      .get<Todo>(`${this.base}/${id}`)
      .pipe(catchError(this.handleError));
  }

  testBackend(): Observable<string> {
    return this.http
      .get(`${this.base}/test`, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  create(payload: TodoCreate): Observable<Todo> {
    return this.http
      .post<Todo>(this.base, payload)
      .pipe(catchError(this.handleError));
  }

  complete(id: string): Observable<Todo> {
    console.log('🔄 TodoService.complete() called with ID:', id);
    console.log('🔄 Complete URL:', `${this.base}/${id}/complete`);

    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http
      .patch<Todo>(
        `${this.base}/${id}/complete`,
        {}, // Leerer Body für PATCH
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  // Alternative complete method using PUT
  completeWithPut(id: string): Observable<Todo> {
    console.log('🔄 TodoService.completeWithPut() called with ID:', id);
    console.log('🔄 PUT URL:', `${this.base}/${id}`);

    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }

    const updatePayload = { completed: true };
    return this.http
      .put<Todo>(`${this.base}/${id}`, updatePayload)
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void> {
    console.log('🔄 TodoService.delete() called with ID:', id);
    console.log('🔄 Delete URL:', `${this.base}/${id}`);

    if (!id || id.trim() === '') {
      return throwError(() => new Error('Invalid todo ID provided'));
    }

    return this.http
      .delete<void>(`${this.base}/${id}`)
      .pipe(catchError(this.handleError));
  }

  update(id: string, payload: TodoUpdate): Observable<Todo> {
    return this.http.put<Todo>(`${this.base}/${id}`, payload);
  }
}
