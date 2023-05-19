import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  type: string;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {
    this.type = this.route.snapshot.queryParams['type'];
    // console.log(this.type);

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

      // console.log(this.type);
      // this.authService.login();
      // return false;
    } else {
      const { email, password } = this.ionicForm.value;
      this.authService
        .login(email, password, this.type)
        .pipe(first())
        .subscribe({
          next: (data) => {
            if (this.type === 'company') {
              this.router.navigate(['/com-tab']);
            } else if (this.type === 'student') {
              this.router.navigate(['/tab']);
            } else if (this.type === 'college') {
              this.router.navigate(['/clg-tab']);
            }
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
