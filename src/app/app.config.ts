import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routesModule } from './app.routes';
import { provideStore } from '@ngrx/store';
import {reducers} from "./store/reducers";
import {provideEffects} from "@ngrx/effects";
import {MoviesEffects} from "./store/effects/movies.effects";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routesModule), provideStore(reducers), provideEffects(MoviesEffects), provideHttpClient()]
};
