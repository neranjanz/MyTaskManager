import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { AccountModule } from '../account/account.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    NgForOf,
    AccountModule,
    BsDropdownModule.forRoot()
  ],
  exports: [CommonModule, ReactiveFormsModule, NgFor, NgForOf, AccountModule, BsDropdownModule]
})
export class SharedModule { }
