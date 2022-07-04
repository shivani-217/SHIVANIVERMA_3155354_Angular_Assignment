import { AuthService } from './../../../../services/auth.service';
import { ReviewFormComponent } from './../review-form/review-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewService } from './../../services/review.service';
import { Reviews } from './../../../interfaces/review';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  @Input()
  movieId: number;
  reviewData: Reviews[];
  isLogin: boolean;

  constructor(private reviewService: ReviewService, private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getMovieReviews();
    this.checkLogin();

  }


  getMovieReviews() {
    this.reviewService.getMovieReviews(this.movieId)
      .subscribe({
        next: (res) => {
          this.reviewData = res;
          console.log(this.reviewData);
        },
        error: () => {
          alert("Erro while getting reviews");
        }
      });
  }

  openReviewForm(id: number) {
    console.log(this.isLogin);
    this.dialog.open(ReviewFormComponent, {
      width: '20%',
      data: id
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getMovieReviews();
      }
    })
  }

  checkLogin(){
    if(localStorage.getItem('token')){
      this.authService.checkLogin(true);
    }
    this.authService.currentLoggedIn.subscribe(isLogin=>this.isLogin=isLogin);
    
  }

}