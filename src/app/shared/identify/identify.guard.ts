import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ClientService} from './client.service';
import {Injectable} from '@angular/core';

@Injectable()
export class IdentifyGuard implements CanActivate, CanActivateChild {

  constructor(private clientService: ClientService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.clientService.isIdentified
      ? true : this.router.navigate(['bpm/bpm000']);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}

