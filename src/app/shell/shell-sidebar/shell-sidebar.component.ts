import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'bg-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {
  userData: any;
  imgSrc: string;
  fullName: string;
  userName: string;

  constructor() {
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.imgSrc = this.userData.image;
    this.fullName = this.userData.name;
    this.userName = this.userData.username;
  }

}
