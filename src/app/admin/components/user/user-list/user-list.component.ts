import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../../../models/user';
import { List } from './../../../../models/list';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: List<User>;
  searchForm: FormGroup;
  currentKeyword = '';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.searchUsers(this.currentKeyword).subscribe((users) => {
      this.users = users;
    });
    this.searchForm = this.formBuilder.group({
      keyword: [''],
    });
  }

  handleSearchClick() {
    this.currentKeyword = this.searchForm.value.keyword;
    this.userService
      .searchUsers(this.searchForm.value.keyword)
      .subscribe((users) => {
        this.users = users;
      });
    this.searchForm.reset();
  }

  handleClickNext() {
    this.userService
      .searchUsers(this.searchForm.value.keyword, this.users.number + 1)
      .subscribe((users) => {
        this.users = users;
      });
  }

  handleClickPrevious() {
    this.userService
      .searchUsers(this.searchForm.value.keyword, this.users.number - 1)
      .subscribe((users) => {
        this.users = users;
      });
  }

  jumpToPage(page) {
    this.userService
      .searchUsers(this.searchForm.value.keyword, page)
      .subscribe((users) => {
        this.users = users;
      });
  }
}
