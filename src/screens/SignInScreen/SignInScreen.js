import {Button, Content, Form, Text} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {email, required} from 'redux-form-validators'
import {renderInput} from '../../components/FormInput';
import {signIn} from '../../redux/actions/AuthActions';
import {setParams} from '../../redux/actions/NavActions';
import {Container} from '../Container';

export class SignInScreenComponent extends Component {

    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        this.props.setParams({title: 'Sign In'});
    }

    onSubmit = () => {
        if (this.props.valid) {
            this.props.signIn();
        }
    };

    renderEmailInput = renderInput({
        autoFocus: true,
        returnKeyType: 'next',
        onSubmitEditing: () => {
            this._passwordInput._root.focus()
        }
    });

    renderPasswordInput = renderInput({
        getRef: (c) => this._passwordInput = c,
        onSubmitEditing: this.onSubmit
    });

    render() {

        const {valid} = this.props;

        return (
            <Container>
                <Content padder>
                    <Form>
                        <Field name="email"
                               component={this.renderEmailInput}
                               label="Email"
                               type="email"
                               validate={[required(), email()]}
                        />
                        <Field name='password'
                               component={this.renderPasswordInput}
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

export const SignInScreen = reduxForm({form: 'signIn'})(
    connect(({auth}) => ({
        loading: auth.loading
    }), {setParams, signIn})(SignInScreenComponent)
);
