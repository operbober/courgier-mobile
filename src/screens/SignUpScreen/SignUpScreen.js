import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Input, Item, Label, Text} from 'native-base';
import {Container} from '../Container';
import {setParams} from '../../redux/actions/NavActions';

export class SignUpScreenComponent extends Component {


    componentDidMount() {
        this.props.setParams({title: 'Sign Up'})
    }

    render() {
        return (
            <Container title={'Sign Up'} showBackButton>
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

export const SignUpScreen = connect(null, {setParams})(SignUpScreenComponent);
