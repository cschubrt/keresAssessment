import React, { Component } from 'react';
import styles from '../../styles/styles';
import Loader from '../components/Loader';
import { View, Text, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AgencyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            client_id: this.props.navigation.state.params.client_id,
            user_name: this.props.navigation.state.params.user_name,
        }
    }

    async componentDidMount() {
        try {
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
            <View style={styles.listContainer}>
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
            </View>
        );
    }

}