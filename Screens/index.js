import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import HomeScreen from './Home'
import LoginScreen from './Login'
import Services from './Services'
import CreateCompanyScreen from './CreateCompany'
import Login1 from './Login1';

const Logout = () => {
    return(
        <Button
        onPress={()=> console.log("Hello")}
        title="Logout"
         />
    )
}

export {
    HomeScreen,
    LoginScreen,
    Login1,
    Services,
    CreateCompanyScreen,
    Logout
}