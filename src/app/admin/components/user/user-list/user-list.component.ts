import { PagerService } from './../../../../services/pager.service';
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
  pager: any = {};
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private pagerService: PagerService
  ) {}

  ngOnInit(): void {
    this.userService.searchUsers(this.currentKeyword).subscribe((users) => {
      this.users = users;
      this.jumpToPage(1);
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

  jumpToPage(page) {
    this.userService
      .searchUsers(this.searchForm.value.keyword, page - 1)
      .subscribe((users) => {
        this.users = users;
        this.pager = this.pagerService.getPager(
          users.totalElements,
          page,
          users.size
        );
      });
  }
}
