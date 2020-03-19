import React from 'react';
import { format } from "date-fns";
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import Loader from '../../components/Loader';
import ValidationComponent from '../../../vals';
import MyPicker from '../../components/MyPicker';
import MyPicker2 from '../../components/Picker2';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

export default class Info extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      agents: false,
      sites: false,
      buildings: false,
      agency_id: '',
      site_id: '',
      building_id: '',
      assessment_name: '',
      name_of_assessor: '',
      assessment_date: '',
      building_classification: '',
      notes: '',
      master_id: this.props.navigation.state.params.master_id
    }
  }

  componentDidMount() {
    this.getAssessment();
  }

  _onPressButton = () => {
    this.validate({
      assessment_name: { required: true },
      name_of_assessor: { required: true },
      assessment_date: { required: true, date: 'MM/DD/YYYY' },
      agency_id: { required: true },
      site_id: { required: true },
      building_id: { required: true }
    });
    if (this.isFormValid()) {
      this.updateAssessment();
    }
  }

  updateAssessment = () => {
    var that = this;
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE assessment_table SET agency_id= ?, site_id= ?, building_id= ?, assessment_name= ?, name_of_assessor= ?, assessment_date= ?, building_classification= ?, notes= ? WHERE master_id= ?',
        [
          this.state.agency_id,
          this.state.site_id,
          this.state.building_id,
          this.state.assessment_name,
          this.state.name_of_assessor,
          this.state.assessment_date,
          this.state.building_classification,
          this.state.notes,
          this.state.master_id
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Assessment updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: this.state.master_id, assessment_name: this.state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Assessment Update Failed');
          }
        }
      );
    });
  };

  getAgency() {
    if (this.state.agents === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT agency_id, agency_name FROM agency_table', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            //temp.push(results.rows.item(i));
            temp.push({ label: results.rows.item(i).agency_name, value: results.rows.item(i).agency_id });
          }
          this.setState({
            agents: temp
          });
        });
      });
    }
  }

  getSite() {
    db.transaction(tx => {
      tx.executeSql('SELECT site_id, site_name FROM site_table WHERE agency_id = ?', [this.state.agency_id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          //temp.push(results.rows.item(i));
          temp.push({ label: results.rows.item(i).site_name, value: results.rows.item(i).site_id });
        }
        this.setState({
          sites: temp
        });
      });
    });
  }

  getBuilding() {
    db.transaction(tx => {
      tx.executeSql('SELECT building_id, building_name FROM building_table WHERE site_id = ?', [this.state.site_id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          //temp.push(results.rows.item(i));
          temp.push({ label: results.rows.item(i).building_name, value: results.rows.item(i).building_id });
        }
        this.setState({
          buildings: temp
        });
      });
    });
  }

  getAssessment() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM assessment_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            this.setState({
              agency_id: results.rows.item(0).agency_id,
              site_id: results.rows.item(0).site_id,
              building_id: results.rows.item(0).building_id,
              assessment_name: results.rows.item(0).assessment_name,
              name_of_assessor: results.rows.item(0).name_of_assessor,
              assessment_date: format(new Date(results.rows.item(0).assessment_date), "MM/dd/yyyy"),
              building_classification: results.rows.item(0).building_classification,
              notes: results.rows.item(0).notes,
              isLoading: false
            });
          }
        });
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  shouldComponentUpdate(prevState, nextState) {
    if ((prevState != nextState)) {
      return true;
    }
    return false;
  }

  checkSet() {
    if (this.state.agents == false) {
      this.getAgency();
    }
    if (this.state.sites == false) {
      this.getSite();
    }
    if (this.state.buildings == false) {
      this.getBuilding();
    }
  }

  setSite(value) {
    this.setState({ agency_id: value });
    this.getSite();
  }

  setBuilding(value) {
    this.setState({ site_id: value });
    this.getBuilding();
  }

  render() {
    this.checkSet();
    const state = this.state;
    const buildingClass =
      [
        { value: '1', label: 'Building' },
        { value: '2', label: 'Grounds' },
        { value: '3', label: 'Room' },
        { value: '4', label: 'Tank' },
        { value: '5', label: 'Tower' }
      ];

    if (this.state.isLoading) {
      return (<Loader />);
    }
    return (
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Mytext text="Assessment Name" />
            {this.isFieldInError('assessment_name') && this.getErrorsInField('assessment_name').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <Mytextinput
              onChangeText={(assessment_name) => this.setState({ assessment_name })}
              value={this.state.assessment_name}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="Assessor Name" />
            {this.isFieldInError('name_of_assessor') && this.getErrorsInField('name_of_assessor').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <Mytextinput
              onChangeText={(name_of_assessor) => this.setState({ name_of_assessor })}
              value={this.state.name_of_assessor}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="Date" />
            {this.isFieldInError('assessment_date') && this.getErrorsInField('assessment_date').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <Mytextinput
              onChangeText={(assessment_date) => this.setState({ assessment_date })}
              value={this.state.assessment_date}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="Agency" />
            {this.isFieldInError('agency_id') && this.getErrorsInField('agency_id').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <MyPicker2
              selectedValue={state.agency_id}
              onValueChange={(itemValue) => this.setSite(itemValue)}
              items={state.agents}
            />

            <Mytext text="Site" />
            {this.isFieldInError('site_id') && this.getErrorsInField('site_id').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <MyPicker2
              selectedValue={state.site_id}
              onValueChange={(itemValue) => this.setBuilding(itemValue)}
              items={state.sites}
            />

            <Mytext text="Building" />
            {this.isFieldInError('building_id') && this.getErrorsInField('building_id').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <MyPicker2
              selectedValue={state.building_id}
              onValueChange={(itemValue) => this.setState({ building_id: itemValue })}
              items={state.buildings}
            />

            <Mytext text="Building Classification" />
            <MyPicker2
              selectedValue={state.building_classification}
              onValueChange={(itemValue) => this.setState({ building_classification: itemValue })}
              items={buildingClass}
            />

            <Mytext text="Notes" />
            <Mytextinput
              multiline={true}
              numberOfLines={5}
              onChangeText={(notes) => this.setState({ notes })}
              value={this.state.notes}
              style={styles.TextAreaStyleClass}
            />

            <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}