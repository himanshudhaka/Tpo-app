import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public toastCtrl: ToastController,
    public router: Router
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
      type: ['', [Validators.required]],
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
    } else {
      console.log('hello');
      let { email, password, type } = this.ionicForm.value;
      this.authService
        .signup({ email, password }, type)
        .pipe(first())
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
            this.toastCtrl
              .create({
                message: err.error.message,
                duration: 2000,
                color: 'danger',
              })
              .then((toast) => toast.present());
          },
        });
    }
  }
}
