import { MovieService } from './../../../services/movie.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  genreList = ['Horror', 'Comedy', 'Action'];
  actionBtn: string = "Save";

  movieForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MovieFormComponent>) { }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      imdbRating: ['', Validators.required],
      language: ['', Validators.required],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required],
      imageUrl: ['', Validators.required]

    });

    if (this.editData) {
      this.movieForm.controls['name'].setValue(this.editData.name);
      this.movieForm.controls['title'].setValue(this.editData.title);
      this.movieForm.controls['description'].setValue(this.editData.description);
      this.movieForm.controls['imdbRating'].setValue(this.editData.imdbRating);
      this.movieForm.controls['language'].setValue(this.editData.language);
      this.movieForm.controls['releaseDate'].setValue(this.editData.releaseDate);
      this.movieForm.controls['genre'].setValue(this.editData.genre);
      this.movieForm.controls['imageUrl'].setValue(this.editData.imageUrl);
      this.actionBtn = "Update";
    }
  }

  addMovie() {
    if (!this.editData) {
      if (this.movieForm.valid) {
        console.log(this.movieForm.value);
        if (this.movieForm.valid) {
          this.movieService.postMovie(this.movieForm.value)
            .subscribe({
              next: (res: any) => {
                alert("Movie added successfully");
                console.log(res);
                this.movieForm.reset();
                this.dialogRef.close('save');

              },
              error: () => {
                alert("Error while adding movie")
              }
            });
        }
      }
    } else {
      this.updateMovie()
    }
  }


  updateMovie() {
    this.movieService.updateMovie(this.movieForm.value, this.editData.id)
      .subscribe({
        next: (res: any) => {
          alert("Movie Updated Successfulyy");
          this.movieForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the movie");
        }
      })
  }
}