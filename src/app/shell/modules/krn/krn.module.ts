import {NgModule} from '@angular/core';
import {KrnComponent} from './krn.component';
import {AccountsComponent} from './accounts/accounts.component';
import {KrnicpComponent} from './krnicp/krnicp.component';
import {OperationsComponent} from './operations/operations.component';
import {CreateAccountComponent} from './accounts/create-account/create-account.component';
import {SharedModule} from '../../../shared/shared.module';
import {KrnRoutingModule} from './krn-routing.module';

@NgModule({
  declarations: [KrnComponent,
    AccountsComponent,
    CreateAccountComponent,
    KrnicpComponent,
    OperationsComponent,
  ],
  imports: [
    SharedModule,
    KrnRoutingModule,
  ],
  exports: [
    KrnComponent,
    AccountsComponent,
    KrnicpComponent,
    OperationsComponent,
    CreateAccountComponent,
  ],
})

export class KrnModule {

}
