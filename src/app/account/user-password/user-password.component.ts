import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { IChangePassword } from 'src/app/shared/interfaces/account/changePassword.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

  public changePasswordForm!: FormGroup;
  public changePass!: IChangePassword;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
  }


  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPass: [null, Validators.required],
      password: [null, Validators.required],
      repeatNewPass: [null, Validators.required],
    })
  }

  changePassword(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const newPass = this.changePasswordForm.value;
    let elemId: number = 0;
    if (newPass.currentPass === currentUser.password) {
      if (newPass.password === newPass.repeatNewPass) {
        if (currentUser.role === ROLE.USER) {
          this.accountService.changePass(this.changePasswordForm.value).subscribe(data => {
            elemId = currentUser.id;
            data[elemId - 1].password = this.changePasswordForm.value.password;
            let newUser = data[elemId - 1];
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            this.changePasswordForm.reset();
            this.toastr.success('Ваш пароль успішно оновлено!');
          })
        }
      }
    }
  }

}
