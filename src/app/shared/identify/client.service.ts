import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ClientResponseModel} from './client-response.model';
import {Client} from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client = new BehaviorSubject<Client>(undefined);
  showClientHeader: boolean;
  clientInfo: any;

  constructor(private http: HttpClient) {
  }

  fetchClients(fname, lname, clientKey) {
    !fname ? fname = '' : fname = fname;
    !lname ? lname = '' : lname = lname;
    !clientKey ? clientKey = '' : clientKey = clientKey;
    return this.http.get<ClientResponseModel[]>(`clients?firstName=${fname}&lastName=${lname}&clientKey=${clientKey}`).pipe(
      catchError((err) => throwError(err.error)),
      // tap((resp) => this.clientHandler(resp))
    );
  }

  getAuthorizedClientInfo(clientKey) {
    return this.http.get<ClientResponseModel>(`clients?firstName=&lastName=&clientKey=${clientKey}`).pipe(
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
      // this.loaderService.useLoader,
      catchError((err) => throwError(err.error)),
      tap((resData) => this.clientHandler(resData))
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
