import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MovieItemComponent } from './movie/movie-item/movie-item.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { CreateMovieComponent } from './movie/create-movie/create-movie.component';
import { CreateProjectionComponent } from './movie/create-projection/create-projection.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { CreateReservationComponent } from './movie/create-reservation/create-reservation.component';

const routes: Routes = [

  {path: "login", component: LoginComponent},
  {path: "register", component: RegistrationComponent},
  {path:"create-projection",component:CreateProjectionComponent,canActivate: [authGuardGuard]},
  {path:"create-reservation/:idMovie/:nameMovie",component:CreateReservationComponent},
  {path: "home",component:MovieListComponent},
  {path: "create-movie",component:CreateMovieComponent,canActivate: [authGuardGuard]},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
