import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';
import Home from '../pages/Home';
import Browser from '../pages/Browser';
import LoginForm from '../pages/LoginForm';
import UpdateApp from '../pages/UpdateApp';
import ViewAllUser from '../pages/ViewAllUser';
import AssessmentHome from '../pages/assessment/AssessmentHome';
import ListView from '../pages/assessment/ListView';
import AgencyList from '../pages/assessment/AgencyList';
import AssessmentList from '../pages/assessment/AssessmentList';

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
    AssessmentHome: {
        screen: AssessmentHome,
        navigationOptions: ({ navigation }) => ({
            title: 'Start',
            headerTintColor: '#40546b'
        })
    },
    ListView: {
        screen: ListView,
        navigationOptions: ({ navigation }) => ({
            title: 'Clients',
            headerTintColor: '#40546b'
        })
    },
    AgencyList: {
        screen: AgencyList,
        navigationOptions: ({ navigation }) => ({
            title: 'Agencies',
            headerTintColor: '#40546b'
        })
    },
    AssessmentList: {
        screen: AssessmentList,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessment List',
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