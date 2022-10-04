import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AccountResponseModel} from './account-response.model';
import {Injectable} from '@angular/core';
import {Account} from './account.model';
import {ClientResponseModel} from '../identify/client-response.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) {

  }

  getAccounts(clientKey) {
    return this.http.get<AccountResponseModel[]>(`accounts?clientKey=${clientKey}`).pipe(
      catchError((err) => throwError(err.error)),
      // tap((resp) => this.clientHandler(resp))
    );
  }

  closeAccount(accountKey) {
    return this.http.delete(`accounts?accountKey=${accountKey}`).pipe(
      catchError((err) => throwError(err.error)),
    );
  }

  // open account
  openAccount(clientKey, accountName, amount) {
    return this.http.put<AccountResponseModel>('accounts', {
      clientKey, accountName, amount
    }).pipe(
      catchError(err => throwError(err.error()),
        //   tap(resp => console.log(resp))
      )
    );
  }


}
