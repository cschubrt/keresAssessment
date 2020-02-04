import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
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
import Tabs from '../pages/tabs/index';

import FirstPage from '../pages/tabs/TabHome';
import SecondPage from '../pages/tabs/SecondPage';
import Three from '../pages/tabs/TabHome';
import Four from '../pages/tabs/SecondPage';
import Five from '../pages/tabs/TabHome';
import SixSix from '../pages/tabs/SecondPage';

const TabScreen = createMaterialTopTabNavigator(
    {
      info: { screen: FirstPage },
      observations: { screen: SecondPage },
      'validation': { screen: Three },
      'bulding': { screen: Four },
      'site': { screen: Five },
      'tower': { screen: SixSix },
      'tank': { screen: Five }
    },
    {
      tabBarPosition: 'top',
      swipeEnabled: true,
      scrollEnabled: true,
      animationEnabled: true,
      allowFontScaling: true,
      tabBarOptions: {
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#40546b',
        },
        labelStyle: {
          textAlign: 'left',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      },
    }
  );

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
    },
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#40546b',
          title: 'TabExample',
        },
      },
})

const AppContainer = createAppContainer(HomeStack)

export default AppContainer