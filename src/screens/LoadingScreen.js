import {Content, Spinner} from 'native-base';
import React from 'react';
import {Container} from './Container';

export function LoadingScreen() {
    return (
        <Container>
            <Content contentContainerStyle={styles.content}>
                <Spinner size={75}/>
            </Content>
        </Container>
    );
}

const styles = {
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
