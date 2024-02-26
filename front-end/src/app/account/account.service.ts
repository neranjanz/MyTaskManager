import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountModule } from './account.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseApiUrl = 'http://localhost:5067/api/';

  private currentUserSource = new BehaviorSubject<User|null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(values: any) {
    return this.http.post<User>(this.baseApiUrl + 'user/login',values).pipe(
      map(user => {
        localStorage.setItem('token', btoa(`${user.username}:${user.password}`));
        this.currentUserSource.next(user);
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(this.baseApiUrl + 'user/register',values).pipe(
      map(user => {
        localStorage.setItem('token', btoa(`${user.username}:${user.password}`));
        this.currentUserSource.next(user);
      })
    )   
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    this.toastr.success('Logged out successfully!', 'MyTask');
  }


}
