import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: any;
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
  }
}
