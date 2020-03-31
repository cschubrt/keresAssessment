import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../pages/Home';
import Browser from '../pages/Browser';
import LoginForm from '../pages/LoginForm';
import UpdateApp from '../pages/UpdateApp';
import ViewAllUser from '../pages/ViewAllUser';
import Info from '../pages/assessment/form/Info';
import FormIndex from '../pages/assessment/form/index';
import Upload from '../pages/assessment/form/Upload';
import AssessmentHome from '../pages/assessment/Index';
import ClientList from '../pages/assessment/ClientList';
import AgencyList from '../pages/assessment/AgencyList';
import TankData from '../pages/assessment/form/TankData';
import SiteData from '../pages/assessment/form/SiteData';
import TowerData from '../pages/assessment/form/TowerData';
import BuildingData from '../pages/assessment/form/BuildingData';
import AssessmentList from '../pages/assessment/AssessmentList';
import Observations from '../pages/assessment/form/Observations';
import ValidationData from '../pages/assessment/form/ValidationData';

let textColor = '#F0F0F0';
let headerColor = '#404040';
let headerHeight = 45;

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    Browser: {
        screen: Browser,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.title,
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    LoginForm: {
        screen: LoginForm,
        navigationOptions: ({ navigation }) => ({
            title: 'Login',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    AssessmentHome: {
        screen: AssessmentHome,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessments',
            headerTintColor: textColor,
            headerShown: false,
            headerStyle: {
                backgroundColor: headerColor
            }
        })
    },
    ClientList: {
        screen: ClientList,
        navigationOptions: ({ navigation }) => ({
            title: 'Clients',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    AgencyList: {
        screen: AgencyList,
        navigationOptions: ({ navigation }) => ({
            title: 'Agencies',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    AssessmentList: {
        screen: AssessmentList,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessment List',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    FormIndex: {
        screen: FormIndex,
        navigationOptions: ({ navigation }) => ({
            title: 'Assessment',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    Info: {
        screen: Info,
        navigationOptions: ({ navigation }) => ({
            title: 'Info',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    Observations: {
        screen: Observations,
        navigationOptions: ({ navigation }) => ({
            title: 'Observations',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    ValidationData: {
        screen: ValidationData,
        navigationOptions: ({ navigation }) => ({
            title: 'Validation Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    BuildingData: {
        screen: BuildingData,
        navigationOptions: ({ navigation }) => ({
            title: 'Building Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    SiteData: {
        screen: SiteData,
        navigationOptions: ({ navigation }) => ({
            title: 'Site Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    TowerData: {
        screen: TowerData,
        navigationOptions: ({ navigation }) => ({
            title: 'Tower Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    TankData: {
        screen: TankData,
        navigationOptions: ({ navigation }) => ({
            title: 'Tank Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    UpdateApp: {
        screen: UpdateApp,
        navigationOptions: ({ navigation }) => ({
            title: 'Update',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    ViewAllUser: {
        screen: ViewAllUser,
        navigationOptions: ({ navigation }) => ({
            title: 'ViewAllUser Data',
            headerTintColor: textColor,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    },
    Upload: {
        screen: Upload,
        navigationOptions: ({ navigation }) => ({
            title: 'Upload Data',
            headerTintColor: textColor,
            headerShown: false,
            headerStyle: {
                backgroundColor: headerColor,
                height: headerHeight
            }
        })
    }
})

const AppContainer = createAppContainer(HomeStack)

export default AppContainer