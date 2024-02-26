import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { AccountService } from './account/account.service';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, NavBarComponent],
  providers: [TaskService, AccountService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
