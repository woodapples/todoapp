import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoCreate, TodoUpdate } from '../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private base = '/api/todos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.base);
  }

  create(payload: TodoCreate) {
    return this.http.post<Todo>(this.base, payload);
  }

  complete(id: string) {
    return this.http.patch<Todo>(`${this.base}/${id}/complete`, {});
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  update(id: string, payload: TodoUpdate) {
    return this.http.put<Todo>(`${this.base}/${id}`, payload);
  }
}
