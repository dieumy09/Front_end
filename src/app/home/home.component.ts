import { Role } from './../models/role';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
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
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
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
      if (role === Role.ADMIN) {
        isAdmin = true;
      }
    });
    return isAdmin;
  }
}
