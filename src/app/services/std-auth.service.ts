import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StdAuthService {
  isLoggedin: boolean = false;

  constructor() {}

  login(): boolean {
    this.isLoggedin = true;
    console.log('hello');
    return true;
  }

  logout() {
    this.isLoggedin = false;
    console.log(this.isLoggedin);
  }
}
