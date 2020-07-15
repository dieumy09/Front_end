import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
