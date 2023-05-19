import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  user: any;
  students: any[];
  constructor(private jobService: JobsService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.jobService
      .getStudentForClg(this.user.id)
      .pipe(first())
      .subscribe((data) => {
        this.students = data;
        console.log(this.students);
      });
  }
}
