import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:4912';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl + '/todos');
  }

  // Add a new todo
  addTodo(todo: any): Observable<any> {
    return this.http.post(this.apiUrl + '/todos', todo);
  }

  // Update an existing todo
  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(this.apiUrl + '/todos/' + id, todo);
  }

  // Delete a todo by ID
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/todos/' + id);
  }
}
