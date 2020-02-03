import React, { Component } from 'react';
import styles from '../components/styles';
import { format } from "date-fns";
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AssessmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableData: [[]],
      tableHead: ['Assessment', 'Date', 'Assessor', 'Status'],
      agency_name: this.props.navigation.state.params.agency_name,
      agency_id: this.props.navigation.state.params.agency_id,
    }
  }

  componentDidMount() {
    NetInfo.addEventListener(connected => {
      if (connected.isConnected == true) {
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
    this.getAssessments();
  }

  editValues(values) {
    Alert.alert("User id =" + values);
  }

  getAssessments() {
    const editIcon = values => (
      <TouchableOpacity onPress={() => this.editValues(values)}>
        <Text style={{ color: '#000', textAlign: 'right', paddingRight: 10 }}><FontAwesome icon={SolidIcons.download} /></Text>
      </TouchableOpacity>
    );
    try {
      db.transaction(tx => {
        //console.log(this.state.connection);
        var strTrue = 'SELECT * FROM assessment_table WHERE agency_id = ?';
        var strFalse = 'SELECT * FROM assessment_table WHERE downloaded = 1 AND agency_id = ?';
        var sqlToUse = (this.state.connection ? strTrue : strFalse);
        tx.executeSql(sqlToUse, [this.state.agency_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var joined = this.state.tableData.concat([
                [
                  results.rows.item(i).assessment_name,
                  format(new Date(results.rows.item(i).assessment_date), "MM/dd/yyyy"),
                  results.rows.item(i).name_of_assessor,
                  editIcon(results.rows.item(i).master_id)
                ]
              ]);
              this.setState({
                tableData: joined,
                isLoading: false
              });
            }
          } else {
            this.setState({
              isLoading: false
            });
            alert('No Results For ' + this.state.agency_name);
          }
        });
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  LoadingIndicatorView() {
    return <ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} />
  }

  render() {
    const state = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          {this.LoadingIndicatorView()}
        </View>
      );
    }
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.textBlack}>{state.agency_name}</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.headerText} />
          <Rows data={state.tableData} textStyle={styles.cellText} />
        </Table>
      </View>
    )
  }
}