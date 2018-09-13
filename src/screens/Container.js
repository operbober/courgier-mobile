import React from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Body, Button, Container as NbContainer, Header, Icon, Title} from 'native-base';

class ContainerComponent extends React.Component {
    render() {

        console.log(this.props.nav);
        const {title, showBackButton} = this.props;

        return (
            <NbContainer style={styles.container}>
                <Header transparent>
                    <Body style={styles.headerBody}>
                    {showBackButton &&
                        <Button transparent style={styles.backButton} onPress={this.props.goBack}>
                            <Icon style={styles.backButtonIcon} name="arrow-back"/>
                        </Button>
                    }
                    <Title style={styles.title}>{title || ''}</Title>
                    </Body>
                </Header>
                {this.props.children}
            </NbContainer>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
    },
    headerBody: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        // position: 'absolute',
        // top: '50%',
        // transform: `translateY(${50}%)` ,
        // left: 0,
    },
    backButtonIcon: {
        color: '#101',
    },
    title: {
        color: '#101',
    }
};

export const Container = connect(
    (state) => {
        let params = state.nav.routes[state.nav.index].params;
        return {
            nav: state.nav,
            showBackButton: params && params.showBackButton,
            title: params && params.title
        }
    },
    (dispatch) => ({
        goBack: () => dispatch(NavigationActions.back())
    })
)(ContainerComponent);
