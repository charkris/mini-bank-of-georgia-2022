import {NgModule} from '@angular/core';
import {PmdComponent} from './pmd.component';
import {Pmd311Component} from './pmd311/pmd311.component';
import {SharedModule} from '../../../shared/shared.module';
import {PmdRoutingModule} from './pmd-routing.module';


@NgModule({
  declarations: [PmdComponent, Pmd311Component, ],
  imports: [SharedModule, PmdRoutingModule]
})

export class PmdModule {

}
