import { AuthService } from './../../../services/auth.service';
import { MovieService } from './../../services/movie.service';
import { User } from './../../interfaces/user';
import { Movie } from './../../interfaces/movie';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TmplAstBoundAttribute } from '@angular/compiler';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  id: number;
  sub: Subscription = new Subscription;


  isFav: boolean;
  isWatched: boolean;
  isWatchedLater: boolean;
  watchedList: Movie[] = [];
  favList: Movie[] = [];
  isLogin: boolean;




  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.checkLogin();
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.movieService.getMovieById(this.id).subscribe({
        next: (res: Movie) => {
          this.movie = res;
        },
        error: () => {
          alert("Error while fetching movie info");
        }

      })
      if (this.isLogin) {
        if (localStorage.getItem('favList')) {
          this.favList = JSON.parse(localStorage.getItem('favList')!);
        }
        if (localStorage.getItem('watchedList')) {
          this.watchedList = JSON.parse(localStorage.getItem('watchedList')!);
        }
        if (this.favList.length > 0 && this.favList.find(m => this.id === m.id)) {
          this.isFav = true;
        }
        if (this.watchedList.length > 0 && this.watchedList.find(m => this.id === m.id)) {
          this.isWatched = true;
        }
      }
    })
  }

  checkLogin() {
    this.authService.currentLoggedIn.subscribe(isLogin => this.isLogin = isLogin);
  }


  onWatchedClick(): void {

    if (!this.isLogin) {
      this.redirectToLogin();
      return;
    }
    if (!this.isWatched) {
      if (this.movie.isPrime && !localStorage.getItem('primeMember')) {
        alert("Please opt for prime membership to continue watching this movie");
        return;
      }
      if (localStorage.getItem('watchedList')) {
        this.watchedList = JSON.parse(localStorage.getItem('watchedList')!);
      }
      this.watchedList.push(this.movie);
      this.isWatched = true;
      localStorage.setItem('watchedList', JSON.stringify(this.watchedList));
    }
  }

  onWatchedLaterClick(): void {
    // if (this.isLogin) {
    //   this.isWatchedLater = !this.isWatchedLater;
    //   this.movie.isWatchedLater = this.isWatchedLater;
    //   this.movieService.updateMovie(this.movie, this.movie.id).subscribe({
    //     next: (res:Movie) => {
    //       alert("Marked as watched later");
    //       console.log("watch function", res.isWatchedLater);
    //     },
    //     error: () => { }
    //   });
    // } else {
    //   this.router.navigate(['login']);
    // }
  }



  onFavClick(): void {
    if (!this.isLogin) {
      this.router.navigate(['login']);
    } else {
      this.isFav = !this.isFav;
      if (localStorage.getItem('favList')) {
        this.favList = JSON.parse(localStorage.getItem('favList')!);
      }
      if (this.isFav) {
        this.favList.push(this.movie);
      }
      else if (!this.isFav) {
        const index = this.favList.findIndex(m => this.movie.id == m.id);
        this.favList.splice(index, 1);
      }
      localStorage.setItem('favList', JSON.stringify(this.favList));

    }
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}