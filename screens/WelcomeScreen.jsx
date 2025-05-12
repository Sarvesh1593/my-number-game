import React from 'react';
import { View,Text,Button,StyleSheet } from 'react-native';

const WelcomeScreen  = ({navigation}) =>{
    return (
    <View style = {styles.container}>
        <Text style = {styles.title} > Welcome to Number Guessing Game</Text>
        <Button title= "Start Game" onPress={() => navigation.navigate ('Game')} />
    </View> 
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container :{
        flex :1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#fff',
    },
    title : {
        fontSize : 24,
        marginBottom : 20,
        textAlign : 'center'
    },
});