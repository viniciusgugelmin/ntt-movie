import { createAction, props } from '@ngrx/store';

export const setName = createAction("[User] Set Name", props<{ name: string }>());
export const getName = createAction("[User] Get Name");
export const getNameSuccess = createAction("[User] Get Name Success", props<{ name: User.Properties['name'] }>());
export const getNameFailure = createAction("[User] Get Name Failure", props<{ error: any }>());
