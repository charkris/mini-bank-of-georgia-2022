import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from './modules/bpm/bpm000/client.service';
import {isBooleanLiteralLike} from 'codelyzer/util/utils';
import {AddClientService} from './modules/bpm/bpm001/add-client.service';

@Component({
  selector: 'bg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  showFlag: boolean;
  clientKey: number;

  get curDate() {
    const d = new Date();
    return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  }

  constructor(private router: Router, private clientService: ClientService, private addClientService: AddClientService) {

  }

  ngOnInit(): void {
    // this.clientService.getAuthorizedClient(this.clientKey);
    this.showFlag = this.showContent();
    // console.log('my show flag: ', this.showFlag);
    console.log(this.addClientService.client);
  }

  endSession() {
    // console.log('aaaaaaa');
    this.router.navigate(['bpm/bpm000']);
    this.clientService.showClientHeader = false;
    this.addClientService.showClientHeader = false;
  }

  showContent() {
    this.showFlag = true;
    if (! (this.clientService.showClientHeader || this.addClientService.showClientHeader)) {
      // console.log('clientSer: ', this.clientService.showClientHeader);
      // console.log('addClientSer: ', this.addClientService.showClientHeader);
      this.showFlag = false;
    }
    return this.showFlag;
  }



}
