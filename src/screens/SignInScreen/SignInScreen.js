import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {email, required} from 'redux-form-validators'
import {Button, Content, Form, Text} from 'native-base';
import {Container} from '../Container';
import {setParams} from '../../redux/actions/NavActions';
import {renderInput} from '../../components/FormInput';


export class SignInScreenComponent extends Component {

    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        this.props.setParams({title: 'Sign In'});
    }

    onSubmit() {
        console.log('hi!');
    };

    render() {

        const {valid} = this.props;

        return (
            <Container>
                <Content padder>
                    <Form>
                        <Field
                            name="email"
                            component={renderInput({
                                autoFocus: true,
                                returnKeyType: 'next',
                                onSubmitEditing: () => {
                                    this._passwordInput._root.focus()
                                }
                            })}
                            label="Email"
                            type="email"
                            validate={[required(), email()]}
                        />
                        <Field name='password'
                               component={renderInput({
                                   getRef: (c) => this._passwordInput = c,
                                   onSubmitEditing: this.onSubmit
                               })}
                               label='Password'
                               type='password'
                               validate={[required()]}
                        />
                        <Button block disabled={!valid} style={{margin: 15, marginTop: 50}}
                                onPress={this.onSubmit}>
                            <Text>Sign In</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export const SignInScreen = reduxForm({
    form: 'signIn'
})(
    connect(null, {setParams})(SignInScreenComponent)
);
