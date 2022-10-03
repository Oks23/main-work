import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AccountService
} from '../shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
    this.toastr.success('Ви вийшли з системи');
  }

}