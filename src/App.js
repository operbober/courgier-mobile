import React from 'react';
import {reduxifyNavigator} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import {RootNavigator} from './navigation/navigation';
import {configureStore} from './redux/store';

const store = configureStore(RootNavigator);
const AppNavigator = connect((state) => ({state: state.nav}))(reduxifyNavigator(RootNavigator, 'root'));

export default class App extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}
