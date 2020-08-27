import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage.service';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent implements OnInit {
  passwordEditForm: FormGroup;
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  isWrongPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.passwordEditForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [''],
      confirmNewPassword: [''],
      wrongPassword: false
    });
  }

  changePassword() {
    if (this.passwordEditForm.valid) {
      this.userId = this.tokenStorageService.getUser().id;
      this.userService.changePassword(this.userId, this.passwordEditForm.value).subscribe(() => {
        this.router.navigateByUrl('/user');
      }, () => {
        this.isWrongPassword = true;
      });
    }
  }
}
