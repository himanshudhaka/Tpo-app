import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ClgAuthService } from '../services/clg-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClgGuardGuard implements CanActivate {
  constructor(private authService: ClgAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedin) {
      console.log('hello');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
