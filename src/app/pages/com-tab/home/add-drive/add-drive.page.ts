import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-drive',
  templateUrl: './add-drive.page.html',
  styleUrls: ['./add-drive.page.scss'],
})
export class AddDrivePage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder) {
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
      return false;
    } else {
      console.log(this.ionicForm.value);
      return true;
    }
  }
}
