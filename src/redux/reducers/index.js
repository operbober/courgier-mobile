import {createNavigationReducer} from "react-navigation-redux-helpers";
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {RootNavigator} from '../../navigation/navigation';
import {authReducer} from './AuthReducer'

const navReducer = createNavigationReducer(RootNavigator);

export const rootReducer =  combineReducers({
    nav: navReducer,
    form: formReducer,
    auth: authReducer
});
