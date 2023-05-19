import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { JobsService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-add-drive',
  templateUrl: './add-drive.page.html',
  styleUrls: ['./add-drive.page.scss'],
})
export class AddDrivePage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(
    public formBuilder: FormBuilder,
    private jobService: JobsService,
    private router: Router
  ) {
    this.ionicForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      post: [],
      description: [],
      salary: [],
      criteria: [],
      process: [],
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
      let newJob = this.ionicForm.value;
      let collegeId = 3;
      newJob = {
        collegeId,
        ...newJob,
      };
      this.jobService
        .postJobs(newJob)
        .pipe(first())
        .subscribe((data) => {
          this.router.navigate(['com-tab/home']);
        });
    }
  }
}
