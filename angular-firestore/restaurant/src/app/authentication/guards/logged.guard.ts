import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor (public authService: AuthService, public router: Router) { }

  canActivate( route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.authState$.pipe(map(user => {

        if(user !== null){
          return true;
        }

        this.router.navigate(['/login']);

        return false;

      }));
  }
}
