import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    SharedModule,
    RouterModule,
    MatToolbar,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
