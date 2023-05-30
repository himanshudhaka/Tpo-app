import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  jobs: any[];
  job: any;
  isModalOpen = false;
  applicants: any[];
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authService
      .getJobsForCollege()
      .pipe(first())
      .subscribe((data) => {
        this.jobs = data;
        console.log(this.jobs);
      });
  }

  setOpen(job) {
    this.isModalOpen = true;
    this.job = job;
    this.authService.getApplicants(job.id).subscribe((users) => {
      this.applicants = users;
      console.log(this.applicants);
    });
  }
}
