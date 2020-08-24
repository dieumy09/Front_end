import { TokenStorageService } from './../services/token-storage.service';
import { AuthService } from './../services/auth.service';
import { Role } from './../models/role';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: User;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.authService.getCurrentUser();
  }

  goToPostForm(content): void {
    if (this.user === null) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/post-form');
    }
  }

  isAdmin(): boolean {
    let isAdmin = false;
    this.user.roles.forEach((role) => {
      if (role.roleName === Role.ADMIN) {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

  logout(): void {
    this.authService.logout();
    this.authService.getCurrentUser();
  }
}
