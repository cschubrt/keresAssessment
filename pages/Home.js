import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessments.db', createFromLocation: "~keres_assessment.db" });

class Home extends Component {
    constructor(props) {
        super(props);
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='users_table'",
                [],
                function (tx, res) {
                    //console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS users_table', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS users_table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(255), user_email VARCHAR(255), user_pass VARCHAR(255))',
                            []
                        );
                    }
                }
            );
        });
    }

    handleButtonPress(item) {
        const { title, link } = item
        this.props.navigation.navigate('Browser', { title, link })
    }

    handlePress(prs) {
        this.props.navigation.navigate(prs);
    }

    state = {
        links: [
            { title: 'Keres Assessment Server', link: 'https://cschubert.serviceseval.com/keres_framework' }
            //{ title: 'next', link: 'https:' }
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <View>

                    <Text style={{ textAlign: 'center', fontSize: 25, color: '#40546b', paddingTop: 30 }}>Welcone</Text>

                    {this.state.links.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => this.handleButtonPress(item)}
                            style={styles.button}
                        >
                            <Text style={styles.text}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress('LoginForm')}>
                        <Text style={styles.text}> App Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress('UpdateApp')}>
                        <Text style={styles.text}>Update App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress('ViewAllUser')}>
                        <Text style={styles.text}>View All</Text>
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
    }
})

export default Home