import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../pages/Home';
import Browser from '../pages/Browser';
import LoginForm from '../pages/LoginForm';
import UpdateApp from '../pages/UpdateApp';
import ViewAllUser from '../pages/ViewAllUser';
import AssessmentHome from '../pages/assessment/Index';
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

let textColor = '#133156';
let headerColor = '#F0F0F0';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    Browser: {
        screen: Browser,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.title,
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    LoginForm: {
        screen: LoginForm,
        navigationOptions: ({ navigation }) => ({
            title: 'Login',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    AssessmentHome: {
        screen: AssessmentHome,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessments',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    ListView: {
        screen: ListView,
        navigationOptions: ({ navigation }) => ({
            title: 'Clients',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    AgencyList: {
        screen: AgencyList,
        navigationOptions: ({ navigation }) => ({
            title: 'Agencies',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    AssessmentList: {
        screen: AssessmentList,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessment List',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    FormIndex: {
        screen: FormIndex,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessment',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    Info: {
        screen: Info,
        navigationOptions: ({ navigation }) => ({
            title: 'Info',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    Observations: {
        screen: Observations,
        navigationOptions: ({ navigation }) => ({
            title: 'Observations',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    ValidationData: {
        screen: ValidationData,
        navigationOptions: ({ navigation }) => ({
            title: 'Validation Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    BuildingData: {
        screen: BuildingData,
        navigationOptions: ({ navigation }) => ({
            title: 'Building Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    SiteData: {
        screen: SiteData,
        navigationOptions: ({ navigation }) => ({
            title: 'Site Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    TowerData: {
        screen: TowerData,
        navigationOptions: ({ navigation }) => ({
            title: 'Tower Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    TankData: {
        screen: TankData,
        navigationOptions: ({ navigation }) => ({
            title: 'Tank Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    UpdateApp: {
        screen: UpdateApp,
        navigationOptions: ({ navigation }) => ({
            title: 'Update',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    ViewAllUser: {
        screen: ViewAllUser,
        navigationOptions: ({ navigation }) => ({
            title: 'ViewAllUser Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    }
})

const AppContainer = createAppContainer(HomeStack)

export default AppContainer