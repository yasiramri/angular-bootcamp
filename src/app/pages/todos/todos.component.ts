import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../services/category.service';

export interface Todos {
  id: number; // Assuming you have an ID for each todo
  title: string;
  description: string;
  created_by: string;
  progress: number;
}

export interface Category {
  id: number;
  category: string;
}
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: false,
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  userData: Todos[] = [];
  categoriesList: Category[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'created_by',
    'progress',
    'actions',
  ];

  modalAdd: any;

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private restApiService: TodoService
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.getCategory();
    this.addForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      category_id: [null],
      description: [null],
      progress: [null],
    });
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

  private getCategory() {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categoriesList = data.data; // 🔥 Simpan kategori ke array
        console.log('Categories:', this.categoriesList);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
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

  addButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  putButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  addForm!: UntypedFormGroup;
  get af() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.addForm.markAllAsTouched();

    if (this.addForm.valid) {
      let requestData = this.addForm.value;
      console.log(this.addForm.value);
      const formData = this.addForm.value;
      formData.category_id = parseInt(formData.category_id, 10);
      formData.progress = parseInt(formData.progress, 10);
      console.log(formData);
      this.todoService.createData(this.addForm.value).subscribe((data: any) => {
        this.modalService.dismissAll();
        this.ngOnInit();
      });
      this.restApiService.createData(requestData).subscribe({
        next: (data: any) => {
          console.log('Response dari backend:', data);
          this.addForm.reset();
          this.modalService.dismissAll();
          this.getTodos();
        },
        error: (error: any) => {
          console.error('Terjadi error:', error);
        },
      });
    }
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.restApiService.deleteTodo(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.getTodos(); // Refresh Data
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }
}
