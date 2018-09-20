import {Button, Content, Form, Text, Spinner} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {email, required} from 'redux-form-validators'
import {renderInput} from '../../components/FormInput';
import {signIn} from '../../redux/actions/AuthActions';
import {Container} from '../Container';

export class SignInScreenComponent extends Component {

    state = {
        email: '',
        password: ''
    };

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

        const {valid, loading} = this.props;

        return (
            <Container title='Sign In' back={true}>
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
                        <Button block disabled={!valid || loading} style={{margin: 15, marginTop: 50}}
                                onPress={this.onSubmit}>
                            {loading
                                ? <Spinner color='#fff'/>
                                : <Text>Sign In</Text>
                            }
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
    }), {signIn})(SignInScreenComponent)
);
