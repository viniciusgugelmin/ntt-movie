import { createAction, props } from '@ngrx/store';

export const setName = createAction("[User] Set Name", props<{ name: string }>());
