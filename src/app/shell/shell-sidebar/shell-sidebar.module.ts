import {NgModule} from '@angular/core';
import {ShellSidebarComponent} from './shell-sidebar.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ShellSidebarComponent],
  imports: [SharedModule, RouterModule],
  exports: [ShellSidebarComponent],

})

export class ShellSidebarModule{

}
