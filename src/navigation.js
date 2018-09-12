import {createStackNavigator} from 'react-navigation';

import {HomeScreen} from './screens/HomeScreen/HomeScreen';
import {SignInScreen} from './screens/SignInScreen/SignInScreen';
import {SignUpScreen} from './screens/SignUpScreen/SignUpScreen';

export const RootNavigator = createStackNavigator(
    {
        Home: {screen: HomeScreen},
        SignIn: {screen: SignInScreen},
        SignUp: {screen: SignUpScreen}
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);
