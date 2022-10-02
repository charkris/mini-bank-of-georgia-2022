import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const BASE_API = 'https://bog-angular-course-api.herokuapp.com/';

// https://bog-angular-course-api.herokuapp.com/clients?firstName=&lastName=&clientKey=

export class UrlInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
        url: BASE_API + req.url
      }
    ));
  }

}
