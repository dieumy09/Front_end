import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { ViewCountStatisticComponent } from './components/statistic/view-count-statistic/view-count-statistic.component';
import { MostViewCountStatisticComponent } from './components/statistic/most-view-count-statistic/most-view-count-statistic.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    SideBarComponent,
    UserListComponent,
    UserDetailComponent,
    LoginAdminComponent,
    PostDetailComponent,
    ViewCountStatisticComponent,
    MostViewCountStatisticComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, ChartsModule, FormsModule],
  exports: [LoginAdminComponent]
})
export class AdminModule {}
