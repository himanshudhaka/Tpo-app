import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
  });
  get f() {
    return this.form.controls;
  }

  user$ = this.authService.user$.pipe(
    tap((user) => {
      this.form.patchValue(user);
    })
  );

  constructor(public fb: FormBuilder, public authService: AuthServiceService) {}

  submit() {
    if (this.form.invalid) {
      console.log('Please provide all the required values!');
      return;
    }
    console.log(this.form.value);
    this.authService
      .updateUser(this.form.value)
      .subscribe((data) => console.log(data));
  }
}
