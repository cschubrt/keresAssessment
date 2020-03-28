import React, { Component } from 'react';
import styles from '../../styles/styles';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AssessmentHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user_name: this.props.navigation.state.params.user_name,
        };
    }

    componentDidMount() {
        NetInfo.addEventListener(connected => {
            if (connected.isConnected == true) {
                this.getClient();
                this.getBuilding();
                this.getSites();
                this.getAgency();
                this.setState({
                    connection: true
                })
            } else {
                this.setState({
                    connection: false,
                    isLoading: false
                })
            }
        });
    }

    insertSite = (site_id, agency_id, site_name) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO site_table(site_id, agency_id, site_name) VALUES (?,?,?);',
                [site_id, agency_id, site_name],
                (tx, results) => { }
            );
        });
    };

    getSites() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_fca/app/getSites.php', {
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
                        dataSource: responseJson
                    })
                    var obj = this.state.dataSource;
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            var val = obj[key];
                            this.insertSite(val['site_id'], val['agency_id'], val['site_name']);
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

    insertBuilding = (building_id, site_id, building_name) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO building_table(building_id, site_id, building_name) VALUES (?,?,?);',
                [building_id, site_id, building_name],
                (tx, results) => { }
            );
        });
    };

    getBuilding() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_fca/app/getBuilding.php', {
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
                        dataSource: responseJson
                    })
                    var obj = this.state.dataSource;
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            var val = obj[key];
                            this.insertBuilding(val['building_id'], val['site_id'], val['building_name']);
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

    insertClient = (client_id, client_desc) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO client_table(client_id, client_desc) VALUES (?,?);',
                [client_id, client_desc],
                (tx, results) => { }
            );
        });
    };

    getClient() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_fca/app/getClient.php', {
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
                (tx, results) => { }
            );
        });
    };

    getAgency() {
        try {
            fetch('https://cschubert.serviceseval.com/keres_fca/app/getAgency.php', {
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
                    var obj = responseJson;
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
        this.setState({
            isLoading: false
        })
    }

    handlePress(prs) {
        this.props.navigation.navigate(prs, { user_name: this.state.user_name });
    }

    render() {
        if (this.state.isLoading) {
            return (<Loader />);
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ padding: 10 }}>

                        <ScrollView keyboardShouldPersistTaps="handled">
                            <Text style={{ textAlign: 'center', fontSize: 25, color: '#404040', paddingTop: 10 }}>Keres Assessment</Text>

                            <TouchableOpacity style={styles.button} onPress={() => this.handlePress('ClientList')}>
                                <Text style={styles.text}>Client List</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                    <Footer nav={this.props.navigation} />
                </View>
            </SafeAreaView>
        )
    }
}