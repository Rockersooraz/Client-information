import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientCreateComponent} from './create/client-create.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ClientDetailComponent} from './detail/client-detail.component';
import {ClientListComponent} from './list/client-list.component';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  { path: 'create-client', component: ClientCreateComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'client-detail/:id', component: ClientDetailComponent }
  ];

@NgModule({
  declarations: [
    ClientCreateComponent,
    ClientListComponent,
    ClientDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ClientDetailModule { }
