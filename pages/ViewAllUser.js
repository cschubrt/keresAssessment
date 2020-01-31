//TEMP PAGE

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class ViewAllUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
        };
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM users_table', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
        );
    };

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.FlatListItems}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View key={item.id} style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Name: {item.user_name}</Text>
                            <Text>Pass: {item.user_pass}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}