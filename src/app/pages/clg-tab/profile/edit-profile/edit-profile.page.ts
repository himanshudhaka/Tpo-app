import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  form = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    name: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pincode: ['', Validators.required],
    phone: ['', Validators.required],
    aicte_id: ['', Validators.required],
  });
  get errorControl() {
    return this.form.controls;
  }
  isSubmitted = false;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthServiceService
  ) {}
  user$ = this.authService.user$.pipe(
    tap((user) => {
      this.form.patchValue(user);
    })
  );

  ngOnInit() {}

  submitForm() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      console.log('Please provide all the required values!');
      return;
    }
    console.log(this.form.value);

    console.log(this.form.value);
    this.authService
      .updateUser(this.form.value)
      .subscribe((data) => console.log(data));
  }
}
