import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientResponseModel} from './client-response.model';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {AddClientService} from '../bpm001/add-client.service';
import {Clients} from './clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client = new BehaviorSubject<Clients>(undefined);
  clientInfo: any;
  showClientHeader: boolean;

  constructor(private http: HttpClient, private addClientService: AddClientService) {
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
    console.log('კონკრეტული კლიენტი: ');
    return this.http.get<ClientResponseModel>(`clients?firstName=&lastName=&clientKey=${clientKey}`).pipe(
      catchError((err) => throwError(err.error)),
      tap((resp) => {
        console.log('this is resp: ', resp);
        this.clientHandler(resp);
      })
    );
  }

  clientHandler = (resData: ClientResponseModel) => {
    resData = resData[0];
    const client = new Clients(
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
