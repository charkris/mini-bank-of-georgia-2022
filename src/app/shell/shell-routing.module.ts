import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShellComponent} from './shell.component';
import {AuthGuard} from '../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bpm',
        loadChildren: () => import('./modules/bpm/bpm.module').then((m) => m.BpmModule)
      },
      {
        path: '',
        redirectTo: 'bpm',
        pathMatch: 'full',
      },
      {
        path: 'krn',
        loadChildren: () => import('./modules/krn/krn.module').then(m => m.KrnModule)
      },
      {
        path: '',
        redirectTo: 'krn',
        pathMatch: 'full'
      },
      {
        path: 'pmd',
        loadChildren: () => import('./modules/pmd/pmd.module').then(m => m.PmdModule)
      },
      {
        path: '',
        redirectTo: 'pmd',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShellRoutingModule {

}
