import {ApplicationInitStatus, Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {LoaderService} from '../loader/loader.service';
import {AuthResponseModel} from './auth-response.model';
import {catchError, tap} from 'rxjs/operators';
import {error} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(undefined);
  loggedError = new BehaviorSubject<string>(undefined);
  isLoggedIn = !!localStorage.getItem('userData');
  private timer: any;

  constructor(private http: HttpClient, private loaderService: LoaderService, private router: Router) {
  }

  registerUser(name, username, password) {
    this.isLoggedIn = true;
    return this.http.post<AuthResponseModel>('register', {
      name,
      username,
      password,
    }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
      tap((resData) => this.authHandler(resData))
    );
  }

  login(username, password) {
    this.isLoggedIn = true;
    return this.http.post<AuthResponseModel>('login', {
      username, password
    }).pipe(
      this.loaderService.useLoader,
      catchError((err) =>
        throwError(this.loggedError.next(err.error)),
      ),
      tap((resData) => this.authHandler(resData))
    );
  }

  logout() {
    this.isLoggedIn = false;
    this.user.next(undefined);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    localStorage.removeItem('clientInfo');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
  }

  autoLogout(expDate) {
    this.timer = setTimeout(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    }, expDate);
    // ng on destroy-ში , წესით არაა ეს ფუნქცია საჭირო
  }

  authHandler = (resData: AuthResponseModel) => {
    const user = new User(
      resData.token,
      new Date(resData.expirationDate),
      resData.name,
      resData.username,
      resData.image,
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    // auto logout
  };

}
