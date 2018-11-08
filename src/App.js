import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import {reduxifyNavigator} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import {RootNavigator} from './navigation/navigation';
import {subscribeOnAuthStateChange} from './redux/actions';
import {configureStore} from './redux/store';


const store = configureStore();

export const AppNavigator = connect((state) => ({state: state.nav}))(reduxifyNavigator(RootNavigator, 'root'));

export default class App extends React.Component {


    componentDidMount() {
        store.dispatch(subscribeOnAuthStateChange());
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}
