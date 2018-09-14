import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux';

import thunkMiddleware from 'redux-thunk';

import {
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

import {reducer as formReducer} from 'redux-form';


export const configureStore = (RootNavigator) => {

    const navReducer = createNavigationReducer(RootNavigator);

    const rootReducer = combineReducers({
        nav: navReducer,
        form: formReducer
    });

    const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware, reactNavigationReduxMiddleware)
    )

};
