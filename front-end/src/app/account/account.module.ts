import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { AccountService } from './account.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
  ],
  providers: [AccountService, AccountRoutingModule, CommonModule, HttpClientModule]
})
export class AccountModule { }
