import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { UserInfoEditComponent } from './components/user-info-edit/user-info-edit.component';
import { PasswordEditComponent } from './components/password-edit/password-edit.component';


@NgModule({
  declarations: [UserComponent, UserInfoComponent, PostListComponent, PostEditComponent, UserInfoEditComponent, PasswordEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule
  ],
  exports: [UserComponent, UserInfoComponent, PostListComponent, PostEditComponent]
})
export class UserModule { }
