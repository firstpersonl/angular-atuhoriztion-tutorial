import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ROLE } from '../utils/biz-constant';

@Injectable({
  providedIn: 'root'
})
export class RouterCanActiveFilterService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const user = this.auth.user;

    if(user) {
      const rules = Array.from<ROLE>(route.data.roles);
      for(let role of rules) {
        if(user.roles.indexOf(role) === -1) {
          // user not authorization.
          this.router.navigate(['home']);
          return false;
        }
      }
      return true
    }
    this.router.navigate(['login']);
    return false;
  }
}
