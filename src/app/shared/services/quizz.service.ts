import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Quizz } from '../models/quizz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  ENDPOINT_URL = `${environment.API_URL}/quizzes`; // TODO check why variable is accessible

  constructor(private http: HttpClient) {}

  loadQuizzes(): Observable<Quizz[]> {
    return this.http
      .get<Quizz[]>(this.ENDPOINT_URL)
      .pipe(map((apiRes) => apiRes));
  }

  startQuizz(): Observable<Quizz> {
    return this.http
      .post<Quizz>(this.ENDPOINT_URL, {})
      .pipe(map((apiRes) => apiRes));
  }
}
