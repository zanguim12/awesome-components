import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsResolver } from './resolvers/posts.resolver';

const routes: Routes = [
  { path: '', component: PostListComponent, resolve: { posts: PostsResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class SocialMediaRoutingModule { }
