import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private route:Router
  ) {

  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.route.navigateByUrl("/");
    };
    this.loginForm=this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password:['',[Validators.required]],
      }
    )
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.route.navigateByUrl("/")
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
