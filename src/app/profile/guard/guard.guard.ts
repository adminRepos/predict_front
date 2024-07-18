import { GuardHttpService } from './../services/guard-http.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private guardHttp:GuardHttpService,private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    // return this.guardHttp.token_validation().pipe(
    //   map((res:any)=>{

    //     console.log(res)

    //     if(!res['valid']) this.router.navigateByUrl('/login')

    //     return res['valid']
    //     // return true

    //   }),
    //   catchError(()=>{

    //     this.router.navigateByUrl('/login');
    //     return of(false)

    //   })
    // )
    return true
  }

}
