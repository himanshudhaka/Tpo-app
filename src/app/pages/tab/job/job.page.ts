import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  jobs: any[];
  user$ = this.authService.user$;
  isModalOpen = false;
  job: any;
  constructor(public authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.appliedJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.authService.appliedJobs().subscribe((jobs) => {
        console.log(jobs);
        this.jobs = jobs;
      });
      event.target.complete();
    }, 2000);
  }

  setOpen(job) {
    this.isModalOpen = true;
    this.job = job;
  }
}
