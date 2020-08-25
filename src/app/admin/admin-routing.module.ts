import { InfoComponent } from './components/info/info.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { ApprovedPostListComponent } from './components/post/approved-post-list/approved-post-list.component';
import { PendingPostListComponent } from './components/post/pending-post-list/pending-post-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostDetailComponent} from './components/post/post-detail/post-detail.component';
import {ViewCountStatisticComponent} from "./components/statistic/view-count-statistic/view-count-statistic.component";
import {MostViewCountStatisticComponent} from "./components/statistic/most-view-count-statistic/most-view-count-statistic.component";
import { AuthGuardService } from '../services/auth-guard.service';
import { Role } from '../models/role';
import { SupportListComponent } from './components/support-list/support-list.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
      },
      {
        path: 'users',
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
      {
        path: 'pending-posts',
        component: PendingPostListComponent,
      },
      {
        path: 'approved-posts',
        component: ApprovedPostListComponent,
      },
      {
        path: 'authorization',
        component: AuthorizationComponent,
      },
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'supports',
        component: SupportListComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
    ],
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.MOD] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
