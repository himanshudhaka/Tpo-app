import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { first } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  loading = {
    init: true,
    toggleStudentStatus: false,
  };
  user: any;
  students: any[];
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authService
      .getStudentForClg()
      .pipe(first())
      .subscribe((data) => {
        this.students = data;
        console.log(this.students);
      })
      .add(() => {
        this.loading.init = false;
      });
  }

  toggleStudentStatus(student: any) {
    this.loading.toggleStudentStatus = true;
    this.authService
      .enableStudent(student.id, !student.approved)
      .subscribe(() => {
        student.approved = !student.approved;
      })
      .add(() => {
        this.loading.toggleStudentStatus = false;
      });
  }
}
