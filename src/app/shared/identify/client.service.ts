import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ClientResponseModel} from './client-response.model';
import {Client} from './client.model';
import {LoaderService} from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client = new BehaviorSubject<Client>(undefined);
  clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
  isIdentified = !!localStorage.getItem('clientInfo');

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  fetchClients(fname, lname, clientKey) {
    !fname ? fname = '' : fname = fname;
    !lname ? lname = '' : lname = lname;
    !clientKey ? clientKey = '' : clientKey = clientKey;
    return this.http.get<ClientResponseModel[]>(
      `clients?firstName=${fname}&lastName=${lname}&clientKey=${clientKey}`).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
      // tap((resp) => this.clientHandler(resp))
    );
  }

  getAuthorizedClientInfo(clientKey) {
    return this.http.get<ClientResponseModel>(
      `clients?firstName=&lastName=&clientKey=${clientKey}`).pipe(
      catchError((err) => throwError(err.error)),
      tap((resp) => {
        this.clientHandler(resp);
      })
    );
  }

  addClient(firstName, lastName, plusPoints) {
    return this.http.put<ClientResponseModel>('clients', {
      firstName, lastName, plusPoints
    }).pipe(
      this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
      tap((resData) => {
        this.clientHandler(resData);
        // this.clientInfo = resData;
      }),
    );
  }

  clientHandler = (resData: ClientResponseModel) => {
    if (resData[0]) {
      resData = resData[0];
    }
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
