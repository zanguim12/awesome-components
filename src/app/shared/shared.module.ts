// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from './components/comments/comments.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { TimeAgoPipe } from './pipes/timeago.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   /* MatToolbarModule,
    MatCardModule,*/
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    TimeAgoPipe,
    UsernamePipe,
    HighlightDirective
  ],
  exports: [
    /*MatToolbarModule,*/
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    TimeAgoPipe,
    UsernamePipe,
    HighlightDirective
  ]
})
export class SharedModule { }
