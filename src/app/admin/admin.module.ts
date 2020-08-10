import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    SideBarComponent,
    UserListComponent,
    UserDetailComponent,
    LoginAdminComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
  exports: [LoginAdminComponent]
})
export class AdminModule {}
