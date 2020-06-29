import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostDetailComponent } from './components/list-posts/post-detail/post-detail.component';


@NgModule({
  declarations: [HomeComponent, PostDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
