import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../shared/identify/client.service';

@Component({
  selector: 'bg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  showFlag: boolean;
  clientKey: number;
  clientInfo: any;

  get curDate() {
    const d = new Date();
    return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  }

  constructor(private router: Router, private clientService: ClientService) {
    // console.log(this.clientInfo.clientKey);
    this.clientService.client.subscribe(resp => {
      console.log('constr resp:', resp);
    });
  }

  ngOnInit(): void {
    // JSON.parse(localStorage.getItem('clientInfo'));
    console.log('my subj: ', this.clientService.client.value);
    this.clientInfo = this.clientService.client.value;

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
