import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {MainScreen} from '../screens/MainScreen';
import {SignInScreen} from '../screens/SignInScreen/SignInScreen';
import {SignUpScreen} from '../screens/SignUpScreen/SignUpScreen';

const authStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            key: 'Home',
        },
        SignIn: {
            screen: SignInScreen,
            key: 'SignIn',
            params: {
                title: 'Sing In',
                back: true
            }
        },
        SignUp: {
            screen: SignUpScreen,
            key: 'SignOut',
            params: {
                title: 'Sing Up',
                back: true
            }
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

export const RootNavigator = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        Main: MainScreen,
        Auth: authStack
    },
    {
        initialRouteName: 'Loading'
    }
);
