import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterUserComponent } from './master-user/master-user.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: 'master-user',
    component: MasterUserComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
