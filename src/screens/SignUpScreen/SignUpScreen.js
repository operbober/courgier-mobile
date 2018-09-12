import React, {Component} from 'react';
import {Button, Form, Input, Item, Label, Text} from 'native-base';


export class SignUpScreen extends Component {
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
                <Item floatingLabel last>
                    <Label>Repeat Password</Label>
                    <Input secureTextEntry/>
                </Item>
                <Button block style={{margin: 15, marginTop: 50}}>
                    <Text>Sign Up</Text>
                </Button>
            </Form>
        );
    }
}
