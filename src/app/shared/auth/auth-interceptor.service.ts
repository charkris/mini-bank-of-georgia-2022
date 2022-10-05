import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const newReq = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + user.token),
        });
        return next.handle(newReq);
      })
    );
  }
}
