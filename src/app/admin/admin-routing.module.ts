import { InfoComponent } from './components/info/info.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { ApprovedPostListComponent } from './components/post/approved-post-list/approved-post-list.component';
import { PendingPostListComponent } from './components/post/pending-post-list/pending-post-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';

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
    ],
    canActivate: [AuthGuardService],
    data: { role: Role.ADMIN },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
