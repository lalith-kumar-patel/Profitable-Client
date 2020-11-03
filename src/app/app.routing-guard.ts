import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProfitableGoalsRoutingGuard implements CanActivate{

  constructor(private route: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const userType = sessionStorage.getItem('userType');
    let toRet = false;
    if (userType != null) {
      if (sessionStorage.getItem('customer') != null) {
        toRet = true;
      } else if (sessionStorage.getItem('seller') != null) {
        toRet = true;
      }
    }

    if (toRet) {
      return toRet;
    } else {
      this.route.navigate(['error']);
      return toRet;
    }
  }
}
