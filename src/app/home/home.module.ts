import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostDetailComponent } from './components/list-posts/post-detail/post-detail.component';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { SearchByAgeComponent } from './components/search-by-age/search-by-age.component';
import { SearchByKeywordComponent } from './components/search-by-keyword/search-by-keyword.component';


@NgModule({
  declarations: [HomeComponent, PostDetailComponent, AdvanceSearchComponent, SearchByAgeComponent, SearchByKeywordComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
