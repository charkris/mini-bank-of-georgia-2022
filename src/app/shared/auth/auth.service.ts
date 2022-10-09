import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {LoaderService} from '../loader/loader.service';
import {AuthResponseModel} from './auth-response.model';
import {catchError, tap} from 'rxjs/operators';
import {ClientService} from '../identify/client.service';
import {AlertService} from '../alert-error/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(undefined);
  isLoggedIn = !!localStorage.getItem('userData');
  private timer: any;

  constructor(private http: HttpClient,
              private loaderService: LoaderService,
              private router: Router,
              private clientService: ClientService,
              private alertService: AlertService) {
  }

  registerUser(name, username, password) {
    this.isLoggedIn = true;
    return this.http.post<AuthResponseModel>('register', {
      name,
      username,
      password,
    }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(this.alertService.loggedError.next(err.error)),
      ),
      tap((resData) => this.authHandler(resData)),
    );
  }

  login(username, password) {
    this.isLoggedIn = true;
    return this.http.post<AuthResponseModel>('login', {
      username, password
    }).pipe(
      this.loaderService.useLoader,
      catchError((err) =>
        throwError(this.alertService.loggedError.next(err.error)),
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
    this.clientService.isIdentified = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = undefined;
  }

  autoLogout(expDate: number) {
    this.timer = setTimeout(
      () => this.logout(), Math.min(1800000, expDate)
    );
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
    this.autoLogout(resData.expirationDate - new Date().getTime());
  };

}
