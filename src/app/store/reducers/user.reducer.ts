import {createReducer, on} from '@ngrx/store';
import * as UsersActions from '../actions/user.actions';

export interface IUserReducer {
  name: string;
  isLoading: boolean;
  error: any;
}

const initialState: IUserReducer = {
  name: '',
  isLoading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.setName, (state, {name}) => ({...state, name})),
  on(UsersActions.getName, (state) => ({...state, isLoading: true, error: null})),
  on(UsersActions.getNameSuccess, (state, {name}) => ({...state, name, isLoading: false})),
  on(UsersActions.getNameFailure, (state, {error}) => ({...state, error, isLoading: false}))
);
