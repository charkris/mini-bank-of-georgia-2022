import {Component, OnInit} from '@angular/core';
import {AuthResponseModel} from '../../../../shared/auth/auth-response.model';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../../../../shared/loader/loader.service';
import {ClientService} from './client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {

  searchForm: FormGroup;
  clientsArr = [];
  showFlag = false;

  constructor(private http: HttpClient,
              private loaderService: LoaderService,
              private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  searchClient() {
    // console.log('client search works');
    const firstName = this.get('firstName').value;
    const lastName = this.get('lastName').value;
    const clientKey = this.get('clientKey').value;
    // console.log(firstName, lastName, clientKey);
    this.clientService.fetchClients(firstName, lastName, clientKey).subscribe(client => {
      // console.log(client);
      this.clientsArr = client;
      this.showFlag = true;
      // console.log('clientsArr', this.clientsArr);
      client.map(info => {
        // console.log(info);
        // this.clientsArr = info;
        // console.log(this.clientsArr);
      });
    });
  }

  goToRegister() {
    this.router.navigate(['/bpm/bpm001']);
  }

  goToClientHeader() {
    this.router.navigate(['krn/krnicp'])
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
}
