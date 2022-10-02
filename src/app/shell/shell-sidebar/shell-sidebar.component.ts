import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';

@Component({
  selector: 'bg-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {
  userData: any;
  img_src: string;
  fullName: string;
  userName: string;

  constructor() {
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.img_src = this.userData.image;
    this.fullName = this.userData.name;
    this.userName = this.userData.username;
  }


}
