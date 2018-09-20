import {Button, Form, Input, Item, Label, Text} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from '../Container';

export class SignUpScreenComponent extends Component {

    render() {
        return (
            <Container title={'Sign Up'} back={true}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input secureTextEntry/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>Repeat Password</Label>
                        <Input secureTextEntry/>
                    </Item>
                    <Button block style={{margin: 15, marginTop: 50}}>
                        <Text>Sign Up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

export const SignUpScreen = connect()(SignUpScreenComponent);
