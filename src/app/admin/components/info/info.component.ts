import { Password } from './../../../models/password';
import { UserService } from './../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  user: User;
  infoFormInput: FormGroup;
  passwordFormInput: FormGroup;
  message = '';
  updatedInfoSuccess = false;
  changedPasswordSuccess = false;
  submitted = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.infoFormInput = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
    this.passwordFormInput = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPassword }
    );
    this.loadUser();
  }

  checkPassword(form: FormGroup) {
    const oldPassword = form.get('oldPassword').value;
    const newPassword = form.get('newPassword').value;
    const confirmPassword = form.get('confirmPassword').value;
    let result;
    if (oldPassword === newPassword) {
      result = { dupPass: true };
    } else if (newPassword !== confirmPassword) {
      result = { ...result, notSame: true };
    } else {
      result = true;
    }
    return result;
  }

  loadUser(): void {
    this.authService.user$
      .pipe(
        tap((user) =>
          this.infoFormInput.patchValue({
            name: user?.name,
            address: user?.address,
            phoneNumber: user?.phoneNumber,
          })
        )
      )
      .subscribe((user) => {
        this.user = user;
      });
    this.authService.getCurrentUser();
  }

  handleChangeInfo() {
    if (this.infoFormInput.valid) {
      this.user.name = this.infoFormInput.value.name;
      this.user.address = this.infoFormInput.value.address;
      this.user.phoneNumber = this.infoFormInput.value.phoneNumber;
      this.userService.editUser(this.user).subscribe(() => {
        this.loadUser();
        this.updatedInfoSuccess = true;
        this.message = 'Thay đổi thông tin thành công!';
      });
      setInterval(() => {
        this.updatedInfoSuccess = false;
      }, 5000);
    }
  }

  handleChangePassword() {
    if (this.passwordFormInput.valid) {
      const password: Password = {
        currentPassword: this.passwordFormInput.value.oldPassword,
        newPassword: this.passwordFormInput.value.newPassword,
        confirmNewPassword: this.passwordFormInput.value.confirmPassword,
      };
      this.userService.changePassword(this.user.id, password).subscribe(
        () => {
          this.changedPasswordSuccess = true;
          this.message = 'Đổi mật khẩu thành công!';
          this.passwordFormInput.reset();
        },
        () => {
          this.submitted = true;
          this.message = 'Mật khẩu cũ không chính xát!';
        }
      );
      setInterval(() => {
        this.changedPasswordSuccess = false;
        this.submitted = false;
      }, 5000);
    }
  }
}
