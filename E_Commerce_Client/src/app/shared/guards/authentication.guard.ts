import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {

  constructor(private loginService: LoginService, private router: Router) { }

  canLoad(): boolean {
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token'))
      return true;
    else {
      this.router.navigate(['user/'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } })
      return false;
    }
  }
}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }