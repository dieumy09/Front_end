import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginAdminComponent} from './components/login-admin/login-admin.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {RoleService} from '../services/role.service';
import {Role} from '../models/role';
import {PostDetailComponent} from './components/post/post-detail/post-detail.component';
import {ViewCountStatisticComponent} from "./components/statistic/view-count-statistic/view-count-statistic.component";
import {MostViewCountStatisticComponent} from "./components/statistic/most-view-count-statistic/most-view-count-statistic.component";


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
        path: 'post-detail/:id',
        component: PostDetailComponent,
      },
      {
        path: 'view-count-statistic',
        component: ViewCountStatisticComponent,
      },
      {
        path: 'most-view-count-statistic',
        component: MostViewCountStatisticComponent,
      },
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
