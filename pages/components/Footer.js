import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

export default class FooterTabs extends Component {

    render() {
        return (
            <Footer style={{ marginBottom: 0, height: 45 }}>
                <FooterTab style={{ backgroundColor: "#404040" }}>
                    <Button onPress={() => this.props.nav.navigate('Home')}>
                        <Text style={{ color: '#fff' }}>Home</Text>
                    </Button>
                    <Button onPress={() => this.props.nav.navigate('LoginForm')}>
                        <Text style={{ color: '#fff' }}>Logout</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}