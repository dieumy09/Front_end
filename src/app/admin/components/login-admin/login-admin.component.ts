import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  loginAdminForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.router.navigateByUrl('/admin');
    }
    this.loginAdminForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.authService.login(this.loginAdminForm.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        window.location.assign('/admin');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
