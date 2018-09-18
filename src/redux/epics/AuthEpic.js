import {formValueSelector, reset} from 'redux-form';
import {combineEpics, ofType} from 'redux-observable';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {SIGN_IN_REQUEST, signInFailure, signInSuccess} from '../actions/AuthActions';
import {Alert} from 'react-native';


const signInFormSelector = formValueSelector('signIn');

const signInEpic = (action$, store$, {authApi}) => action$.pipe(
    ofType(SIGN_IN_REQUEST),
    switchMap(() => {
            const state = store$.value;
            const {email, password} = signInFormSelector(state, 'email', 'password');
            return authApi.signIn(email, password).pipe(
                map(({user}) => {
                    return signInSuccess(user);
                }),
                catchError(err => {
                    console.log(err);
                    let message = (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
                        ? 'Unrecognized email or password'
                        : err.message;
                    Alert.alert('Error', message);
                    return of(signInFailure(), reset('signIn'));
                })
            )
        }
    )
);

export const authEpic = combineEpics(signInEpic);
