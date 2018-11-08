import {createReactNavigationReduxMiddleware,} from 'react-navigation-redux-helpers';
import {applyMiddleware, createStore,} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import thunkMiddleware from 'redux-thunk';
import {firebaseApi} from '../api/firebaseApi';
import {rootEpic} from './epics';
import {rootReducer} from './reducers';


export const configureStore = () => {

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

    return store;
};
