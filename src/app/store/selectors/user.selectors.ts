import { createSelector, createFeatureSelector } from '@ngrx/store';
import {IUserReducer} from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<IUserReducer>('user');

export const selectUserName = createSelector(
  selectUserState,
  state => state.name
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.isLoading
);

export const selectUserError = createSelector(
  selectUserState,
  state => state.error
);
