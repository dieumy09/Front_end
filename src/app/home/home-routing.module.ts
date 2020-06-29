import { VerifyComponent } from './../auth/verify/verify.component';
import { RegistrationComponent } from './../auth/registration/registration.component';
import { LoginComponent } from './../auth/login/login.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {UserModule} from '../user/user.module';
import {PostEditComponent} from '../user/components/post-edit/post-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      { path: 'login', component: LoginComponent },

      { path: 'register', component: RegistrationComponent },

      { path: 'verify', component: VerifyComponent },

      {path: 'user', component: UserComponent},

      {path: 'post-edit', component: PostEditComponent}

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
