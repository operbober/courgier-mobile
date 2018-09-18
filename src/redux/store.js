import firebase from 'firebase/app'
import {createNavigationReducer, createReactNavigationReduxMiddleware,} from 'react-navigation-redux-helpers';
import {applyMiddleware, combineReducers, createStore,} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import thunkMiddleware from 'redux-thunk';

import {firebaseAuthApi} from '../api/firebaseAuthApi';

import {authEpic} from './epics/AuthEpic';

import {authReducer} from './reducers';


export const configureStore = (RootNavigator) => {

    const config = {
        apiKey: 'AIzaSyC1CTWI6z_W4bNa2kFTOWr7dDr4Z9005J8',
        authDomain: 'reactnativeexpoexample.firebaseapp.com',
        databaseURL: 'https://reactnativeexpoexample.firebaseio.com',
        projectId: 'reactnativeexpoexample',
        storageBucket: 'reactnativeexpoexample.appspot.com',
        messagingSenderId: '840295461962'
    };
    firebase.initializeApp(config);

    const navReducer = createNavigationReducer(RootNavigator);

    const rootReducer = combineReducers({
        nav: navReducer,
        form: formReducer,
        auth: authReducer
    });

    const rootEpic = combineEpics(
        authEpic
    );

    const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware(
        'root',
        state => state.nav
    );
    const epicMiddleware = createEpicMiddleware({
        dependencies: {
            authApi: firebaseAuthApi
        }
    });

    const store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware, epicMiddleware, reactNavigationReduxMiddleware)
    );

    epicMiddleware.run(rootEpic);

    return store;
};
