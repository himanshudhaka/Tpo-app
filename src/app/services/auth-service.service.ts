import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, type: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password, type }, httpOptions)
      .pipe(
        tap((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          // let data = JSON.parse(localStorage.getItem('currentUser'));
          // console.log(data.id);
          // let data = JSON.parse(localStorage.getItem('currentUser') || 'hello');
          // console.log(data);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  getById() {
    let data = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(data.id);
    return this.http.get<Company>(`${this.apiUrl}/companies/${data.id}`);
  }
}
