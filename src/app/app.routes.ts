import {Routes, Route} from '@angular/router';

interface AppRoute extends Route {
  name: string;
}

export const routes: AppRoute[] = [
  {
    name: 'Home',
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    name: 'Movies',
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.component').then(m => m.MoviesComponent)
  },
  {
    name: 'Movie',
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie/movie.component').then(m => m.MovieComponent),
  },
  {
    name: '404',
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    name: 'Not Found',
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

export const routesModule: Routes = routes.map(route => {
  const {name, ...rest} = route;

  return rest;
});

export const getRoutePath = (name: AppRoute['name']): AppRoute['path'] => {
  const route = routes.find(route => route.name === name);

  if (!route) {
    return (routes.find(route => route.name === '404') as AppRoute).path;
  }

  return route.path;
}
