import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import moment from 'moment';
import {Button, Content, Left, Right, Row, Switch, Text, View} from 'native-base';
import React, {Component} from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import DeviceInfo from 'react-native-device-info';
import {connect} from 'react-redux';
import {signOut} from '../redux/actions';
import {Container} from './Container';


export class MainScreenComponent extends Component {

    state = {
        enabled: false,
        events: []
    };

    eventId = 0;

    componentDidMount() {
        // Step 1:  Listen to events:
        BackgroundGeolocation.on('location', this.onLocation.bind(this));
        BackgroundGeolocation.on('heartbeat', this.onHeartbeat.bind(this));

        // Step 2:  #configure:
        BackgroundGeolocation.ready({
            // Geolocation options
            distanceFilter: 300,
            allowIdenticalLocations: true,

            // Application Options
            // [Application] Common Options
            stopOnTerminate: false,
            startOnBoot: true,
            heartbeatInterval: 60 * 30,

            // [Application] iOS Options
            // Enable this to prevent iOS from suspending your app in the background while in the stationary state.
            // Must be used in conjunction with a heartbeatInterval.
            preventSuspend: true,

            // [Application] Android Options
            foregroundService: true,
            notificationTitle: null,
            notificationText: null,

        }, (state) => {
            this.setState({
                enabled: state.enabled,
            });
        });
    }

    /**
     * @event location
     */
    onLocation(location) {
        console.log('[event] location: ', JSON.stringify(location, null, 2));
        this.addEvent('location', new Date(location.timestamp), location);
        MainScreenComponent.saveToFirebase(location);
    }

    /**
     * @event heartbeat
     */
    onHeartbeat(event) {
        console.log('[event] heartbeat: ', JSON.stringify(event, null, 2));
        this.addEvent('heartbeat', new Date(), event);
        MainScreenComponent.saveToFirebase(event.location);
    }

    onToggleEnabled() {
        let enabled = !this.state.enabled;
        this.setState({
            enabled: enabled,
            isMoving: false
        });
        if (enabled) {
            BackgroundGeolocation.start();
        } else {
            BackgroundGeolocation.stop();
        }
    };

    addEvent(name, date, object) {
        let event = {
            key: this.eventId++,
            name: name,
            timestamp: date.toLocaleTimeString(),
            json: JSON.stringify(object, null, 2)
        };
        let rs = this.state.events;
        rs.unshift(event);
        this.setState({
            events: rs
        });
    }

    static async saveToFirebase(location) {
        const uid = firebase.auth().currentUser.uid;
        const uniqueId = DeviceInfo.getUniqueID();
        const system = DeviceInfo.getSystemName();
        const version = DeviceInfo.getSystemVersion();
        const manufacturer = DeviceInfo.getManufacturer();
        const model = DeviceInfo.getModel();
        const deviceInfo = {
            type: DeviceInfo.getSystemName(),
            version: version,
            name: `${model}`,
            description: 'description ololo trololo ia voditel nlo',
            lastPoolTime: moment.utc().valueOf(),
        };

        await firebase.database().ref(`${uid}/devices/${uniqueId}/`).set(deviceInfo);

        await firebase.database().ref(`${uid}/metrics/${uniqueId}/`).set({
            activity: {type: 'string', label: 'Activity'},
            isBatteryCharging: {type: 'boolean', label: 'Is Battery Charging'},
            batteryLevel: {type: 'percent', label: 'Battery Level', unit: 'percent'},
            geolocation: {type: 'geolocation', label: 'Geolocation'},
            event: {type: 'string', label: 'Event'},
            isMoving: {type: 'boolean', label: 'Is Moving'},
            odometer: {type: 'number', label: 'Distance travelled', unit: 'm'},
        });

        await firebase.database().ref(`${uid}/pools/${uniqueId}/${location.uuid}`).set({
            activity: location.activity.type,
            isBatteryCharging: location.battery.is_charging,
            batteryLevel: location.battery.level,
            geolocation: location.coords,
            event: location.event,
            isMoving: location.is_moving,
            odometer: location.odometer,
            timestamp: moment(location.timestamp).utc().valueOf(),
            sendTimestamp: moment.utc().valueOf(),
        })
    }

    render() {

        const events = this.state.events.map((event) => (
            <View key={event.key} style={styles.listItem}>
                <Row style={styles.itemHeader}>
                    <Left style={{flex: 1}}><Text style={styles.eventName}>[event] {event.name}</Text></Left>
                    <Right><Text style={styles.eventTimestamp}>{event.timestamp}</Text></Right>
                </Row>
                <Row><Text style={styles.eventJson}>{event.json}</Text></Row>
            </View>
        ));

        return (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <View style={styles.userInfo}>
                        <Text>{this.props.user && this.props.user.email}</Text>
                        <Button transparent
                                style={styles.signOutButton}
                                onPress={this.props.signOut}>
                            <Text>Sign Out</Text>
                        </Button>
                    </View>
                    <View style={styles.toggleBackgroundService}>
                        <Text>
                            On/Off background service
                        </Text>
                        <Switch value={this.state.enabled} onValueChange={this.onToggleEnabled.bind(this)}/>
                    </View>
                    <View style={styles.list}>
                        {events}
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    content: {
        marginLeft: 30,
        marginRight: 30
    },
    userInfo: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    signOutButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleBackgroundService: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    //-------------------------------------------------------------
    //-------------------------------------------------------------
    //-------------------------------------------------------------

    listItem: {
        marginBottom: 10
    },
    itemHeader: {
        backgroundColor: '#d3d3d3',
        padding: 5
    },
    eventName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    eventTimestamp: {
        fontSize: 12
    },
    eventJson: {
        fontFamily: 'Courier New',
        fontSize: 12,
        color: '#000000'
    },
};

export const MainScreen = connect(({auth}) => ({
    user: auth.user
}), {signOut})(MainScreenComponent);
