import { Observable } from 'rxjs';
import { Reviews } from './../../interfaces/review';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private getMovieReviewsUrl: string;

  constructor(private http: HttpClient) { }

  getMovieReviews(id: number): Observable<Array<Reviews>> {

    this.getMovieReviewsUrl = "http://localhost:3000/reviews?movieId=" + id
    return this.http.get<Array<Reviews>>(this.getMovieReviewsUrl);
  }

  postMovieReview(data: any):Observable<Reviews> {
    return this.http.post<any>("http://localhost:3000/reviews/", data);
  }

} 
