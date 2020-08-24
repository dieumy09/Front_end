import { filter, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        filter((value) => value !== null && value !== undefined),
        first()
      )
      .subscribe((user) => {
        this.user = user;
      });
    this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.authService.getCurrentUser();
    this.router.navigateByUrl('login-admin');
  }
}
