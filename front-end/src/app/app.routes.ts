import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './account/login/login.component';

export const routes: Routes = [
    {path: '', component: TaskComponent},
    {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
