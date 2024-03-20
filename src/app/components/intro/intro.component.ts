import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IUserReducer} from "../../store/reducers/user.reducer";
import {Observable, Subscription} from "rxjs";
import * as UserSelectors from "../../store/selectors/user.selectors";
import * as UserActions from "../../store/actions/user.actions";
import {InputComponent} from "../../layouts/input/input.component";
import {AsyncPipe} from "@angular/common";
import {ButtonComponent} from "../../layouts/button/button.component";
import {Router} from '@angular/router';
import { getRoutePath} from "../../app.routes";

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    InputComponent,
    AsyncPipe,
    ButtonComponent
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit, OnDestroy {
  userName$: Observable<User.Properties['name']> = new Observable<User.Properties['name']>();
  userNameSubscription: Subscription = new Subscription();
  userName: User.Properties['name'] = '';

  constructor(private store: Store<IUserReducer>, private router: Router) {
  }

  ngOnInit(): void {
    this.userName$ = this.store.select(UserSelectors.selectUserName);
    this.userNameSubscription = this.userName$.subscribe((name: User.Properties['name']) => {
      this.userName = name;
    });
  }

  ngOnDestroy(): void {
    this.userNameSubscription.unsubscribe();
  }

  onNameChange(event: any) {
    this.userName = event;
  }

  onSubmit(event: any): void {
    this.userName = '';
    this.store.dispatch(UserActions.setName({name: this.userName}));

    this.router.navigate([getRoutePath('Movies')]);
  }
}
