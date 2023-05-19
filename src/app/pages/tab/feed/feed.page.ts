import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { JobsService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  jobs: any[];
  user: any;
  constructor(private jobService: JobsService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.jobService
      .getJobForS(this.user.collegeId)
      .pipe(first())
      .subscribe((data) => {
        this.jobs = data;
        console.log(this.jobs);
      });
  }
}
