import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from '../services/auth-guard.service';
import {Role} from '../models/role';
import {SupportListComponent} from './components/support-list/support-list.component';
import {SettingComponent} from './components/setting/setting.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
      },
      {
        path: 'supports',
        component: SupportListComponent,
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ],
    canActivate: [AuthGuardService],
    data: {roles: [Role.ADMIN]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
