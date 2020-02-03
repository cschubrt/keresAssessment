import React, { Component } from 'react';
import styles from '../components/styles';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user_name: this.props.navigation.state.params.user_name,
        }
    }

    async componentDidMount() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM client_table', [], (tx, results) => {
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

    clickFunction = (client_id, client_desc, user_name) => {
        this.props.navigation.navigate('AgencyList', {
            client_id: client_id,
            client_desc: client_desc,
            user_name: user_name
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
            <View style={styles.listContainer}>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={styles.rowViewContainer}
                                onPress={this.clickFunction.bind(
                                    this, item.client_id,
                                    item.client_desc,
                                    this.state.user_name
                                )} >
                                {item.client_desc}
                            </Text>
                            <Text style={styles.textViewList}><FontAwesome icon={SolidIcons.chevronRight} /></Text>
                        </View>}
                />
            </View>
        );
    }

}