import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../_models/jobs';
@Injectable({
  providedIn: 'root',
})
export class JobsService {
  job: Job[] = [];
  apiUrl: string = 'http://localhost:3000';
  data: any;
  constructor(private http: HttpClient) {
    this.data = JSON.parse(localStorage.getItem('currentUser'));
  }

  getJobs() {
    return this.http.get<Job[]>(
      `${this.apiUrl}/companies/${this.data.id}/jobs`
    );
  }

  postJobs(newJob: any) {
    let companyId = this.data.id;
    newJob = {
      companyId,
      ...newJob,
    };
    return this.http.post(`${this.apiUrl}/jobs`, newJob);
  }

  // Getting jobs for students

  getJobForS(id: number) {
    return this.http.get<any>(`${this.apiUrl}/student/${id}/jobs`);
  }

  getStudentForClg(id: number) {
    return this.http.get<any>(`${this.apiUrl}/colleges/${id}/students`);
  }
}
