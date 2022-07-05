import { Movie } from './../../interfaces/movie';
import { AuthService } from './../../../services/auth.service';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private movieService: MovieService, private authService: AuthService) { }

  movieList: Movie[] = [];
  watchedMovieList: Movie[] = [];
  yetToWatchMovieList: Movie[] = [];
  favMovieList: Movie[] = [];
  isLogin: boolean;

  ngOnInit(): void {
    this.checkLogin();
    this.movieService.getMovie().subscribe((movies) => {
      this.movieList = movies;
      console.log('movies', this.movieList);
    });
  }

  ngDoCheck(): void {

    if (this.isLogin) {
      this.loadFavList();
      this.loadWatchedList();
     this.loadYetToWatchList();
    }
  }


  loadFavList() {
    if (localStorage.getItem('favList')) {
      this.favMovieList = JSON.parse(localStorage.getItem('favList')!);
    }
  }

  loadWatchedList() {
    if (localStorage.getItem('watchedList')) {
      this.watchedMovieList = JSON.parse(localStorage.getItem('watchedList')!);
    }
  }
  loadYetToWatchList(){
    if (localStorage.getItem('watchLaterList')) {
      this.yetToWatchMovieList = JSON.parse(localStorage.getItem('watchLaterList')!);
    }
  }


  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.authService.checkLogin(true);
    }
    this.authService.currentLoggedIn.subscribe(isLogin => this.isLogin = isLogin);
  }

}