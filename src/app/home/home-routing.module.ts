import { VerifyComponent } from './../auth/verify/verify.component';
import { RegistrationComponent } from './../auth/registration/registration.component';
import { LoginComponent } from './../auth/login/login.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAllComponent} from './components/list-posts/list-all/list-all.component';
import {PostFormComponent} from './components/post/post-form/post-form.component';
import {PostConfirmComponent} from './components/post/post-confirm/post-confirm.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      { path: 'login', component: LoginComponent },

      { path: 'register', component: RegistrationComponent },

      { path: 'verify', component: VerifyComponent },

      {
        path: '', component: ListAllComponent},
      {
        path: 'post-form', component: PostFormComponent},
      {
        path: 'post-confirm', component: PostConfirmComponent}

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
