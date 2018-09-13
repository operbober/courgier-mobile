import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux';

import {
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

export const configureStore = (RootNavigator) => {

    const navReducer = createNavigationReducer(RootNavigator);

    const rootReducer = combineReducers({
        nav: navReducer
    });

    const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

    return createStore(
        rootReducer,
        applyMiddleware(reactNavigationReduxMiddleware)
    )

};
