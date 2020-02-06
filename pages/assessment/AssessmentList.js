import React, { Component } from 'react';
import styles from '../components/styles';
import { format } from "date-fns";
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import FontAwesome, { SolidIcons } from 'react-native-fontawesome';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AssessmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableData: [[]],
      connection_Status: '',
      tableHead: ['Assessment', 'Date', 'Assessor', 'Status', ''],
      agency_name: this.props.navigation.state.params.agency_name,
      agency_id: this.props.navigation.state.params.agency_id,
      user_name: this.props.navigation.state.params.user_name,
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(connected => {
      if (connected.isConnected == true) {
        this.setState({
          connection: true,
          connection_Status: "Online",
        })
        this.getAssessmentByAgency()
      } else {
        this.setState({
          connection: false,
          isLoading: false,
          connection_Status: "Offline",
        })
        this.getAssessments();
      }
    });
  }

  addAssessment = (master_id) => {
    fetch('https://cschubert.serviceseval.com/keres_framework/app/getAssessment.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master_id: master_id,
        user_name: this.state.user_name,
        key: 'xxxx'
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        var obj = responseJson;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            this.insertAssessment(
              val['agency_id'],
              val['site_id'],
              val['master_id'],
              val['building_id'],
              val['assessment_name'],
              val['assessment_date'],
              val['name_of_assessor'],
              val['notes'],
              val['parametric'],
              val['building_classification']
            );
          }
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  insertAssessment = (agency_id, site_id, master_id, building_id, assessment_name, assessment_date, name_of_assessor, notes, parametric, building_classification) => {
    db.transaction(function (tx) {
      //tx.executeSql('DELETE FROM assessment_table', [], (tx, results) => { console.log(results.rowsAffected) });
      tx.executeSql(
        'INSERT INTO assessment_table(agency_id, site_id, master_id, building_id, assessment_name, assessment_date, name_of_assessor, notes, parametric, building_classification, downloaded) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
        [agency_id, site_id, master_id, building_id, assessment_name, assessment_date, name_of_assessor, notes, parametric, building_classification, 1],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            alert('Assessment Downloaded');
          } else {
            alert('Assessment Download Failed');
          }
        }
      );
    });
  };

  uploadAssessment(values) {
    Alert.alert('Alert', 'Press Ok To Update Assessment',
      [
        { text: 'Ok', onPress: () => this.UpdateBca(values) },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
      ],
      { cancelable: false }
    );
  }

  addLink(values) {
    return <TouchableOpacity onPress={() => this.addAssessment(values)}>
      <Text style={{ color: '#000', textAlign: 'center', paddingRight: 10 }}><FontAwesome icon={SolidIcons.download} /></Text>
    </TouchableOpacity>
  }

  checkedValue(values) {
    return <TouchableOpacity onPress={() => this.uploadAssessment(values)}>
      <Text style={{ color: '#000', textAlign: 'center', paddingRight: 10 }}><FontAwesome icon={SolidIcons.upload} /></Text>
    </TouchableOpacity>
  }

  goTo(values, assessment_name) {
    return <TouchableOpacity onPress={() => this.props.navigation.navigate('FormIndex', { master_id: values, assessment_name: assessment_name })}>
      <Text style={{ color: '#000', textAlign: 'right', paddingRight: 15 }}><FontAwesome icon={SolidIcons.chevronRight} /></Text>
    </TouchableOpacity>
  }

  NoGoTo() {
    return <Text style={{ color: '#000', textAlign: 'right', paddingRight: 15 }}><FontAwesome icon={SolidIcons.times} /></Text>
  }

  getAssessmentByAgency() {
    try {
      fetch('https://cschubert.serviceseval.com/keres_framework/app/getAssessmentByAgency.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: this.state.user_name,
          agency_id: this.state.agency_id,
          key: 'xxxx'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          var obj = responseJson;
          //console.log(responseJson);
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var val = obj[key];
              var joined = this.state.tableData.concat([
                [
                  val['assessment_name'],
                  format(new Date(val['assessment_date']), "MM/dd/yyyy"),
                  val['name_of_assessor'],
                  (val['checked_out_by'] === this.state.user_name ? this.checkedValue(val['master_id']) : this.addLink(val['master_id'])),
                  (val['checked_out_by'] === this.state.user_name ? this.goTo(val['master_id'], val['assessment_name']) : this.NoGoTo()),
                ]
              ]);
              this.setState({
                tableData: joined,
              });
            }
          }
        }).catch((error) => {
          console.error(error);
        });
      this.setState({
        isLoading: false
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  getAssessments() {
    const editIcon = values => (
      <Text style={{ color: '#000', textAlign: 'right', paddingRight: 10 }}><FontAwesome icon={SolidIcons.check} /></Text>
    );
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM assessment_table WHERE downloaded = 1 AND agency_id = ? ORDER BY assessment_name', [this.state.agency_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var joined = this.state.tableData.concat([
                [
                  results.rows.item(i).assessment_name,
                  format(new Date(results.rows.item(i).assessment_date), "MM/dd/yyyy"),
                  results.rows.item(i).name_of_assessor,
                  editIcon(results.rows.item(i).master_id),
                  this.goTo(results.rows.item(i).master_id, results.rows.item(i).assessment_name)
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.ViewBlack}>
            <Text style={styles.textBlack}>{state.agency_name}</Text>
            <Text style={styles.textBlackRight}>{this.state.connection_Status}</Text>
          </View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
            <Row data={state.tableHead} flexArr={[2, 1, 2, 1, 1]} style={styles.head} textStyle={styles.headerText} />
            <Rows data={state.tableData} flexArr={[2, 1, 2, 1, 1]} textStyle={styles.cellText} />
          </Table>
        </ScrollView>
      </View>
    )
  }
}