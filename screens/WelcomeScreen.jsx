import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title} >IT GUESSES</Text>
            <TouchableHighlight style={styles.touchable} onPress={() =>navigation.navigate('Game')}>
                <Text style={styles.button}>Play</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.touchable}>
                <Text style={styles.button}>INSTRUCTIONS</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.touchable}>
                <Text style={styles.button}>CLUES</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.touchable}>
                <Text style={styles.button}>EXIT</Text>
            </TouchableHighlight>

            <Text style = {styles.text}>Headphones Recommended</Text>
            <Text >SOUNDTRACK</Text>
            <Text></Text>
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        marginBottom: 10,
        marginTop: 25,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'gray'
    },
    button: {
        fontSize: 25,
        color: 'gray',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 5,
        paddingTop: 5,
        margin: 5,
        borderWidth: 3,
        borderColor: 'gray'
    },
    touchable: {
        alignSelf: 'center'
    },
    text : {
        fontSize : '18',
        color: '#fff',
    }
});