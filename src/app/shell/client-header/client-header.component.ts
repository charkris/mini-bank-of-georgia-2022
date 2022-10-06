import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../shared/identify/client.service';

@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {

  showFlag: boolean;
  clientKey: number;
  clientInfo: any;

  constructor(private router: Router, private clientService: ClientService) {
    // console.log(this.clientInfo.clientKey);
    this.clientService.client.subscribe(resp => {
      console.log('constr resp:', resp);
    });
  }

  ngOnInit(): void {
    // JSON.parse(localStorage.getItem('clientInfo'));
    console.log('my subj: ', this.clientService.client.value);
    this.clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
    // this.clientService.client.value;

    // this.clientService.fetchClients(this.clientInfo.firstName, this.clientInfo.lastName, this.clientInfo.clientKey).subscribe(
    //  resp => {
    //    console.log(resp);
    //  });
    if (this.clientInfo) {
      this.showFlag = this.showContent();
    }
    // console.log('my show flag: ', this.showFlag);
  }

  endSession() {
    localStorage.removeItem('clientInfo');
    this.router.navigate(['bpm/bpm000']);
    this.showFlag = false;
  }

  showContent() {
    this.showFlag = true;
    if (!this.clientService.showClientHeader) {
      this.showFlag = false;
    }
    return this.showFlag;
  }


}
