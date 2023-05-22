import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Quizz, QuizzNames } from '../models/quizz.models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  ENDPOINT_URL = `${environment.API_URL}/quizzes`; // TODO check why variable is accessible

  constructor(private http: HttpClient) {}

  loadQuizzes(): Observable<Quizz[]> {
    return this.http
      .get<Quizz[]>(this.ENDPOINT_URL)
      .pipe(catchError(this.handleError<Quizz[]>('loadQuizzes')));
  }

  startQuizz(name: QuizzNames): Observable<Quizz> {
    return this.http
      .post<{ quizz: Quizz }>(this.ENDPOINT_URL, { name }, httpOptions)
      .pipe(
        map((apiRes) => apiRes.quizz),
        catchError(this.handleError<Quizz>('startQuizz'))
      );
  }

  getQuizz(id: number): Observable<Quizz> {
    return this.http
      .get<Quizz>(`${this.ENDPOINT_URL}/${id}`)
      .pipe(catchError(this.handleError<Quizz>('getQuizz')));
  }

  updateQuizz(quizz: Quizz): Observable<Quizz> {
    const url = `${this.ENDPOINT_URL}/${quizz.id}`;
    return this.http
      .put<Quizz>(url, quizz, httpOptions)
      .pipe(catchError(this.handleError<Quizz>('updateQuizz')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
