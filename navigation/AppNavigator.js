import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../pages/Home';
import Browser from '../pages/Browser';
import LoginForm from '../pages/LoginForm';
import UpdateApp from '../pages/UpdateApp';
import ViewAllUser from '../pages/ViewAllUser';
import AssessmentHome from '../pages/assessment/AssessmentHome';
import ListView from '../pages/assessment/ListView';
import AgencyList from '../pages/assessment/AgencyList';
import AssessmentList from '../pages/assessment/AssessmentList';
import FormIndex from '../pages/assessment/form/index';
import Info from '../pages/assessment/form/Info';
import Observations from '../pages/assessment/form/Observations';
import ValidationData from '../pages/assessment/form/ValidationData';
import BuildingData from '../pages/assessment/form/BuildingData';
import SiteData from '../pages/assessment/form/SiteData';
import TowerData from '../pages/assessment/form/TowerData';
import TankData from '../pages/assessment/form/TankData';

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
    FormIndex: {
        screen: FormIndex,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessment',
            headerTintColor: '#40546b'
        })
    },
    Info: {
        screen: Info,
        navigationOptions: ({ navigation }) => ({
            title: 'Info',
            headerTintColor: '#40546b'
        })
    },
    Observations: {
        screen: Observations,
        navigationOptions: ({ navigation }) => ({
            title: 'Observations',
            headerTintColor: '#40546b'
        })
    },
    ValidationData: {
        screen: ValidationData,
        navigationOptions: ({ navigation }) => ({
            title: 'Validation Data',
            headerTintColor: '#40546b'
        })
    },
    BuildingData: {
        screen: BuildingData,
        navigationOptions: ({ navigation }) => ({
            title: 'Building Data',
            headerTintColor: '#40546b'
        })
    },
    SiteData: {
        screen: SiteData,
        navigationOptions: ({ navigation }) => ({
            title: 'Site Data',
            headerTintColor: '#40546b'
        })
    },
    TowerData: {
        screen: TowerData,
        navigationOptions: ({ navigation }) => ({
            title: 'Tower Data',
            headerTintColor: '#40546b'
        })
    },
    TankData: {
        screen: TankData,
        navigationOptions: ({ navigation }) => ({
            title: 'Tank Data',
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