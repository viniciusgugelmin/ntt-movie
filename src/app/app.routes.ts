import {Routes, Route, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./services/user.service";
import {map, Observable, take} from "rxjs";

interface AppRoute extends Route {
  name: string;
}

const hasLoggedIn: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userName: Observable<User.Properties['name']> = inject(UserService).getName();
  const needsLogin = route.data?.['needsLogin'];

  const hasName = userName.pipe(
    map(name => !!name),
    take(1)
  );

  hasName.subscribe(hasName => {
    if (hasName && !needsLogin) {
      router.navigate([getRoutePath('Movies')])
    }

    if (!hasName && needsLogin) {
      router.navigate([getRoutePath('Home')])
    }
  });

  if (needsLogin) {
    return hasName;
  }

  return true
}

export const routes: AppRoute[] = [
  {
    name: 'Home',
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [hasLoggedIn],
  },
  {
    name: 'Movies',
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.component').then(m => m.MoviesComponent),
    canActivate: [hasLoggedIn],
    data: {
      needsLogin: true
    }
  },
  {
    name: 'Movie',
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie/movie.component').then(m => m.MovieComponent),
    canActivate: [hasLoggedIn],
    data: {
      needsLogin: true
    }
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

  return {
    data: { needsLogin: false },
    ...rest,
  }
});

export const getRoutePath = (name: AppRoute['name']): AppRoute['path'] => {
  const route = routes.find(route => route.name === name);

  if (!route) {
    return (routes.find(route => route.name === '404') as AppRoute).path;
  }

  return route.path;
}
