import {createNavigationReducer, createReactNavigationReduxMiddleware,} from 'react-navigation-redux-helpers';
import {applyMiddleware, combineReducers, createStore,} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import {firebaseApi} from '../api/firebaseApi';
import {subscribeOnAuthStateChange} from './actions/AuthActions';
import {authEpic} from './epics/AuthEpic';
import {authReducer} from './reducers';


export const configureStore = (RootNavigator) => {

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
            authApi: firebaseApi
        }
    });

    const store = createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware, epicMiddleware, reactNavigationReduxMiddleware)
    );

    epicMiddleware.run(rootEpic);

    firebaseApi.initializeApp();
    store.dispatch(subscribeOnAuthStateChange());

    return store;
};
