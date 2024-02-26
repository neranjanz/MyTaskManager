import { Component, Pipe } from '@angular/core';
import { CoreModule } from '../core.module';
import { AccountService } from '../../account/account.service';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CoreModule, SharedModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  user: User | null = {id: 0, username: '', password: ''};


  constructor(public accountService: AccountService) {
    this.accountService.currentUser$.subscribe(u => {
      this.user = u;
      console.log(this.user);
    })
  }

  // getUser() {
  //   this.accountService.currentUser$
  // }
}
