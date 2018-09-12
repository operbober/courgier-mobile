import React, {Component} from 'react';
import {Button, Form, Input, Item, Label, Text,} from 'native-base';


export class SignInScreen extends Component {

    state = {
        email: '',
        password: ''
    };

    render() {
        return (
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
        );
    }
}
