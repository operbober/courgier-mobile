import {Button, Text, View} from 'native-base';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux';
import {Logo} from '../../components/Logo/Logo';
import {Container} from '../Container'


class HomeScreenComponent extends Component {
    render() {
        return (
            <Container>
                <View style={styles.content}>
                    <Logo/>
                    <Button block
                            style={styles.signInButton}
                            onPress={() => this.props.navigate('SignIn')}>
                        <Text>Sign in to your account</Text>
                    </Button>
                    <Text>or</Text>
                    <Button transparent
                            style={styles.signUpButton}
                            onPress={() => this.props.navigate('SignUp')}>
                        <Text>Sign Up</Text>
                    </Button>
                </View>
            </Container>
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

export const HomeScreen = connect(
    null,
    dispatch => ({
        navigate: (route) => dispatch(NavigationActions.navigate({routeName: route}))
    })
)(HomeScreenComponent);
