import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    private router: Router
  ) {
    this.ionicForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm(): void {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      // this.authService.login();
      // return false;
    } else {
      console.log(this.ionicForm.value);
      const { email, password } = this.ionicForm.value;
      this.authService
        .login(email, password, 'company')
        .pipe(first())
        .subscribe((data) => {
          this.router.navigate(['/com-tab']);
        });
    }
  }
}
