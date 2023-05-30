import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { first } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  user: any;
  ionicForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public toastCtrl: ToastController,
    public router: Router
  ) {
    this.ionicForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    if (this.user.type === 'company') {
      this.ionicForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      });
    } else if (this.user.type === 'college') {
      this.ionicForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        aicte_id: ['', [Validators.required]],
      });
    } else if (this.user.type === 'student') {
      this.ionicForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        rollNo: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        branch: ['', [Validators.required]],
        tenthGrade: ['', [Validators.required]],
        twelveGrade: ['', [Validators.required]],
        clgAcademics: ['', [Validators.required]],
      });
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm(): void {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
    } else {
      console.log(this.user);
      this.authService
        .details(this.ionicForm.value, {
          type: this.user.type,
          id: this.user.id,
        })
        .pipe(first())
        .subscribe({
          next: (data) => {
            console.log(data);
            localStorage.removeItem('currentUser');
            this.router.navigate(['/com-tab']);
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
  // submitForm(): void {
  //   this.isSubmitted = true;
  //   if (!this.ionicForm.valid) {
  //     console.log('Please provide all the required values!');

  //     // console.log(this.type);
  //     // this.authService.login();
  //     // return false;
  //   } else {
  //     const { email, password } = this.ionicForm.value;
  //     this.authService
  //       .login(email, password, this.type)
  //       .pipe(first())
  //       .subscribe({
  //         next: (data) => {
  //           if (!data.phone) {
  //             console.log(data.phone);
  //             this.router.navigate(['/details']);
  //           } else if (this.type === 'company') {
  //             this.router.navigate(['/com-tab']);
  //           } else if (this.type === 'student') {
  //             this.router.navigate(['/tab']);
  //           } else if (this.type === 'college') {
  //             this.router.navigate(['/clg-tab']);
  //           }
  //         },
  //         error: (err) => {
  //           console.log(err);
  //           this.toastCtrl
  //             .create({
  //               message: err.error.message,
  //               duration: 2000,
  //               color: 'danger',
  //             })
  //             .then((toast) => toast.present());
  //         },
  //       });
  //   }
  // }
}
