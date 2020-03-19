import React from 'react';
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import ValidationComponent from '../../../vals';
import MyPicker2 from '../../components/Picker2';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

export default class ValidationData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      observations_id: false,
      ac_id: '',
      map_id: '',
      notes_desc: '',
      review_desc: '',
      tech_desc: '',
      gao_notes: '',
      kdp_notes: '',
      site_contact: '',
      master_id: this.props.navigation.state.params.master_id,
      assessment_name: this.props.navigation.state.params.assessment_name
    }
  }

  componentDidMount() {
    this.getObservation();
  }

  onPressButton = () => {
    if (this.isFormValid()) {
      this.updateObservation();
    }
  }

  updateObservation() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE observations_table SET ac_id = ?, map_id = ?, notes_desc = ?, review_desc = ?, tech_desc = ?, gao_notes = ?, kdp_notes = ?, site_contact = ? WHERE master_id = ?',
        [state.ac_id, state.map_id, state.notes_desc, state.review_desc, state.tech_desc, state.gao_notes, state.kdp_notes, state.site_contact, state.master_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Observations updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Observations Update Failed');
          }
        }
      );
    });
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
  }

  render() {
    const state = this.state;
    const yesNo =
      [
        { value: '1', label: 'Yes' },
        { value: '2', label: 'No' }
      ];

    return (
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Mytext text="ASSESSMENT COMPLETE" />
            <MyPicker2
              selectedValue={this.state.ac_id}
              onValueChange={(itemValue) => this.setState({ ac_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="MUSEUM ARTIFACTS PRESENT" />
            <MyPicker2
              selectedValue={this.state.map_id}
              onValueChange={(itemValue) => this.setState({ map_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="NOTES" />
            <Mytextinput
              onChangeText={(notes_desc) => this.setState({ notes_desc })}
              value={state.notes_desc}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="REVIEWER" />
            <Mytextinput
              onChangeText={(review_desc) => this.setState({ review_desc })}
              value={state.review_desc}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="TECHNICIAN" />
            <Mytextinput
              onChangeText={(tech_desc) => this.setState({ tech_desc })}
              value={state.tech_desc}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="KEY DISCUSSION POINTS" />
            <Mytextinput
              multiline={true}
              numberOfLines={5}
              onChangeText={(kdp_notes) => this.setState({ kdp_notes })}
              value={state.kdp_notes}
              style={styles.TextAreaStyleClass}
            />

            <Mytext text="Site Contact" />
            <Mytextinput
              multiline={true}
              numberOfLines={5}
              onChangeText={(site_contact) => this.setState({ site_contact })}
              value={state.site_contact}
              style={styles.TextAreaStyleClass}
            />

            <Mytext text="GENERAL ASSESSOR OBSERVATIONS" />
            <Mytextinput
              multiline={true}
              numberOfLines={5}
              onChangeText={(gao_notes) => this.setState({ gao_notes })}
              value={state.gao_notes}
              style={styles.TextAreaStyleClass}
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