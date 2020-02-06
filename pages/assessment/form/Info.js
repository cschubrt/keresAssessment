import React from 'react';
import { format } from "date-fns";
import Mytext from '../../components/Mytext';
import styles from '../../components/styles';
import ValidationComponent from '../../../vals';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Picker,Alert } from 'react-native';

export default class Info extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      agents: '',
      sites: '',
      buildings: '',
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

  _onPressButton = () => {
    this.validate({
      assessment_name: { required: true },
      name_of_assessor: { required: true },
      assessment_date: { required: true, date: 'MM/DD/YYYY' },
      agency_id: { required: true },
      site_id: { required: true },
      building_id: { required: true }
    });

    console.log(this.isFormValid());
    if (this.isFormValid()) {
      this.update();
    }
  }

  update = () => {
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
          console.log(results.rowsAffected);
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

  getSite() {
    db.transaction(tx => {
      tx.executeSql('SELECT site_id, site_name FROM site_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          sites: temp
        });
      });
    });
  }

  getBuilding() {
    db.transaction(tx => {
      tx.executeSql('SELECT building_id, building_name FROM building_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          buildings: temp
        });
      });
    });
  }

  componentDidMount() {
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
              notes: results.rows.item(0).notes
            });
          }
        });
      });
      this.setState({
        isLoading: false
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    this.getAgency();
    this.getSite();
    this.getBuilding();
    const state = this.state;
    const agnt = state.agents;
    const site = state.sites;
    const building = state.buildings;
    //console.log(state.building_id);
    return (
      <View style={styles.viewContainer}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>

            <Text style={{ color: '#133156', fontSize: 27, textAlign: 'center', paddingBottom: 10 }}>Info</Text>

            <Mytext text="Assessment Name *" />
            {this.isFieldInError('assessment_name') && this.getErrorsInField('assessment_name').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <TextInput
              ref="assessment_name"
              onChangeText={(assessment_name) => this.setState({ assessment_name })}
              value={this.state.assessment_name}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="Assessor Name *" />
            {this.isFieldInError('name_of_assessor') && this.getErrorsInField('name_of_assessor').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <TextInput
              ref="name_of_assessor"
              onChangeText={(name_of_assessor) => this.setState({ name_of_assessor })}
              value={this.state.name_of_assessor}
              style={styles.TextInputStyleClass}
            />

            <Mytext text="Date *" />
            {this.isFieldInError('assessment_date') && this.getErrorsInField('assessment_date').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <TextInput autoCapitalize="none"
              ref="assessment_date"
              onChangeText={(assessment_date) => this.setState({ assessment_date })}
              value={this.state.assessment_date}
              style={styles.TextInputStyleClass}
            />

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

            <Mytext text="Site *" />
            {this.isFieldInError('site_id') && this.getErrorsInField('site_id').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <Picker
              selectedValue={state.site_id}
              onValueChange={(itemValue, itemIndex) => this.setState({ site_id: itemValue })} >
              <Picker.Item value="" label="Make Selection" />
              {Object.keys(site).map((key) => {
                return <Picker.Item label={site[key].site_name} value={site[key].site_id} key={key} />
              })}
            </Picker>

            <Mytext text="Building *" />
            {this.isFieldInError('building_id') && this.getErrorsInField('building_id').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
            <Picker
              selectedValue={state.building_id}
              onValueChange={(itemValue, itemIndex) => this.setState({ building_id: itemValue })} >
              <Picker.Item value="" label="Make Selection" />
              {Object.keys(building).map((key) => {
                return <Picker.Item label={building[key].building_name} value={building[key].building_id} key={key} />
              })}
            </Picker>

            <Mytext text="Building Classification" />
            <Picker
              selectedValue={state.building_classification}
              onValueChange={(itemValue, itemIndex) => this.setState({ building_classification: itemValue })} >
              <Picker.Item value="" label="Make Selection" />
              <Picker.Item value="1" label="Building" />
              <Picker.Item value="2" label="Grounds" />
              <Picker.Item value="3" label="Room" />
              <Picker.Item value="4" label="Tank" />
              <Picker.Item value="5" label="Tower" />
            </Picker>

            <Mytext text="Notes" />
            <TextInput
              ref="notes"
              multiline={true}
              numberOfLines={10}
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