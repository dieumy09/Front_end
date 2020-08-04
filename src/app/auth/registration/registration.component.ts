import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  message='';
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address:['',[Validators.required]],
      phoneNumber:['',[Validators.required]],
      password:['',[Validators.required]]
    });

  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.message = data.message;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    )

  }


}
