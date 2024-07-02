import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimeAgoPipe } from '../../pipes/timeago.pipe';
import { trigger, state, style, animate, transition, query, group, sequence, stagger, animateChild, useAnimation } from '@angular/animations';
import { MaterialModule } from '../../material.module';
import { Comment } from '../../../core/models/comment.model';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TimeAgoPipe,
  ],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
            stagger(50, [
                animateChild()
            ])
        ])
    ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition('void => *', [
        query('.comment-text, .comment-date', [
          style({
              opacity: 0
          }),
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
              time: '5004ms',
              startColor: 'rgb(201, 157, 242)'
          }
      }),
        group([
          useAnimation(flashAnimation, {
            params: {
                time: '250ms',
                flashColor: 'rgb(249,179,111)'
            }
        }),
          query('.comment-text', [
              animate('250ms', style({
                  opacity: 1
              }))
          ]),
          query('.comment-date', [
              animate('500ms', style({
                  opacity: 1
              }))
          ]),
        ]),
      ])
    ]),
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[] = [];  // Initialisation avec un tableau vide
  @Output() newComment = new EventEmitter<string>();
  commentCtrl!: FormControl;
  tmpDate = new Date();

  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(15)]);
    if (this.comments && this.comments.length > 0) {
      this.comments.forEach((comment, index) => {
        this.animationStates[index] = 'default';
      });
    }
  }

  onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id), 0); // Handle case where comments might be empty
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
