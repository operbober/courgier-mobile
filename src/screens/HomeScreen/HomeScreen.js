import React, {Component} from 'react';
import {Button, Text, View} from 'native-base';
import {Logo} from '../../components/Logo/Logo';


export class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.content}>
                <Logo/>
                <Button block
                        style={styles.signInButton}
                        onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text>Sign in to your account</Text>
                </Button>
                <Text>or</Text>
                <Button transparent
                        style={styles.signUpButton}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text>Sign Up</Text>
                </Button>
            </View>
        );
    }
}

const styles = {
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInButton: {
        margin: 15
    },
    signUpButton: {
        marginBottom: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
};
