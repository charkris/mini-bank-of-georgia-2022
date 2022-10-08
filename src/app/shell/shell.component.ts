import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ClientService} from '../shared/identify/client.service';

@Component({
  selector: 'bg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  get curDate() {
    const d = new Date();
    return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  }

  constructor() {
  }

  ngOnInit(): void {

  }


  ngOnDestroy() {

  }
}
