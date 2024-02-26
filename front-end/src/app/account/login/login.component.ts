import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountService } from '../account.service';
import { AccountModule } from '../account.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => {
        this.router.navigateByUrl('/');
        this.toastr.success('Login successfull!', 'MyTask');
      },
      error: error => {
        this.toastr.error('Login failed!', 'MyTask');
        console.log(error);
      }
    })
  }

  navigateToCreate() {
    this.router.navigateByUrl('/account/register');
  }

}
