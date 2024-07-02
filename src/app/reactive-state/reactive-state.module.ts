import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidatesService } from './services/candidates.service';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    CandidateListComponent,
    SingleCandidateComponent,
    SharedModule,

  ],
  providers: [
    CandidatesService
  ]
})
export class ReactiveStateModule { }
