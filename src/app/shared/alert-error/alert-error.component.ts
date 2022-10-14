import {Component, OnInit} from '@angular/core';
import {AlertService} from './alert.service';

@Component({
  selector: 'bg-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent implements OnInit{

  constructor(public alertService: AlertService) {}

  ngOnInit(): void {}

}

