import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
// import { AuthServiceService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  jobs: any[];
  job: any;
  companies: [];
  // yes: boolean = true;
  user$ = this.authService.user;
  isModalOpen = false;

  // applied: boolean = false;
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authService
      .getJobForStudent()
      .pipe(first())
      .subscribe((data) => {
        if (this.user$.approved === false) {
          // this.yes = false;
          this.jobs = [];
        } else {
          this.jobs = data;
          // this.yes = true;
          this.jobs.forEach((job) => (job.applied = false));
          console.log(this.jobs);
        }
      });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.authService
        .getJobForStudent()
        .pipe(first())
        .subscribe((data) => {
          if (this.user$.approved === false) {
            // this.yes = true;
            this.jobs = [];
          } else {
            this.jobs = data;
            // this.yes = false;
            // console.log(this.yes);
            this.jobs.forEach((job) => (job.applied = false));
            console.log(this.jobs);
          }
        });
      event.target.complete();
    }, 2000);
  }
  onClick(job: any) {
    this.authService
      .apply(job.id)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
      })
      .add(() => {
        job.applied = true;
      });
  }

  setOpen(job) {
    this.isModalOpen = true;
    this.job = job;
  }
}
