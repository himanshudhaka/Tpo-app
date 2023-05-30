import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  form = this.fb.group({
    password: [],
    confirm: [],
  });
  get f() {
    return this.form.controls;
  }
  constructor(public authService: AuthServiceService, public fb: FormBuilder) {}

  submit() {
    if (this.form.invalid) {
      console.log('Please provide all the required values!');
      return;
    }
    let { password, confirm } = this.form.value;
    if (password === confirm) {
      this.authService
        .updateUser({ password })
        .subscribe((data) => console.log(data));
    } else {
      console.log('Password not matching');
    }
  }
}
