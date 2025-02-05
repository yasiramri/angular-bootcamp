import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

export interface Category {
  id: number;
  category: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

@Component({
  selector: 'app-category',
  standalone: false,

  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  userData: Category[] = [];
  displayedColumns: string[] = [
    'category',
    'created_at',
    'updated_at',
    'deleted_at',
  ];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  private getCategory() {
    this.categoryService.getCategory().subscribe(
      (res) => {
        this.userData = res.data;
        console.log(res);
      },
      (error) => {
        console.error('Error fetching category', error);
      }
    );
  }

  // Update a category item
  onUpdate(category: Category) {
    const updateCategory = {
      ...category,
      category: 'Updated category', // Example updated field
    };

    this.categoryService.updateCategory(category.id, updateCategory).subscribe(
      (updated) => {
        console.log('Updated Todo:', updated);
        this.getCategory(); // Reload the todos after update
      },
      (error) => {
        console.error('Error updating todo', error);
      }
    );
  }

  // Delete a category item
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          console.log('Deleted Todo with ID:', id);
          this.getCategory(); // Reload the todos after deletion
        },
        (error) => {
          console.error('Error deleting todo', error);
        }
      );
    }
  }
}
