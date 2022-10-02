import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientModel} from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  fetchClients(fname, lname, clientKey) {
    !fname ? fname = '' : fname = fname;
    !lname ? lname = '' : lname = lname;
    !clientKey ? clientKey = '' : clientKey = clientKey;
    return this.http.get<ClientModel[]>(`clients?firstName=${fname}&lastName=${lname}&clientKey=${clientKey}`);
  }
}
