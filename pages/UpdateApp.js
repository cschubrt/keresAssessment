// GET USERS FROM SERVER DB

import React from 'react';
import styles from '../styles/styles';
import { View, ActivityIndicator, Text } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class UpdateApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    deleteUsers = () => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM users_table', [], (tx, results) => { }
            );
        });
    };

    insert_user = (user_name, user_password) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO users_table(user_name, user_pass) VALUES (?,?);',
                [user_name, user_password],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                }
            );
        });
    };

    async componentDidMount() {
        try {
            await fetch('https://cschubert.serviceseval.com/keres_fca/app/fetchUser.php', {
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
                    this.deleteUsers();
                    var obj = this.state.dataSource;
                    //console.log(obj);
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            var val = obj[key];
                            //insert users from server DB
                            this.insert_user(val['user_uname'], val['user_pass2']);
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
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                }}>
                <Text style={{ textAlign: 'center', fontSize: 25, color: '#40546b', paddingTop: 30 }}>Update Successful</Text>
            </View>
        );
    }

}