import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskComponent } from '../task/task.component';

const routesAcc: Routes = [
  // {path: '', component: LoginComponent},
  // {path: '', component: TaskComponent},
  // {path: 'task', component: TaskComponent},
  {path: 'login', component: LoginComponent},
  // {path: '', component: RegisterComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesAcc),
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
