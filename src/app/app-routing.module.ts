import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ClientDetailModule} from './client-detail/client-detail.module';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'client',
    loadChildren: () => import('./client-detail/client-detail.module').then(m => m.ClientDetailModule)},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
