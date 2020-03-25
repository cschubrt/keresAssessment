import React, { Component } from 'react';
import styles from '../styles/styles';
import Loader from './components/Loader';
//import Footer from './components/Footer';
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection_Status: '',
            connection: true,
            links: [
                { title: 'Keres Assessment Server', link: 'https://cschubert.serviceseval.com/keres_fca' }
            ]
        }
    }

    componentDidMount() {
        NetInfo.addEventListener(connected => {
            if (connected.isConnected == true) {
                this.updateUserData();
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

    //determine function to use
    checkExist(user_name, user_password) {
        db.transaction(tx => {
            tx.executeSql('SELECT user_name FROM users_table WHERE user_name = ?',
                [user_name],
                (tx, results) => {
                    var len = results.rows.length;
                    if (len > 0) {
                        this.updateUser(user_name, user_password);
                    } else {
                        this.insertUser(user_name, user_password);
                    }
                }
            );
        });
    }

    insertUser = (user_name, user_password) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO users_table(user_name, user_pass) VALUES (?,?);',
                [user_name, user_password],
                (tx, results) => { }
            );
        });
    };

    //UPDATE EXISTING USER PASSWORD
    updateUser = (user_name, user_password) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE users_table SET user_password = ? WHERE user_name = ?',
                [user_name, user_password],
                (tx, results) => { }
            );
        });
    };

    updateUserData() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_fca/app/fetchUser.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: '58PvahBTd'
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson
                    })
                    var obj = this.state.dataSource;
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            var val = obj[key];
                            //insert users from server DB
                            this.checkExist(val['user_uname'], val['user_pass2']);
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
        catch (error) {
            console.log(error);
        }
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

    render() {
        if (this.state.isLoading) {
            return (<Loader />);
        }
        return (
            <View style={styles.viewContainer}>
                <ScrollView keyboardShouldPersistTaps="handled">

                    <Text style={styles.header}>Status {this.state.connection_Status}</Text>

                    {this.keresButton()}

                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress('LoginForm')}>
                        <Text style={styles.text}>Assessment Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress('ViewAllUser')}>
                        <Text style={styles.text}>View All</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
}