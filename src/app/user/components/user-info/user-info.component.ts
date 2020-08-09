import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user: User;
  userId: number;

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userId = this.tokenStorageService.getUser().id;
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }
}
