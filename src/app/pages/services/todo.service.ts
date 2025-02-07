import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getCategory(): Observable<any> {
    return this.http.get(this.apiUrl + '/category');
  }

  // Get Todo by Id
  getTodoById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/todos/' + id);
  }

  // Update an existing todo
  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(this.apiUrl + '/todos/' + id, todo, httpOptions);
  }

  // Delete a todo by ID
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/todos/' + id, httpOptions);
  }

  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/todos', data, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODg5NzA5MSwiZXhwIjoxNzM4OTgzNDkxfQ.9n1pvQN6W9TtXt1x74_QVZA5k_z_y9WyDNFIaDsfdkU',
  }),
};
