import {Component} from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'bg-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})

export class ShellHeaderComponent {

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }

}
