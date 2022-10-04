import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddClientModel} from './add-client.model';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {Client} from './client.model';

@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  client = new BehaviorSubject<Client>(undefined);

  showClientHeader: boolean;

  constructor(private http: HttpClient) {
  }

  addClient(firstName, lastName, plusPoints) {
    return this.http.put<AddClientModel>('clients', {
      firstName, lastName, plusPoints
    }).pipe(
      // this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
      tap((resData) => this.clientHandler(resData))
    );
  }

  clientHandler = (resData: AddClientModel) => {
    const client = new Client(
      resData.firstName,
      resData.lastName,
      resData.image,
      resData.clientKey,
      resData.sumAmount,
      resData.plusPoints,
    );
    this.client.next(client);
    localStorage.setItem('clientInfo', JSON.stringify(client));
  };



}
