import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Company } from 'src/app/_models/company';
import { first } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  company: Company;
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService
      .getById()
      .pipe(first())
      .subscribe((company) => {
        // console.log(company);
        this.company = company;
      });
  }
  onClick() {
    // console.log('hi');
    this.authService.logout();
  }
}
