import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { CategoryComponent } from './category/category.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'edit/:id',
    component: EditTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
