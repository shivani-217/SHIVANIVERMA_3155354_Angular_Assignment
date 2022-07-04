import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { MovieFormComponent } from './admin/components/movie-form/movie-form.component';
import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewListComponent } from './reviews/components/review-list/review-list.component';
import { ReviewFormComponent } from './reviews/components/review-form/review-form.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminHomeComponent,
    MovieFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ReviewListComponent,
    ReviewFormComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent,
    AdminHomeComponent,
    MovieFormComponent,
    LoginComponent,
    RegisterComponent,
    MovieDetailComponent,
    ReviewFormComponent,
    ReviewListComponent
  ]
})
export class FeaturesModule { }
