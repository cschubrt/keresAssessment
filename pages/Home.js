import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [
                { title: 'Keres Assessment Server', link: 'https://cschubert.serviceseval.com/keres_framework' }
            ],
            connection_Status: "",
            connection: true
        }
    }

    componentDidMount() {
        NetInfo.addEventListener(connected => {
            if (connected.isConnected == true) {
                this.setState({
                    connection_Status: "Online",
                    connection: true
                })
            } else {
                this.setState({
                    connection_Status: "Offline",
                    connection: false
                })
            }
        });
    }

    keresButton() {
        if (this.state.connection) {
            return this.state.links.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => this.handleButtonPress(item)}
                    style={styles.button}
                >
                    <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
            ));
        }
    }

    updateButton() {
        if (this.state.connection) {
            return <TouchableOpacity style={styles.button} onPress={() => this.handlePress('UpdateApp')}>
                <Text style={styles.text}>Update App</Text>
            </TouchableOpacity>
        }
    }

    handleButtonPress(item) {
        const { title, link } = item
        this.props.navigation.navigate('Browser', { title, link })
    }

    handlePress(prs) {
        this.props.navigation.navigate(prs);
    }

    LoadingIndicatorView() {
        return <ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} />
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    {this.LoadingIndicatorView()}
                </View>
            );
        }
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                <View>
                    <ScrollView keyboardShouldPersistTaps="handled">

                        <Text style={{ textAlign: 'center', fontSize: 25, color: '#40546b', paddingTop: 30 }}>
                            Welcome {this.state.connection_Status}
                        </Text>

                        {this.keresButton()}

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('LoginForm')}>
                            <Text style={styles.text}>Assessment Login</Text>
                        </TouchableOpacity>

                        {this.updateButton()}

                        <TouchableOpacity style={styles.button} onPress={() => this.handlePress('ViewAllUser')}>
                            <Text style={styles.text}>View All</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        backgroundColor: '#133156',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        padding: 2,
        fontSize: 17
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Home