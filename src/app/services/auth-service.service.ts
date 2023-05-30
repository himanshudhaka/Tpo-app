import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Company } from '../_models/company';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  apiUrl: string = 'http://localhost:3000';
  userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  get user() {
    return this.userSubject.value;
  }

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('currentUser')) {
      this.userSubject.next(JSON.parse(localStorage.getItem('currentUser')));
    }
  }

  login(email: string, password: string, type: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password, type }, httpOptions)
      .pipe(
        tap((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
          }
        })
      );
  }

  signup(user: any, type: any) {
    console.log(user);
    return this.http.post<any>(`${this.apiUrl}/signup`, user, {
      params: {
        type: type,
      },
    });
  }

  details(user: any, data: any) {
    if (data.type === 'company') {
      return this.http.put<any>(`${this.apiUrl}/companies/${data.id}`, user);
    } else if (data.type === 'college') {
      return this.http.put<any>(`${this.apiUrl}/colleges/${data.id}`, user);
    } else {
      return this.http.put<any>(`${this.apiUrl}/student/${data.id}`, user);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  updateUser(user: any) {
    console.log(this.user.type);
    if (this.user.type === 'company') {
      return this.http
        .put<any>(`${this.apiUrl}/companies/${this.user.id}`, user)
        .pipe(
          tap((user) => {
            user.type = this.user.type;
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
          })
        );
    } else if (this.user.type === 'college') {
      return this.http
        .put<any>(`${this.apiUrl}/colleges/${this.user.id}`, user)
        .pipe(
          tap((user) => {
            user.type = this.user.type;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
          })
        );
    } else {
      return this.http
        .put<any>(`${this.apiUrl}/student/${this.user.id}`, user)
        .pipe(
          tap((user) => {
            user.type = this.user.type;
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
          })
        );
    }
  }

  getById() {
    return this.http.get<Company>(`${this.apiUrl}/companies/${this.user.id}`);
  }

  getJobOfCom() {
    return this.http.get<any>(`${this.apiUrl}/companies/${this.user.id}/jobs`);
  }

  getColleges() {
    return this.http.get<any>(`${this.apiUrl}/colleges`);
  }

  getApplicants(id: number) {
    return this.http.get<any>(`${this.apiUrl}/companies/${id}/applicants`);
  }

  updateApplied(id: number, status: any) {
    return this.http.post<any>(`${this.apiUrl}/companies/${id}/status`, {
      status: status,
    });
  }

  deleteJob(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/jobs/${id}`);
  }
  // students and jobs for college

  getJobsForCollege() {
    return this.http.get<any>(`${this.apiUrl}/colleges/${this.user.id}/jobs`);
  }

  getStudentForClg() {
    return this.http.get<any>(
      `${this.apiUrl}/colleges/${this.user.id}/students`
    );
  }

  enableStudent(id: number, approved: boolean) {
    return this.http.put<any>(`${this.apiUrl}/student/${id}`, { approved });
  }

  // students

  getJobForStudent() {
    return this.http.get<any>(
      `${this.apiUrl}/student/${this.user.collegeId}/jobs/${this.user.id}`
    );
  }

  company() {}

  apply(id: number) {
    return this.http.post<any>(`${this.apiUrl}/jobs/apply`, {
      studentId: this.user.id,
      collegeId: this.user.collegeId,
      jobId: id,
    });
  }
  appliedJobs() {
    return this.http.get<any>(`${this.apiUrl}/student/${this.user.id}/applied`);
  }
}
