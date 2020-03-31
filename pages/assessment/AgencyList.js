import React, { Component } from 'react';
import styles from '../../styles/styles';
import Loader from '../components/Loader';
import RenderIf from '../components/RenderIf';
import { openDatabase } from 'react-native-sqlite-storage';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AgencyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: false,
            client_id: this.props.navigation.state.params.client_id,
            user_name: this.props.navigation.state.params.user_name,
        }
    }

    async componentDidMount() {
        try {
            await db.transaction(tx => {
                tx.executeSql('SELECT * FROM agency_table WHERE client_id = ?', [this.state.client_id], (tx, results) => {
                    if (results.rows.length > 0) {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        this.setState({
                            dataSource: temp
                        });
                    }
                });
            });
        }
        catch (error) {
            console.error(error);
        }
        this.setState({
            isLoading: false
        });
    }

    clickFunction = (agency_id, agency_name, user_name) => {
        this.props.navigation.navigate('AssessmentList', {
            agency_id: agency_id,
            agency_name: agency_name,
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

    render() {
        if (this.state.isLoading) {
            return (<Loader />);
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.listContainer}>
                    {RenderIf(this.state.dataSource,
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={styles.rowViewContainer}
                                        onPress={this.clickFunction.bind(
                                            this, item.agency_id,
                                            item.agency_name,
                                            this.state.user_name
                                        )} >
                                        {item.agency_name}
                                    </Text>
                                    <Text style={styles.textViewList}><FontAwesomeIcon icon={faChevronRight} /></Text>
                                </View>}
                        />
                    )}
                    {this.state.isLoading === false && RenderIf(!this.state.dataSource,
                        <Text style={styles.noText}>No Results</Text>
                    )}
                </View>
            </SafeAreaView>
        );
    }

}