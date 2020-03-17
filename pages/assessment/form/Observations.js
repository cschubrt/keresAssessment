import React from 'react';
import { format } from "date-fns";
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import Loader from '../../components/Loader';
import ValidationComponent from '../../../vals';
import MyPicker from '../../components/MyPicker';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

export default class Observations extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      observations_id: false,
      ac_id: '',
      map_id: '',
      notes_desc: '',
      review_desc: '',
      tech_desc: '',
      gao_notes: '',
      kdp_notes: '',
      site_contact: '',
      master_id: this.props.navigation.state.params.master_id
    }
  }

  componentDidMount() {
    this.getObservation();
  }

  onPressButton = () => {
    this.validate({
      //assessment_name: { required: true }
    });
    if (this.isFormValid()) {
      this.updateAssessment();
    }
  }

  getObservation() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM observations_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            this.setState({
              observations_id: results.rows.item(0).observations_id,
              ac_id: results.rows.item(0).ac_id,
              map_id: results.rows.item(0).map_id,
              notes_desc: results.rows.item(0).notes_desc,
              review_desc: results.rows.item(0).review_desc,
              tech_desc: results.rows.item(0).tech_desc,
              gao_notes: results.rows.item(0).gao_notes,
              kdp_notes: results.rows.item(0).kdp_notes,
              site_contact: results.rows.item(0).site_contact
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

  shouldComponentUpdate(prevState, nextState) {
    if ((prevState != nextState)) {
      return true;
    }
    return false;
  }

  render() {
    console.log(this.state.map_id);
    const state = this.state;
    const yesNo =
      [
        { value: 1, label: 'Yes' },
        { value: 2, label: 'No' }
      ];

    if (this.state.isLoading) {
      return (<Loader />);
    }
    return (
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Text style={{ color: '#133156', fontSize: 27, textAlign: 'center', paddingBottom: 10 }}>Observations</Text>

            <Mytext text="ASSESSMENT COMPLETE" />
            <MyPicker
              placeholder={{ label: 'Make Selection', value: null, color: 'grey', }}
              value={state.ac_id}
              onValueChange={(itemValue, itemIndex) => this.setState({ ac_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="MUSEUM ARTIFACTS PRESENT" />
            <MyPicker
              placeholder={{ label: 'Make Selection', value: null, color: 'grey', }}
              value={state.map_id}
              onValueChange={(itemValue, itemIndex) => this.setState({ map_id: itemValue })}
              items={yesNo}
            />

            <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}