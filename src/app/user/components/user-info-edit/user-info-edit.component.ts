import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Role} from '../../../models/role';
import {Post} from '../../../models/post';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.scss']
})
export class UserInfoEditComponent implements OnInit {
  infoEditForm: FormGroup;
  userId: number;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.infoEditForm = this.formBuilder.group({
      id: [''],
      name: [''],
      address: [''],
      phoneNumber: [''],
      email: [''],
      avatar: [''],
      status: [''],
      activated: [''],
      role: [''],
      createdAt: [''],
      updatedAt: [''],
      posts: ['']
    });

    this.getUserById();
  }

  getUserById() {
    this.activatedRoute.params.subscribe(param => {
      this.userId = param.id;
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
        this.infoEditForm.patchValue(this.user);
      });
    });
  }

}
