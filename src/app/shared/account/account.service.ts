import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {AccountResponseModel} from './account-response.model';
import {Injectable} from '@angular/core';
import {LoaderService} from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  showAcctList = new Subject();
  acctList: Array<AccountResponseModel>;

  constructor(private http: HttpClient,
              private loaderService: LoaderService) {
  }

  getAccounts(clientKey) {
    return this.http.get<AccountResponseModel[]>(
      `accounts?clientKey=${clientKey}`).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
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
