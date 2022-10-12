import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../../../../shared/loader/loader.service';
import {Router} from '@angular/router';
import {ClientService} from '../../../../shared/identify/client.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit, OnDestroy {

  searchForm: FormGroup;
  clientsArr = [];
  showFlag = false;
  clientSub: Subscription;

  constructor(private http: HttpClient,
              private loaderService: LoaderService,
              private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  searchClient() {
    const firstName = this.get('firstName').value;
    const lastName = this.get('lastName').value;
    const clientKey = this.get('clientKey').value;
    this.clientSub = this.clientService.fetchClients(firstName, lastName, clientKey)
      .subscribe(client => {
        this.clientsArr = client;
        this.showFlag = true;
      });
  }

  goToRegister() {
    this.router.navigate(['/bpm/bpm001']);
  }

  goToClientHeader(clientKey) {
    this.clientService.getAuthorizedClientInfo(clientKey).subscribe(
      client => {
        this.clientService.clientInfo = client[0];
        this.clientService.isIdentified = true;
        this.router.navigate(['/krn/krnicp']);
      }
    );
  }

  get(controlName) {
    return this.searchForm.get(controlName);
  }

  initForm() {
    this.searchForm = new FormGroup({
        firstName: new FormControl(undefined),
        lastName: new FormControl(undefined),
        clientKey: new FormControl(undefined)
      }
    );
  }

  ngOnDestroy() {
    this.clientSub?.unsubscribe();
  }

}
