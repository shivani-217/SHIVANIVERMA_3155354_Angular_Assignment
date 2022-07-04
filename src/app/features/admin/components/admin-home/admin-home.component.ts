import { MovieFormComponent } from './../movie-form/movie-form.component';
import { MovieService } from './../../../services/movie.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'title', 'description', 'imdbRating', 'language', 'releaseDate', 'genre', 'imageUrl', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  openDialog() {
    this.dialog.open(MovieFormComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllMovies();
      }
    });

  }



  getAllMovies() {
    this.movieService.getMovie()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          alert("Erro while fetching the records");
        }
      })

  }

  editMovie(row: any) {
    this.dialog.open(MovieFormComponent, {
      width: '30%',
      data: row

    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllMovies();
      }

    })
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id)
      .subscribe({
        next: (_res: any) => {
          alert("deleted successfully");
          this.getAllMovies();
        },
        error: () => {
          alert("Erro while deleting the movie");
        }
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
