import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { MyToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAlreadyLoggedinGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: MyToastrService
    ) { }

  showError(msg:string) {
    this.toastr.showError(msg, 'Error!');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in
    return this.auth.status().pipe(
      map((loggedIn: boolean) => {
        if (loggedIn) {
          
          this.showError('You Are Already Logged In!');
          // If logged in, redirect to a different route (e.g., home)
          return this.router.createUrlTree(['/dashboard']);
        }
        // If not logged in, allow access to the login page
        return true;
      })
    );
  }
}
