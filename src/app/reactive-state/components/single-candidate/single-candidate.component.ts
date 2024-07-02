import { CandidatesService } from './../../services/candidates.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CandidateListComponent } from '../candidate-list/candidate-list.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Candidate } from '../../models/candidate.model';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [CandidateListComponent,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {

  //@Input() obj!: {firstName: string, lastName: string};
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidatesService: CandidatesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading;
    this.candidate$ = this.activatedRoute.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    );
  }

  public onHire() {
    // Logique pour embaucher le candidat
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
          this.candidatesService.hireCandidate(candidate.id);
          this.onGoBack();
      })
  ).subscribe();  }

  public onRefuse() {
    // Logique pour refuser le candidat
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
          this.candidatesService.refuseCandidate(candidate.id);
          this.onGoBack();
      })
  ).subscribe();  }

  public onGoBack() {
    // Logique pour retourner en arrière
    this.router.navigateByUrl('/reactive-state/candidates');
  }


}
