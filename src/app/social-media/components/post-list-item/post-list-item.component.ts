import { ShortenPipe } from './../../../shared/pipes/shorten.pipe';
import { Comment } from './../../../core/models/comment.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from '../../../shared/components/comments/comments.component';
import { MaterialModule } from '../../../shared/material.module';
import { UsernamePipe } from '../../../shared/pipes/username.pipe';
import { TimeAgoPipe } from '../../../shared/pipes/timeago.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';


@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatCardModule,
    CommonModule,
    MaterialModule,
    CommentsComponent,
    ShortenPipe,
    UsernamePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();

  tmpUser = { firstName: 'John', lastName: 'Doe' };

  constructor(){}

  ngOnInit(): void {
  }

  OnNewComment(comment: string){
    this.postCommented.emit({comment, postId: this.post.id})
  }

}
