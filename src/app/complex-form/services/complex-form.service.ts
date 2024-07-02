import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplexFormValue } from '../models/complex-form-value.model';
import { Observable, of } from 'rxjs';
import { catchError, delay, mapTo } from 'rxjs/operators';


@Injectable({
  providedIn: 'root' // Optionnel, permet d'injecter ce service globalement
})
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post('http://localhost:3000/users', formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }
}
