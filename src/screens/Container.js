import {Body, Button, Container as NbContainer, Header, Icon, Title} from 'native-base';
import React from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../redux/actions/NavActions';

class ContainerComponent extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        this.props.goBack();
        return true;
    };

    render() {
        const {title, nav} = this.props;

        return (
            <NbContainer style={styles.container}>
                <StatusBar hidden={true}/>
                <Header transparent>
                    <Body style={styles.headerBody}>
                    {nav.index > 0 &&
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
            title: params && params.title
        }
    },
    {goBack}
)(ContainerComponent);
