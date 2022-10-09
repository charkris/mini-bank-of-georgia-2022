import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertService} from './alert.service';

@Component({
  selector: 'bg-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent implements OnInit {
  error;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.loggedError.subscribe((err) => {
      this.error = err;
    });
  }

  onCloseModal() {
    this.error = undefined;
  }

}
