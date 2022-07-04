import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from './../../services/review.service';
import { Reviews } from './../../../interfaces/review';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  saveReview: string = "Save";
  reviewForm !: FormGroup;
  review: Reviews[];

  constructor(private formBuilder: FormBuilder, private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public movieId: any,
    private dialogRef: MatDialogRef<ReviewFormComponent>) { }

  ngOnInit(): void {
    console.log(this.movieId);
    this.reviewForm = this.formBuilder.group({
      content: ['', Validators.required],
      author: ['', Validators.required],
      movieId: [this.movieId]
    });
  }

  addReview() {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
      this.reviewService.postMovieReview(this.reviewForm.value).subscribe({
        next: (data) => {
          console.log("Movie review added");
          this.reviewForm.reset();
          this.dialogRef.close('save');
        }, error: () => {
          console.log("Error while adding review")
        }
      });
    }
  }

}
