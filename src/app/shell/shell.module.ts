import {NgModule} from '@angular/core';
import {ShellComponent} from './shell.component';
import {ClientHeaderModule} from './client-header/client-header.module';
import {ShellHeaderModule} from './shell-header/shell-header.module';
import {ShellSidebarModule} from './shell-sidebar/shell-sidebar.module';
import {ShellRoutingModule} from './shell-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    SharedModule,
    ShellRoutingModule,
    ClientHeaderModule,
    ShellHeaderModule,
    ShellSidebarModule,
    ],
  exports: [ShellComponent],

})

export class ShellModule {

}
