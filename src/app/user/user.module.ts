import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [UserComponent, UserInfoComponent, PostListComponent, PostEditComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule
    ],
  exports: [UserComponent, UserInfoComponent, PostListComponent, PostEditComponent]
})
export class UserModule { }
