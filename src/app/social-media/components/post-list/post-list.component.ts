import { PostsService } from './../../services/posts.service';
import { Post } from './../../models/post.model';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [HttpClientModule,
    PostListItemComponent,
    CommonModule,
    NgFor],
  templateUrl:'./post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  posts$! : Observable<Post[]>

  constructor(private route: ActivatedRoute,
    private postsService: PostsService
  ){}

  ngOnInit(): void {
      this.posts$ = this.route.data.pipe(
        map(data => data['posts'])
      );
  }

  onPostCommented(postCommented: { comment: string, postId: number }) {
    this.postsService.addNewComment(postCommented);
}

}
