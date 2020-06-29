import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';


@NgModule({
    declarations: [UserComponent, UserInfoComponent, PostListComponent, PostEditComponent],
    exports: [
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
