import { createSelector, createFeatureSelector } from '@ngrx/store';
import {IUserReducer} from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<IUserReducer>('user');

export const selectUserName = createSelector(
  selectUserState,
  state => state.name
);
