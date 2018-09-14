import React from 'react'
import {Icon, Input, Item, Label} from 'native-base';


export const renderInput = (inputProps) => ({input, label, type, meta: {touched, error}}) => {

    return (
        <Item floatingLabel error={!!error}>
            <Label>
                {label}
            </Label>
            <Input {...input}
                   {...inputProps}
                   secureTextEntry={type === 'password'}
                   keyboardType={type === 'email' ? 'email-address' : 'default'}
            />
            {touched && error && <Icon style={{fontSize: 11}}>{error}</Icon>}
        </Item>
    )
};
