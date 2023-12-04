import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from '@angular/common';
import { tap,catchError,BehaviorSubject, from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { APIResponses } from '../models/APIResponses';
import { environment } from '../environments/env';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isLoggedIn.asObservable();
  private url = environment.backendBaseUrl+'/auth'
  private loggedInUser = new BehaviorSubject<User | boolean>(false);
  public loggedInUser$ = this.loggedInUser.asObservable();

  httpOptions:{ headers: HttpHeaders} = {
    headers: new HttpHeaders({
      "Content-Type":"application/json",
      "Cache-Control":"no-cache",
      "Accept":"application/vnd.api+json",
    })
  }
  private boundary = '-------------------------' + new Date().getTime().toString(16);
  registerHttpOptions:{ headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary='+this.boundary,
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private location: Location
    ) { }

  toggleLogin(state: boolean, userData: User|null): void {
    this.isLoggedIn.next(state);
    sessionStorage.setItem('isLoggedIn', state ? 'true' : 'false');
  
    // Store user data in sessionStorage
    if (state && userData) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    } else {
      sessionStorage.removeItem('userData');
    }
    if(userData) {
      this.loggedInUser.next(userData);
    }
    
  }
  

  //to get the login status of user
  status(): Observable<boolean> {
    const storedValue = sessionStorage.getItem('isLoggedIn');
    const isAuthenticated = storedValue ? JSON.parse(storedValue) : false;
  
    if (isAuthenticated) {
      const userDataString = sessionStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      this.loggedInUser = userData;
    }
  
    return of(isAuthenticated);
  }

  login(formData: FormData) {
    return this.http.post<APIResponses<User>>(this.url+'/login', formData, this.httpOptions).pipe(
      tap((data: APIResponses<User>) => {
        this.loggedInUser.next(data.data);
        this.toggleLogin(true, data.data);
        this.router.navigate(['dashboard']);
      }),
      catchError((error): Observable<never> => {
        return this.errorHandlerService.handleHttpError(error);
      })
    );
  }

  user(): User {
    const storedUser = sessionStorage.getItem('userData');
    if(storedUser) {
      return JSON.parse(storedUser);
    } else {
      throw new Error("No logged-in user");
    }
  }

  getUser():Observable<APIResponses<User>> {
    return this.http.get<APIResponses<User>>(this.url+'/user').pipe(
      tap((user:APIResponses<User>)=> {
        this.loggedInUser.next(user.data);
        this.toggleLogin(true, user.data);
      }),
      catchError((error):Observable<never>=> {
        return this.errorHandlerService.handleHttpError(error)
      })
    );
  }

  // logout
  logout(allDevice: boolean) {
    return this.http.post(this.url+'/logout', { allDevice: allDevice }, { withCredentials: true }).pipe(
      tap(() => {
        this.toggleLogin(false, null);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userData');
        this.loggedInUser.next(false);
        this.router.navigate(['auth/login']);
      }),
      catchError((error): Observable<never> => {
        this.router.navigate(['dashboard']);
        return this.errorHandlerService.handleHttpError(error);
      })
    );
  }

  // register
  register(formData: FormData): Observable<APIResponses<User>> {
    return this.http.post<APIResponses<User>>(this.url+'/register', formData).pipe(
      tap((data: APIResponses<User>) => {
        this.loggedInUser.next(data.data);
        this.toggleLogin(true, data.data);
        this.router.navigate(['dashboard']);
      }),
      catchError((error): Observable<never> => {
        return this.errorHandlerService.handleRegistrationError(error);
      })
    );
  }

  // forgot password
  forgot(email:string){
    return this.http.post(this.url+'/forgot-password', {email:email}).pipe(
      catchError((error):Observable<never>=> {
        return this.errorHandlerService.handleHttpError(error)
      })
    );
  }

  // reset password
  reset( password:string,password_confirmation:string){
    const data={
      password:password,
      password_confirmation:password_confirmation
    }
    return this.http.post(this.url+'/reset', data).pipe(
      catchError((error):Observable<never>=> {
        return this.errorHandlerService.handleHttpError(error)
      })
    );
  }

}