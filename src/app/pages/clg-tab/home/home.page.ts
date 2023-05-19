import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  jobs: any[];
  constructor(private jobService: JobsService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.jobService
      .getJobForS(this.user.id)
      .pipe(first())
      .subscribe((data) => {
        this.jobs = data;
      });
  }
}
