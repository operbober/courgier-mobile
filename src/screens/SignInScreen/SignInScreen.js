import React, {Component} from 'react';
import {connect}from 'react-redux';
import {NavigationActions} from 'react-navigation';

import {Button, Form, Input, Item, Label, Text,} from 'native-base';
import {Container} from '../Container';


export class SignInScreenComponent extends Component {

    state = {
        email: '',
        password: ''
    };


    componentDidMount() {
        console.log(this.props.route);
        this.props.setScreenParams(this.props.route.key)
    }


    render() {
        return (
            <Container>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry/>
                    </Item>
                    <Button block style={{margin: 15, marginTop: 50}}>
                        <Text>Sign In</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

export const SignInScreen = connect(
    (state) => ({
        route: state.nav.routes[state.nav.index]
    }),
    dispatch => ({
        setScreenParams: (key) => dispatch(NavigationActions.setParams({
            params: {
                title: 'Sign In',
                showBackButton: true
            },
            key: key
        }))
    })
)(SignInScreenComponent);
