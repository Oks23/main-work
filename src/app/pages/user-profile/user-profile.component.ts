import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }
  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
}
