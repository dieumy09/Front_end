import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyComponent } from './verify/verify.component';



@NgModule({
  declarations: [LoginComponent, RegistrationComponent, VerifyComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LoginComponent, RegistrationComponent, VerifyComponent
  ]
})
export class AuthModule { }
