import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/shared/interfaces/account/userData.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userDataForm!: FormGroup;
  public currentUserData!: IUser;


  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkData();
    this.initUserForm();
  }

  initUserForm(): void {
    this.userDataForm = this.fb.group({
      name: [this.currentUserData.fullName, Validators.required],
      email: [this.currentUserData.email, Validators.required],
    })
  }

  checkData(): IUser {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    return this.currentUserData = {
      fullName: currentUser.fullName,
      email: currentUser.email
    }
  }

  userDataUpdate(): void {
    this.accountService.login(this.userDataForm.value).subscribe(data => {
      data[0].fullName = this.userDataForm.value.name;
      data[0].email = this.userDataForm.value.email;
      let newUser = data[0];
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      this.toastr.success("Ваше ім'я успішно змінено!");
    })
  }

}
