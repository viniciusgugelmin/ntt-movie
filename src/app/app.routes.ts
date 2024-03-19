import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)},
  {path: 'movies', loadComponent: () => import('./pages/movies/movies.component').then(m => m.MoviesComponent)},
  {path: 'movie/:id', loadComponent: () => import('./pages/movie/movie.component').then(m => m.MovieComponent)},
  {path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)}
];
