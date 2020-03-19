import React, { Component } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

export default class FooterTabsExample extends Component {

    render() {
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: "#425A78" }}>
                    <Button style={{ backgroundColor: "#687B93" }} active>
                        <Text>Home</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('LoginForm')}>
                        <Text>Login</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}