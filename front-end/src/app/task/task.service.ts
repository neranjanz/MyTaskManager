import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TaskItem } from '../shared/models/taskItem';
import { TaskComponent } from './task.component';
import { environment } from '../../environments/environment';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: TaskComponent
})
export class TaskService {
  baseApiUrl = environment.apiUrl;
  currentUser: User | null = null;
  headers!: HttpHeaders;

  // username: string = 'test';
  // password: string = 'test123';

  // headers2 = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //     'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
  // })

  constructor(private http: HttpClient, public accountService: AccountService, private router: Router) {
      this.accountService.currentUser$.subscribe(user => {
      console.log('user getting inside constructor');
      console.log(user);
      this.currentUser = user;
      console.log('current user');
      console.log(this.currentUser);
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${this.currentUser?.username}:${this.currentUser?.password}`),
      });
    });
  }


  getTaskItems(sort?: string, filter?: string) {

    let httpParams = new HttpParams();

    if (sort) httpParams = httpParams.append('sort', sort);
    if (filter) httpParams = httpParams.append('filter', filter);
    
    return this.http.get<TaskItem[]>(this.baseApiUrl + 'tasks', {headers : this.headers, params: httpParams});
  } 

  getTaskItemById(id: number) {
    return this.http.get<TaskItem>(this.baseApiUrl + `tasks/${id}`, {headers : this.headers});
  }

  createTask(item: TaskItem) {
    return this.http.post<TaskItem>(this.baseApiUrl + 'tasks', item, {headers: this.headers});
  }

  updateTask(id: number, item: TaskItem) {
    return this.http.put(this.baseApiUrl + `tasks/${id}`, item, {headers: this.headers});
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseApiUrl + `tasks/${id}`, {headers: this.headers});
  }

}
