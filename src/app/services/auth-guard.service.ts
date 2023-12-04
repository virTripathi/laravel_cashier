import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private auth: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
     ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.auth.status().pipe(take(1),map((loggedIn:boolean)=>{
    console.log(loggedIn);
    
     if(loggedIn){
       return true;
     }else{
      
      this.errorHandlerService.showError('Access Denied: Please Login First!');
      return this.router.createUrlTree(['/auth/login']);
     }
   }));
  }
}
