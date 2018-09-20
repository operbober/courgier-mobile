import {Alert} from 'react-native';
import {formValueSelector, reset} from 'redux-form';
import {combineEpics, ofType} from 'redux-observable';
import {of} from 'rxjs';
import {catchError, first, map, switchMap} from 'rxjs/operators';
import {
    authStateChange,
    navigate,
    SIGN_IN_REQUEST,
    SIGN_OUT,
    signInFailure,
    signInSuccess,
    SUBSCRIBE_ON_AUTH_STATE_CHANGE
} from '../actions';

const authStateChangeEpic = (action$, store$, {authApi}) => action$.pipe(
    ofType(SUBSCRIBE_ON_AUTH_STATE_CHANGE),
    switchMap(() => authApi.subscribeOnAuthStateChange().pipe(
        first(),
        switchMap(user => {
            return of(authStateChange(user), navigate(user ? 'Main' : 'Auth'))
        }),
    ))
);

const signInEpic = (action$, store$, {authApi}) => action$.pipe(
    ofType(SIGN_IN_REQUEST),
    switchMap(() => {
            const state = store$.value;
            const {email, password} = formValueSelector('signIn')(state, 'email', 'password');
            return authApi.signIn(email, password).pipe(
                switchMap(({user}) => {
                    return of(signInSuccess(user), navigate('Main'));
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

const signOutEpic = (action$, store$, {authApi}) => action$.pipe(
    ofType(SIGN_OUT),
    switchMap(() => authApi.signOut().pipe(
        map(() => navigate('Auth'))
    ))
);

export const authEpic = combineEpics(authStateChangeEpic, signInEpic, signOutEpic);
