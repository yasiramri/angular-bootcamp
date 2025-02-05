import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

export interface Todos {
  id: number; // Assuming you have an ID for each todo
  title: string;
  description: string;
  created_by: string;
  progress: number;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: false,
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  userData: Todos[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'created_by',
    'progress',
    'actions',
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  // Fetch the todos from the backend
  private getTodos() {
    this.todoService.getTodos().subscribe(
      (res) => {
        this.userData = res.data; // Assuming 'data' contains the list of todos
        console.log(res);
      },
      (error) => {
        console.error('Error fetching todos', error);
      }
    );
  }

  // Update a todo item
  onUpdate(todo: Todos) {
    const updatedTodo = {
      ...todo,
      title: 'Updated Title', // Example updated field
      description: 'Updated Description',
      progress: 100, // Example: marking as complete
    };

    this.todoService.updateTodo(todo.id, updatedTodo).subscribe(
      (updated) => {
        console.log('Updated Todo:', updated);
        this.getTodos(); // Reload the todos after update
      },
      (error) => {
        console.error('Error updating todo', error);
      }
    );
  }

  // Delete a todo item
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(
        () => {
          console.log('Deleted Todo with ID:', id);
          this.getTodos(); // Reload the todos after deletion
        },
        (error) => {
          console.error('Error deleting todo', error);
        }
      );
    }
  }
}
