import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from '../shared/constants/role.constants';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkLogin()
  }

  checkLogin(): void {
    if (localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if (!currentUser && currentUser.role === ROLE.ADMIN) {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
    this.toastr.success('Ви успішно вийшли з системи.');
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
