import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AssessmentHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.startClients();
        this.getAgency();
    }

    insertClient = (client_id, client_desc) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO client_table(client_id, client_desc) VALUES (?,?);',
                [client_id, client_desc],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    };

    startClients() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_framework/app/getClient.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: 'xxxx'
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
                            //insert clients from server DB
                            this.insertClient(val['client_id'], val['client_desc']);
                        }
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    insertAgency = (agency_id, client_id, agency_name) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO agency_table(agency_id, client_id, agency_name) VALUES (?,?,?);',
                [agency_id, client_id, agency_name],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    };

    getAgency() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_framework/app/getAgency.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: 'xxxx'
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
                            //insert clients from server DB
                            this.insertAgency(val['agency_id'], val['client_id'], val['agency_name']);
                        }
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }
        catch (error) {
            console.error(error);
        }
    }

    handlePress(prs) {
        this.props.navigation.navigate(prs);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                <View style={styles.list}>

                    <Text style={{ textAlign: 'center', fontSize: 25, color: '#40546b', paddingTop: 10 }}>Keres Assessment</Text>

                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress('ListView')}>
                        <Text style={styles.text}>Client List</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%'
    },
    buttonList: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        margin: 10,
        backgroundColor: '#133156',
        borderRadius: 5,
        padding: 10
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        padding: 2,
        paddingLeft: 75,
        paddingRight: 75,
        fontSize: 17
    }
})