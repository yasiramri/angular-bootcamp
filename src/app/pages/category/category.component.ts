import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

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
    'actions',
  ];

  modalAdd: any;

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.addForm = this.formBuilder.group({
      category: [null],
    });
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
        console.log('Updated Category:', updated);
        this.getCategory();
      },
      (error) => {
        console.error('Error updating category', error);
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

  addButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  addForm!: UntypedFormGroup;
  get af() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.addForm.markAllAsTouched();

    if (this.addForm.valid) {
      console.log(this.addForm.value);
      this.categoryService
        .createData(this.addForm.value)
        .subscribe((data: any) => {
          this.modalService.dismissAll();
          this.ngOnInit();
        });
    }
  }
}
