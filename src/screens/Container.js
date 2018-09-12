import React from 'react';
import {Container as NbContainer, Body, Button, Content, Header, Icon, Left, Right, Title} from 'native-base';

export class Container extends React.Component {
    render() {
        console.log(this.props);
        const {children, goBack, title} = this.props;
        return (
            <NbContainer style={styles.container}>
                <Header transparent>
                    {goBack &&
                    <Left>
                        <Button transparent
                                style={styles.backButton}
                                onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    }
                    {title &&
                        <Body>
                            <Title style={styles.title}>{title}</Title>
                        </Body>
                    }
                    <Right/>
                </Header>
                <Content>
                    {children}
                </Content>
            </NbContainer>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
    },
    backButton: {
        color: '#101'
    },
    title: {
        color: '#101',
        textAlign: 'center'
    }
};
