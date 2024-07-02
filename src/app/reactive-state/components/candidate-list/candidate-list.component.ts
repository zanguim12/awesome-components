import { CandidatesService } from './../../services/candidates.service';
import { Component, Input, OnInit, ChangeDetectionStrategy, input, ChangeDetectorRef } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SingleCandidateComponent } from '../single-candidate/single-candidate.component';
import { FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [ CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
    SingleCandidateComponent,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;

  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
}[];


  //@Input() obj!: {firstName: string, lastName: string};

  constructor(
    private candidatesService: CandidatesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loading$ = this.candidatesService.loading;
    this.candidatesService.getCandidatesFromServer();

  }

  private initForm(){
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
        { value: CandidateSearchType.LASTNAME, label: 'Nom' },
        { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
        { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
    ];
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
  );
  const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
  );
  this.candidates$ = combineLatest([
    search$,
    searchType$,
    this.candidatesService.candidates$
    ]
).pipe(
    map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
    )
);}
}
