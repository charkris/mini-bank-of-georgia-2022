import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientModel} from '../bpm000/client.model';
import {AddClientModel} from './add-client.model';
import {AuthResponseModel} from '../../../../shared/auth/auth-response.model';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  constructor(private http: HttpClient) { }

  addClient(firstName, lastName, plusPoints) {
    return this.http.put<AddClientModel>('clients', {
      firstName, lastName, plusPoints}).pipe(
        catchError((err) => throwError(err.error)),
        tap((resData) => console.log(resData))
      );
  }



}
