import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.page.html',
  styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {
  jobs: any[];
  isModalOpen = false;
  job: any;
  applicants: any[];
  constructor(private authService: AuthServiceService) {}
  user$ = this.authService.user$;
  ngOnInit() {
    this.authService.getJobOfCom().subscribe((job) => {
      this.jobs = job;
      console.log(job);
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

  handleChange(e, id) {
    this.authService.updateApplied(id, e.detail.value).subscribe((data) => {
      console.log(data);
    });
  }
}
