import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AlertService} from './alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent implements OnInit, OnDestroy {
  error;
  alertSub: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertSub = this.alertService.loggedError.subscribe((err) => {
      this.error = err;
    });
  }

  onCloseModal() {
    this.error = undefined;
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

}
