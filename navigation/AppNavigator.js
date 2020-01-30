import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../pages/Home';
import Browser from '../pages/Browser';
import LoginForm from '../pages/LoginForm';
import UpdateApp from '../pages/UpdateApp';
import ViewAllUser from '../pages/ViewAllUser';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerTintColor: '#133156'
        })
    },
    Browser: {
        screen: Browser,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.title,
            headerTintColor: '#40546b'
        })
    },
    LoginForm: {
        screen: LoginForm,
        navigationOptions: ({ navigation }) => ({
            title: 'Login Form',
            headerTintColor: '#40546b'
        })
    },
    UpdateApp: {
        screen: UpdateApp,
        navigationOptions: ({ navigation }) => ({
            title: 'Update',
            headerTintColor: '#40546b'
        })
    },
    ViewAllUser: {
        screen: ViewAllUser,
        navigationOptions: ({ navigation }) => ({
            title: 'ViewAllUser Data',
            headerTintColor: '#40546b'
        })
    }
})

const AppContainer = createAppContainer(HomeStack)

export default AppContainer