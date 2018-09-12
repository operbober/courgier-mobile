import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import logo from './logo.png';

export class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>COURGIER</Text>
                <Image style={styles.image} source={logo} resizeMethod={'scale'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontWeight: "bold",
        color: "#FFC91A",
        fontSize: 40
    },
    image: {
        width: 140,
        height: 110,
    }
});
