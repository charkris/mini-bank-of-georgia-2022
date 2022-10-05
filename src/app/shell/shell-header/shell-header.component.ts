import {Component, OnInit} from '@angular/core';
import {PopupDirective} from './popup.directive';
import {AuthService} from '../../shared/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})

export class ShellHeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onLogout() {
    this.authService.logout();
  }
  // endSession() {
  //   console.log('aaaaaaa');
  //   this.router.navigate(['/bpm/bpm000']);
  // }
}
