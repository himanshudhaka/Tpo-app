import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/jobs';
import { JobsService } from 'src/app/services/jobs.service';
import { first } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  jobs: Job[] = [];
  user: any;
  constructor(readonly authService: AuthServiceService) {}
  user$ = this.authService.user;
  ngOnInit() {
    this.authService.getJobOfCom().subscribe((job) => {
      this.jobs = job;
    });
  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.authService.getJobOfCom().subscribe((job) => {
        this.jobs = job;
      });
      event.target.complete();
    }, 2000);
  }
  onClick(id: number) {
    this.authService.deleteJob(id).subscribe((job) => {
      console.log(job);
      this.jobs = this.jobs.filter((job) => job.id != id);
    });
  }
}
