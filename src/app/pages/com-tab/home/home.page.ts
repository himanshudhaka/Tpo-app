import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/jobs';
import { JobsService } from 'src/app/services/jobs.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  jobs: Job[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    // this.jobs = [];
    this.jobsService
      .getJobs()
      .pipe(first())
      .subscribe((data) => {
        this.jobs = data;
        console.log(this.jobs);
      });
  }
}
