import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KrnComponent} from './krn.component';
import {IdentifyGuard} from '../../../shared/identify/identify.guard';
import {AccountsComponent} from './accounts/accounts.component';
import {CreateAccountComponent} from './accounts/create-account/create-account.component';
import {KrnicpComponent} from './krnicp/krnicp.component';
import {OperationsComponent} from './operations/operations.component';

const routes: Routes = [
  {
    path: '',
    component: KrnComponent,
    canActivate: [IdentifyGuard],
    children: [
      {
        path: 'accounts',
        component: AccountsComponent,
        children: [
          {
            path: 'create',
            component: CreateAccountComponent
          }
        ]
      },
      {
        path: 'krnicp',
        component: KrnicpComponent,
      },
      {
        path: 'operations',
        component: OperationsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class KrnRoutingModule {

}
