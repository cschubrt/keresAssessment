import React, { Component } from 'react';
import { format } from "date-fns";
import Mytext from '../../components/Mytext';
import MyPicker from './StatePicker';
import styles from '../../../styles/styles';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Picker, Alert } from 'react-native';

class MyPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      agents: '',
    }
  }

  getAgency() {
    db.transaction(tx => {
      tx.executeSql('SELECT agency_id, agency_name FROM agency_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          agents: temp
        });
      });
    });
  }

  render() {
    return (
      <View>
            <Mytext text="Agency *" />
            {this.isFieldInError('agency_id') && this.getErrorsInField('agency_id').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <Picker
              selectedValue={state.agency_id}
              onValueChange={(itemValue, itemIndex) => this.setState({ agency_id: itemValue })} >
              <Picker.Item value="" label="Make Selection" />
              {Object.keys(agnt).map((key) => {
                return <Picker.Item label={agnt[key].agency_name} value={agnt[key].agency_id} key={key} />
              })}
            </Picker>
            />
      </View>
    );
  }

}

export default MyPicker;