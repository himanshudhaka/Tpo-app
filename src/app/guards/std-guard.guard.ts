import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StdAuthService } from '../services/std-auth.service';

@Injectable({
  providedIn: 'root',
})
export class StdGuardGuard implements CanActivate {
  constructor(private authService: StdAuthService, private router: Router) {}
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
