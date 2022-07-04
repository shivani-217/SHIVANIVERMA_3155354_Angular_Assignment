import { HttpClient } from '@angular/common/http';
import { Movie } from './../interfaces/movie';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  private baseApiUrl = 'http://localhost:3000/movieList/';

  postMovie(data: any){
    return this.http.post<any>(this.baseApiUrl,data);
  }

  getMovie(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseApiUrl);
  }

  updateMovie(data: any,id: number){
    return this.http.put<any>(this.baseApiUrl+id, data);
  }

  deleteMovie(id: number){
    return this.http.delete<any>(this.baseApiUrl+id);
  }

  getMovieById(id: number){
    return this.http.get<Movie>(this.baseApiUrl+id);
  }

}