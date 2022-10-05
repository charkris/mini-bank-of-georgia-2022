import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../../../../shared/loader/loader.service';
import {Router} from '@angular/router';
import {ClientService} from '../../../../shared/identify/client.service';

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
    const firstName = this.get('firstName').value;
    const lastName = this.get('lastName').value;
    const clientKey = this.get('clientKey').value;
    this.clientService.fetchClients(firstName, lastName, clientKey).subscribe(client => {
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
        this.clientService.clientInfo = client;
        // console.log('client from service', this.clientService.clientInfo);
        this.router.navigate(['krn/krnicp']);
        this.clientService.showClientHeader = true;
        // console.log('service clientHeader: ', this.clientService.showClientHeader);
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
}
