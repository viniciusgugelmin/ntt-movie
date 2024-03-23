import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {UserService} from "../../services/user.service";
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  setName$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.setName),
    mergeMap(({name}) => this.userService.setName(name)
      .pipe(
        map(() => UserActions.getNameSuccess({name})),
        catchError(error => of(UserActions.getNameFailure({error}))
      )
    )
  )));

  getName$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getName),
    mergeMap(() => this.userService.getName()
      .pipe(
        map(name => UserActions.getNameSuccess({name})),
        catchError(error => of(UserActions.getNameFailure({error})))
      )
    )
  ));
}
