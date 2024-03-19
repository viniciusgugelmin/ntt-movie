import {createReducer, on} from '@ngrx/store';
import * as UsersActions from '../actions/user.actions';

export interface IUserReducer {
  name: string;
}

const initialState: IUserReducer = {
  name: ''
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.setName, (state, { name }) => ({ ...state, name }))
);
