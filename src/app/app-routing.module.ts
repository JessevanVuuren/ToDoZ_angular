import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "todoz", component: TodosComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
