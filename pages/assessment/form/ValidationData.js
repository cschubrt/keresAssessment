import React from 'react';
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import ValidationComponent from '../../../vals';
import MyPicker2 from '../../components/Picker2';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

export default class Observations extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isInsert: true,
      inspection_desc: '',
      inspection_date: '',
      siteid: '',
      location: '',
      location_number: '',
      structure_number: '',
      location_id: '',
      type_id: '',
      use_desc: '',
      status_id: '',
      description: '',
      yr_built: '',
      condition_desc: '',
      condition_date: '',
      latitude: '',
      longitude: '',
      footprint: '',
      maintained_id: '',
      maintained_by_id: '',
      owned_by_id: '',
      occupancy_date: '',
      occupency_id: '',
      project_number: '',
      remarks: '',
      locations: false,
      master_id: this.props.navigation.state.params.master_id,
      assessment_name: this.props.navigation.state.params.assessment_name
    }
  }

  componentDidMount() {
    this.getObservation();
    this.setState({isLoading: false});
  }

  onPressButton = () => {
    if (this.isFormValid()) {
      if (this.state.isInsert) {
        this.insertValidation();
      } else {
        this.updateObservation();
      }
    }
  }

  insertValidation() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO validation_data_table(master_id,inspection_desc,inspection_date,siteid,location,location_number,structure_number,location_id,type_id,use_desc,status_id,description,yr_built,condition_desc,condition_date,latitude,longitude,footprint,maintained_id,maintained_by_id,owned_by_id,occupancy_date,project_number,remarks,occupency_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [state.master_id, state.inspection_desc, state.inspection_date, state.siteid, state.location, state.location_number, state.structure_number, state.location_id, state.type_id, state.use_desc, state.status_id, state.description, state.yr_built, state.condition_desc, state.condition_date, state.latitude, state.longitude, state.footprint, state.maintained_id, state.maintained_by_id, state.owned_by_id, state.occupancy_date, state.project_number, state.remarks, state.occupency_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Validation added successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Validation add Failed');
          }
        }
      );
    });
  };

  updateObservation() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE validation_data_table SET inspection_desc = ?,inspection_date = ?,siteid = ?,location = ?,location_number = ?,structure_number = ?,location_id = ?,type_id = ?,use_desc = ?,status_id = ?,description = ?,yr_built = ?,condition_desc = ?,condition_date = ?,latitude = ?,longitude = ?,footprint = ?,maintained_id = ?,maintained_by_id = ?,owned_by_id = ?,occupancy_date = ?,project_number = ?,remarks = ?, occupency_id = ? WHERE master_id = ?',
        [state.inspection_desc, state.inspection_date, state.siteid, state.location, state.location_number, state.structure_number, state.location_id, state.type_id, state.use_desc, state.status_id, state.description, state.yr_built, state.condition_desc, state.condition_date, state.latitude, state.longitude, state.footprint, state.maintained_id, state.maintained_by_id, state.owned_by_id, state.occupancy_date, state.project_number, state.remarks, state.occupency_id, state.master_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Validation updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Validation Update Failed');
          }
        }
      );
    });
  }

  getObservation() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM validation_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            this.setState({
              inspection_desc: results.rows.item(0).inspection_desc,
              inspection_date: results.rows.item(0).inspection_date,
              siteid: results.rows.item(0).siteid,
              location: results.rows.item(0).location,
              location_number: results.rows.item(0).location_number,
              structure_number: results.rows.item(0).structure_number,
              location_id: results.rows.item(0).location_id,
              type_id: results.rows.item(0).type_id,
              use_desc: results.rows.item(0).use_desc,
              status_id: results.rows.item(0).status_id,
              description: results.rows.item(0).description,
              yr_built: results.rows.item(0).yr_built,
              condition_desc: results.rows.item(0).condition_desc,
              condition_date: results.rows.item(0).condition_date,
              latitude: results.rows.item(0).latitude,
              longitude: results.rows.item(0).longitude,
              footprint: results.rows.item(0).footprint,
              maintained_id: results.rows.item(0).maintained_id,
              maintained_by_id: results.rows.item(0).maintained_by_id,
              owned_by_id: results.rows.item(0).owned_by_id,
              occupancy_date: results.rows.item(0).occupancy_date,
              project_number: results.rows.item(0).project_number,
              remarks: results.rows.item(0).remarks,
              occupency_id: results.rows.item(0).occupency_id,
              isInsert: false
            });
          }
        });
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  getLocation() {
    if (this.state.locations === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM ref_location_types', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).location_desc, value: results.rows.item(i).location_id });
          }
          this.setState({
            locations: temp
          });
        });
      });
    }
  }

  checkSet() {
    if (this.state.locations == false) {
      this.getLocation();
    }
  }

  shouldComponentUpdate(prevState, nextState) {
    if ((prevState != nextState)) {
      return true;
    }
    return false;
  }

  render() {
    this.checkSet();
    const state = this.state;
    const yesNo =
      [
        { value: '1', label: 'Yes' },
        { value: '2', label: 'No' }
      ];
      console.log(state.location_id);

    return (
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Mytext text="INSPECTION NUMBER" />
            <Mytextinput
              onChangeText={(inspection_desc) => this.setState({ inspection_desc })}
              value={state.inspection_desc}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="INSPECTION DATE" />
            <Mytextinput
              onChangeText={(inspection_date) => this.setState({ inspection_date })}
              value={state.inspection_date}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="SITEID" />
            <Mytextinput
              onChangeText={(siteid) => this.setState({ siteid })}
              value={state.siteid}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="LOCATION" />
            <Mytextinput
              onChangeText={(location) => this.setState({ location })}
              value={state.location}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="LOCATION NUMBER" />
            <Mytextinput
              onChangeText={(location_number) => this.setState({ location_number })}
              value={state.location_number}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="STRUCTURE NUMBER" />
            <Mytextinput
              onChangeText={(structure_number) => this.setState({ structure_number })}
              value={state.structure_number}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="LOCATION TYPE" />
            <MyPicker2
              selectedValue={state.location_id}
              onValueChange={(itemValue) => this.setState({ location_id: itemValue })}
              items={state.locations}
            />

            <Mytext text="TYPE" />
            <MyPicker2
              selectedValue={state.type_id}
              onValueChange={(itemValue) => this.setState({ type_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="USE" />
            <Mytextinput
              onChangeText={(use_desc) => this.setState({ use_desc })}
              value={state.use_desc}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="STATUS" />
            <MyPicker2
              selectedValue={state.status_id}
              onValueChange={(itemValue) => this.setState({ status_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="YEAR BUILT" />
            <Mytextinput
              onChangeText={(yr_built) => this.setState({ yr_built })}
              value={state.yr_built}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="CONDITION (1100, 1400)" />
            <Mytextinput
              multiline={true}
              numberOfLines={5}
              onChangeText={(condition_desc) => this.setState({ condition_desc })}
              value={state.condition_desc}
              style={styles.TextAreaStyleClass}
            />

            <Mytext text="CONDITION DATE (1100, 1400) xx/xx/xxxx" />
            <Mytextinput
              onChangeText={(condition_date) => this.setState({ condition_date })}
              value={state.condition_date}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="GPS LATITUDE (1100, 1300, 1400)" />
            <Mytextinput
              onChangeText={(latitude) => this.setState({ latitude })}
              value={state.latitude}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="GPS LONGITUDE (1100, 1300, 1400)" />
            <Mytextinput
              onChangeText={(longitude) => this.setState({ longitude })}
              value={state.longitude}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="FOOTPRINT AREA (1100, 1300)" />
            <Mytextinput
              onChangeText={(footprint) => this.setState({ footprint })}
              value={state.footprint}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="MAINTAINED? (1100, 1400)" />
            <MyPicker2
              selectedValue={state.maintained_id}
              onValueChange={(itemValue) => this.setState({ maintained_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="MAINTAINED BY" />
            <MyPicker2
              selectedValue={this.state.maintained_by_id}
              onValueChange={(itemValue) => this.setState({ maintained_by_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="OWNED BY" />
            <MyPicker2
              selectedValue={this.state.owned_by_id}
              onValueChange={(itemValue) => this.setState({ owned_by_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="OCCUPYING PROGRAM (1100, 1300)" />
            <MyPicker2
              selectedValue={state.occupency_id}
              onValueChange={(itemValue) => this.setState({ occupency_id: itemValue })}
              items={yesNo}
            />

            <Mytext text="ACTUAL BENEFICIARY OCCUPANCY (1100, 1300)" />
            <Mytextinput
              onChangeText={(occupancy_date) => this.setState({ occupancy_date })}
              value={state.occupancy_date}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="PROJECT NUMBER" />
            <Mytextinput
              onChangeText={(project_number) => this.setState({ project_number })}
              value={state.project_number}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="REMARKS" />
            <Mytextinput
              multiline={true}
              numberOfLines={5}
              onChangeText={(remarks) => this.setState({ remarks })}
              value={state.remarks}
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