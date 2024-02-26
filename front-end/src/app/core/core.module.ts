import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountModule } from '../account/account.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    RouterModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class CoreModule { }
