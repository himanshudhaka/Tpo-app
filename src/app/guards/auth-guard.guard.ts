import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.data['type']);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.type === route.data['type']) return true;
    this.router.navigate(['/home']);
    return false;
  }
}
// , { queryParams: { returnUrl: state.url } }
