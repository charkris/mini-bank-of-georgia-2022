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
  clientInfo: any;

  constructor(private router: Router,
              public clientService: ClientService) {
  }

  ngOnInit(): void {
  }


  endSession() {
    this.clientService.isIdentified = false;
    localStorage.removeItem('clientInfo');
    this.router.navigate(['bpm/bpm000']);
  }

  ngOnDestroy() {
    // this.clientSubs.unsubscribe();
    // this.clientInfoSubs.unsubscribe();
  }

}
