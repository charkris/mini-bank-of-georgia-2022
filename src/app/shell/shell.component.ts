import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ClientService} from '../shared/identify/client.service';

@Component({
  selector: 'bg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  showFlag: boolean;
  clientInfo: {
    image: string,
    clientKey: number,
    lastName: string,
    plusPoints: number,
    firstName: string,
    sumAmount: number
  };
  clientSubs: Subscription;
  clientInfoSubs: Subscription;

  get curDate() {
    const d = new Date();
    return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  }

  constructor(public clientService: ClientService) {
  }

  ngOnInit(): void {
    // this.authFlag();
    // this.clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
    // console.log(this.clientInfo)
  }

  // authFlag() {
  //   this.clientSubs = this.clientService.isIdentified.subscribe(
  //     (resp) => {
  //       console.log('response', resp);
  //       console.log('showFlag before:', this.showFlag);
  //       resp ? this.showFlag = resp : this.showFlag = !!localStorage.getItem('clientInfo');
  //       console.log('showFlag after', this.showFlag);
  //     }
  //   );
// }


  ngOnDestroy() {

  }
}
