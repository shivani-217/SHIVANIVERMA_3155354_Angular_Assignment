import { RegisterComponent } from './features/user/components/register/register.component';
import { LoginComponent } from './features/user/components/login/login.component';
import { AdminHomeComponent } from './features/admin/components/admin-home/admin-home.component';
import { HomeComponent } from './features/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './features/components/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'movie/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
