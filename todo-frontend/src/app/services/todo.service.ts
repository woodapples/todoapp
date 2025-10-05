import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoCreate, TodoUpdate } from '../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private base = '/api/todos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    console.log('Fetching all todos from:', this.base);
    return this.http.get<Todo[]>(this.base);
  }

  getById(id: string): Observable<Todo> {
    console.log('Fetching todo by ID:', `${this.base}/${id}`);
    return this.http.get<Todo>(`${this.base}/${id}`);
  }

  testBackend(): Observable<string> {
    return this.http.get(`${this.base}/test`, { responseType: 'text' });
  }

  create(payload: TodoCreate) {
    return this.http.post<Todo>(this.base, payload);
  }

  complete(id: string) {
    console.log('Sending PATCH request to:', `${this.base}/${id}/complete`);
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return this.http.patch<Todo>(
      `${this.base}/${id}/complete`,
      {},
      { headers }
    );
  }

  // Alternative complete method using PUT
  completeWithPut(id: string) {
    console.log('Sending PUT request to complete todo:', `${this.base}/${id}`);
    const updatePayload = { completed: true };
    return this.http.put<Todo>(`${this.base}/${id}`, updatePayload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  update(id: string, payload: TodoUpdate) {
    return this.http.put<Todo>(`${this.base}/${id}`, payload);
  }
}
