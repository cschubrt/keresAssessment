/*import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

export default class ActionBarImage extends Component {
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <Image
                        source={require('../../assets/drawer.png')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            marginLeft: 15,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}*/