import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  user: User;
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.tokenStorageService.getUser();
    if (currentUser === null) {
      this.router.navigateByUrl('/login');
    }
    const userRoles = currentUser.roles;
    if (currentUser) {
      for (const roleIndex in userRoles) {
        // tslint:disable-next-line:triple-equals
        if (route.data.roles == roleIndex) {
          console.log(roleIndex);
          return true;
        }
      }
      this.router.navigateByUrl('/');
      console.log(userRoles);
      return false;
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigateByUrl('/login-admin');
    // return false;
  }
}
