import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  onRegister() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe({
      next: user => {
        this.router.navigateByUrl('/account/login');
        this.toastr.success('Account creation successfull!', 'MyTask');
      },
      error: error => {
        var errMessage = (error.error.message != undefined) ? error.error.message : '';
        this.toastr.error('User creation failed! ' + errMessage, 'MyTask');
        console.log(error);
      }
    })
  }

  navigateToLogin() {
    this.router.navigateByUrl('/account/login');
  }

}
