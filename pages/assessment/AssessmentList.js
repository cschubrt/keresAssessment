import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class AssessmentList extends Component {
  constructor(props) {
    super(props);
    var tst = this.testit();
    this.state = {
      //isLoading: true,
      agency_name: '',
      agency_id: '',
      tableHead: ['Assessment', 'Date', 'Assessor'],
      tableData: tst,
      agency_name: this.props.navigation.state.params.agency_name,
      agency_id: this.props.navigation.state.params.agency_id,
    }
  }

  testit() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM assessment_table', [], (tx, results) => {
          var string = '';
          for (let i = 0; i < results.rows.length; ++i) {
            string = string + '[' + '"' + results.rows.item(i)['assessment_name'] + '",' + '"' + results.rows.item(i)['assessment_date'] + '",' + '"' + results.rows.item(i)['name_of_assessor'] + '"' + '],';
          }
          return '[' + string.slice(0, -1) + ']';
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

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.top}>{state.agency_name}</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#000' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          {
            this.state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    /*<Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.cellText} />*/
                    <Cell key={cellIndex} data={cellData} textStyle={styles.cellText} />
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <Table
            state={styles.tableStyle}
            borderStyle={{
              borderWidth: 2,
              borderColor: "#000000",
              alignItems: "center"
            }}
          >
            <Row
              data={this.state.tableTitle}
              style={styles.head}
              widthArr={this.state.widthArr}
              textStyle={[styles.text, styles.tableTitle]}
            />
            <Rows
              data={this.state.tableData}
              widthArr={this.state.widthArr}
              textStyle={[styles.text, styles.tableData]}
            />
          </Table>



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    paddingTop: 5,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: '#2D5483'
  },
  text: {
    margin: 6,
    color: '#fff',
  },
  cellText: {
    margin: 6,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: '#78B7BB',
    borderRadius: 2
  },
  btnText: {
    textAlign: 'center',
    color: '#fff'
  },
  top: {
    color: '#fff',
    width: '100%',
    backgroundColor: '#333',
    padding: 5,
    fontSize: 17
  }
});