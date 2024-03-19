import {moviesReducer} from './movies.reducer';
import {userReducer} from "./user.reducer";

export const reducers = {
  movies: moviesReducer,
  user: userReducer
}
