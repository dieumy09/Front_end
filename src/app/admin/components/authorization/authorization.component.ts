import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Role } from './../../../models/role';
import { RoleService } from './../../../services/role.service';
import { List } from './../../../models/list';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { map, tap } from 'rxjs/operators';
import { PagerService } from 'src/app/services/pager.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  admins: List<User>;
  roles: any;
  formAdminInput: FormGroup;
  message: string;
  isCreated = false;
  pager: any = {};

  constructor(
    private adminService: AdminService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private pagerService: PagerService
  ) {}

  ngOnInit(): void {
    this.formAdminInput = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      role: this.formBuilder.group({
        id: [],
      }),
    });
    this.jumpToPage(1);
    this.roleService
      .getRoles()
      .pipe(
        map((roles) => {
          return roles.filter((role) => role.roleName !== Role.USER);
        })
      )
      .pipe(
        tap((roles) => {
          this.formAdminInput.patchValue({
            role: {
              id: roles[0].id,
            },
          });
        })
      )
      .subscribe((roles) => {
        this.roles = roles;
      });
  }

  jumpToPage(page) {
    this.adminService.getAdmins(page - 1).subscribe((admins) => {
      this.admins = admins;
      this.pager = this.pagerService.getPager(
        admins.totalElements,
        page,
        admins.size
      );
    });
  }

  handleCreateAccount(): void {
    if (this.formAdminInput.invalid) {
      return;
    }
    this.adminService.createAccount(this.formAdminInput.value).subscribe(() => {
      this.ngOnInit();
      this.isCreated = true;
      this.message = 'Tạo tài khoản thành công!';
    });
    setInterval(() => {
      this.isCreated = false;
    }, 8600);
  }

  handleBlock(id): void {
    this.adminService.blockAdmin(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  handleUnblock(id): void {
    this.adminService.unblockAdmin(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  handleDelete(id): void {
    this.adminService.deleteAdmin(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
