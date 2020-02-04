//This is an example of React Native Tab
import React from 'react';
//import react in our code.
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import FirstPage from './TabHome';
import SecondPage from './SecondPage';

const TabScreen = createMaterialTopTabNavigator(
    {
        Home: { screen: FirstPage },
        Settings: { screen: SecondPage },
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#425A78',
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    }
);

//making a StackNavigator to export as default
const TabStack = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            headerShown: false
        },
    },
});
//export default createAppContainer(TabStack);
const TabContainer = createAppContainer(TabStack)

export default TabContainer