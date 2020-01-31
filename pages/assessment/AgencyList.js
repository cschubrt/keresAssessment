import React, { Component } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { StyleSheet, View, Text, Platform, FlatList, ActivityIndicator } from 'react-native';

export default class AgencyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            client_id: this.props.navigation.state.params.client_id
        }
    }

    async componentDidMount() {
        try {
            console.log(this.state.client_id);
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM agency_table WHERE client_id = ?', [this.state.client_id], (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    this.setState({
                        isLoading: false,
                        dataSource: temp
                    });
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    clickFunction = (agency_id) => {
        this.props.navigation.navigate('BcaForm', {
            agency_id: agency_id
        });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
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
            <View style={styles.MainContainer_For_Show}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={styles.rowViewContainer}
                                onPress={this.clickFunction.bind(
                                    this, item.agency_id
                                )} >
                                {item.agency_name}
                            </Text>
                            <Text style={styles.textViewContainer}>&rarr;</Text>
                        </View>}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    MainContainer_For_Show: {
        flex: 1,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0,
        marginLeft: 5,
        marginRight: 5
    },
    rowViewContainer: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: '95%'
    },
    textViewContainer: {
        textAlignVertical: 'center',
        width: '5%',
        textAlign: 'right'
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center'
    }
});