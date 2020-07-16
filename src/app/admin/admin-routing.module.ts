import { AdminComponent } from './admin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginAdminComponent} from './components/login-admin/login-admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {path: 'login', component: LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
