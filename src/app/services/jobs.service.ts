import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../_models/jobs';
@Injectable({
  providedIn: 'root',
})
export class JobsService {
  job: Job[] = [];
  apiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getJobs() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(data.id);
    // console.log(data);
    return this.http.get<Job[]>(`${this.apiUrl}/companies/${data.id}/jobs`);
    // console.log(d);
    // return d;
  }
}
