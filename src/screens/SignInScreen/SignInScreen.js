import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Input, Item, Label, Text,} from 'native-base';
import {Container} from '../Container';
import {setParams} from '../../redux/actions/NavActions';


export class SignInScreenComponent extends Component {

    state = {
        email: '',
        password: ''
    };


    componentDidMount() {
        this.props.setParams({title: 'Sign In'})
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
    null,
    {setParams}
)(SignInScreenComponent);
