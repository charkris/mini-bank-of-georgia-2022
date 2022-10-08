import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../shared/identify/client.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit, OnDestroy {

  clientKey: number;
  showFlag: boolean;
  clientSubs: Subscription;
  clientInfoSubs: Subscription;
  balance: any;
  isIdentified: boolean;
  clientInfo: any;
  asyncAmt: any;
  //   {
  //   image: string,
  //   clientKey: number,
  //   lastName: string,
  //   plusPoints: number,
  //   firstName: string,
  //   sumAmount: number
  // };

  constructor(private router: Router, public clientService: ClientService) {
    // console.log(this.clientInfo.clientKey);
    // this.clientService.client.subscribe(resp => {
    //   console.log('constr resp:', resp);
    //   // this.showFlag = !!resp;
    //   this.clientInfo = resp;
    // });
    // this.showFlag = !!localStorage.getItem('clientInfo');
    // console.log('on changes:', this.showFlag);
    //
    //
    // this.clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
    // console.log(this.clientInfo)
  }

  ngOnInit(): void {
    // this.asyncAmt = new Promise(resolve => {
    //   this.clientService.getAuthorizedClientInfo
    //   (JSON.parse(localStorage.getItem('clientInfo')).clientKey).subscribe(
    //     resp => {
    //       resolve(resp[0].sumAmount),
    //         console.log(resp[0])
    //     }
    //   );
    // });

    this.startSession();
    // this.authFlag();
    // console.log(JSON.parse(localStorage.getItem('clientInfo')).clientKey);

    // JSON.parse(localStorage.getItem('clientInfo'));
    // console.log('my subj: ', this.clientService.client.value);
    // this.clientSubs = this.clientService.isIdentified.subscribe(
    //   (resp) => {
    //     console.log('response', resp);
    //     console.log('show before:', this.showFlag);
    //     this.showFlag = resp;
    //     console.log('show after', this.showFlag);
    //   }
    // );
    // this.showFlag = !!localStorage.getItem('clientInfo');
    // this.clientSubs = this.clientService.client.subscribe(resp => {
    //   console.log('constr resp:', resp);
    //   // this.showFlag = !!resp;
    //   this.clientInfo = resp;
    // });
    // this.clientSubs = this.clientService.client.subscribe(
    //   resp => {
    //     console.log('oninit:');
    //     console.log(resp);
    //     this.clientInfo = resp;
    //     setTimeout(() => this.isIdentified = this.clientService.isIdentified);
    //   }
    // );
    // setTimeout(() => this.isIdentified = this.clientService.isIdentified);
    // this.clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    // this.clientSubs = this.clientService.getAuthorizedClientInfo(this.clientKey).subscribe(
    //   resp => {
    //     console.log('oninit:');
    //     console.log(resp[0]);
    //     this.clientInfo = resp[0];
    //     setTimeout(() => this.isIdentified = this.clientService.isIdentified);
    //   }
    // );
    // this.clientService.client.value;
  }

  startSession() {
    // this.clientKey = JSON.parse(localStorage.getItem('clientInfo')).clientKey;
    // console.log('from service', this.clientService.clientKey);
    // this.clientInfoSubs = this.clientService.client.subscribe(
    //   result => {
    //     console.log('before behavSubj:', this.clientInfo);
    //     this.clientInfo = result;
    //     console.log('after behavSubj:', this.clientInfo);
    //   }
    // );

    // this.clientService.getAuthorizedClientInfo(this.clientService.clientKey).subscribe(
    //   resp => {
    //     this.clientInfo = resp[0];
    //     console.log(this.clientInfo);
    //   }
    // );


    // this.clientSubs = this.clientService.isIdentified.subscribe(
    //   resp => this.showFlag = resp
    // );
  }


  endSession() {
    this.clientService.isIdentified = false;
    localStorage.removeItem('clientInfo');
    // console.log(this.showFlag);
    this.router.navigate(['bpm/bpm000']);
    // this.showFlag = false;
    // this.clientSubs = this.clientService.isIdentified.subscribe(
    //   resp => this.showFlag = resp
    // );
  }

  ngOnDestroy() {
    // this.clientSubs.unsubscribe();
    // this.clientInfoSubs.unsubscribe();
  }

}
