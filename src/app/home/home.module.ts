import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostDetailComponent } from './components/list-posts/post-detail/post-detail.component';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { SearchByAgeComponent } from './components/search-by-age/search-by-age.component';
import { SearchByKeywordComponent } from './components/search-by-keyword/search-by-keyword.component';
import { ListAllComponent } from './components/list-posts/list-all/list-all.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { PostConfirmComponent } from './components/post/post-confirm/post-confirm.component';
import {UserModule} from '../user/user.module';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [HomeComponent, PostDetailComponent, AdvanceSearchComponent, SearchByAgeComponent, SearchByKeywordComponent, ListAllComponent, PostFormComponent, PostConfirmComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UserModule
  ]
})
export class HomeModule { }
