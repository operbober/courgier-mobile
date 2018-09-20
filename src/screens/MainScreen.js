import {Button, Content, Text} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../redux/actions';
import {Container} from './Container';

export class MainScreenComponent extends Component {
    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{this.props.user && this.props.user.email}</Text>
                    <Button transparent
                            style={styles.signOutButton}
                            onPress={this.props.signOut}>
                        <Text>Sign Out</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = {
    signOutButton: {
        marginBottom: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export const MainScreen = connect(({auth}) => ({user: auth.user}), {signOut})(MainScreenComponent);
