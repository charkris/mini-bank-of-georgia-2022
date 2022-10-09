import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {AccountResponseModel} from './account-response.model';
import {Injectable} from '@angular/core';
import {LoaderService} from '../loader/loader.service';
import {AlertService} from '../alert-error/alert.service';
import {AuthResponseModel} from '../auth/auth-response.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  showAcctList = new Subject();
  acctList: Array<AccountResponseModel>;

  constructor(private http: HttpClient,
              private loaderService: LoaderService,
              private alertService: AlertService) {
  }

  getAccounts(clientKey) {
    return this.http.get<AccountResponseModel[]>(
      `accounts?clientKey=${clientKey}`).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
      // tap((resp) => this.clientHandler(resp))
    );
  }

  getAllAccounts() {
    return this.http.get<AccountResponseModel[]>('accounts').pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error())
      )
    );
  }

  closeAccount(accountKey) {
    return this.http.delete(
      `accounts?accountKey=${accountKey}`).pipe(
      catchError((err) => throwError(err.error)),
    );
  }

  openAccount(clientKey, accountName, amount) {
    return this.http.put<AccountResponseModel>('accounts', {
      clientKey, accountName, amount
    }).pipe(
      this.loaderService.useLoader,
      catchError(err => throwError(err.error),
        //   tap(resp => console.log(resp))
      )
    );
  }

  transferMoney(senderAccountKey, receiverAccountKey, amount) {
    return this.http.post('transfer', {
      senderAccountKey, receiverAccountKey, amount
    }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
    );
  }


}
