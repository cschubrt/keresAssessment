import React from 'react';
import { format } from "date-fns";
import styles from '../../../styles/styles';
import Mytext from '../../components/Mytext';
import Loader from '../../components/Loader';
import ValidationComponent from '../../../vals';
import MyPicker2 from '../../components/Picker2';
import Mytextinput from '../../components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView } from 'react-native';

export default class BuildingData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isInsert: true,
      portable_id: '',
      structure_use_id: '',
      replacement_cost_desc: '',
      replacement_yr_desc: '',
      life_span: '',
      room_number: '',
      floor_lvls: '',
      basment_lvls: '',
      maintained_date: '',
      historical_id: '',
      designed_desc: '',
      org_name: '',
      org_type: '',
      high_grade_lvl: '',
      low_grade_lvl: '',
      pending_id: '',
      historical: false,
      structure: false,
      master_id: this.props.navigation.state.params.master_id,
      assessment_name: this.props.navigation.state.params.assessment_name
    }
  }

  componentDidMount() {
    this.getBuildingData();
  }

  onPressButton = () => {
    this.validate({
      maintained_date: { date: 'MM/DD/YYYY' }
    });
    if (this.isFormValid()) {
      if (this.state.isInsert) {
        this.insertBuildingData();
      } else {
        this.updateBuildingData();
      }
    }
  }

  insertBuildingData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO building_data_table(master_id,portable_id,structure_use_id,replacement_cost_desc,replacement_yr_desc,life_span,room_number,floor_lvls,basment_lvls,maintained_date,historical_id,designed_desc,org_name,org_type,high_grade_lvl,low_grade_lvl,pending_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [state.master_id, state.portable_id, state.structure_use_id, state.replacement_cost_desc, state.replacement_yr_desc, state.life_span, state.room_number, state.floor_lvls, state.basment_lvls, state.maintained_date, state.historical_id, state.designed_desc, state.org_name, state.org_type, state.high_grade_lvl, state.low_grade_lvl, state.pending_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Building Data added successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Building Data add Failed');
          }
        }
      );
    });
  };

  updateBuildingData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE building_data_table SET portable_id = ?,structure_use_id = ?,replacement_cost_desc = ?,replacement_yr_desc = ?,life_span = ?,room_number = ?,floor_lvls = ?,basment_lvls = ?,maintained_date = ?,historical_id = ?,designed_desc = ?,org_name = ?,org_type = ?,high_grade_lvl = ?,low_grade_lvl = ?,pending_id = ? WHERE master_id = ?',
        [state.portable_id, state.structure_use_id, state.replacement_cost_desc, state.replacement_yr_desc, state.life_span, state.room_number, state.floor_lvls, state.basment_lvls, state.maintained_date, state.historical_id, state.designed_desc, state.org_name, state.org_type, state.high_grade_lvl, state.low_grade_lvl, state.pending_id, state.master_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Building Data updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Building Data Update Failed');
          }
        }
      );
    });
  }

  getBuildingData() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM building_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            this.setState({
              portable_id: results.rows.item(0).portable_id,
              structure_use_id: results.rows.item(0).structure_use_id,
              replacement_cost_desc: results.rows.item(0).replacement_cost_desc,
              replacement_yr_desc: results.rows.item(0).replacement_yr_desc,
              life_span: results.rows.item(0).life_span,
              room_number: results.rows.item(0).room_number,
              floor_lvls: results.rows.item(0).floor_lvls,
              basment_lvls: results.rows.item(0).basment_lvls,
              maintained_date: format(new Date(results.rows.item(0).maintained_date), "MM/dd/yyyy"),
              historical_id: results.rows.item(0).historical_id,
              designed_desc: results.rows.item(0).designed_desc,
              org_name: results.rows.item(0).org_name,
              org_type: results.rows.item(0).org_type,
              high_grade_lvl: results.rows.item(0).high_grade_lvl,
              low_grade_lvl: results.rows.item(0).low_grade_lvl,
              pending_id: results.rows.item(0).pending_id,
              isInsert: false,
              isLoading: false
            });
          } else {
            this.setState({ isLoading: false });
          }
        });
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  getHistoricalStatus() {
    if (this.state.historical === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT historical_id, historical_desc FROM ref_historical_status', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).historical_desc, value: results.rows.item(i).historical_id });
          }
          this.setState({
            historical: temp
          });
        });
      });
    }
  }

  getStructure() {
    if (this.state.structure === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT structure_use_id, structure_desc FROM ref_structure_use', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).structure_desc, value: results.rows.item(i).structure_use_id });
          }
          this.setState({
            structure: temp
          });
        });
      });
    }
  }

  checkSet() {
    if (this.state.historical == false) {
      this.getHistoricalStatus();
    }
    if (this.state.structure == false) {
      this.getStructure();
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
        { value: 1, label: 'Yes' },
        { value: 2, label: 'No' }
      ];

    if (this.state.isLoading) {
      return (<Loader />);
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.viewContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>

              <Mytext text="PORTABLE?" />
              <MyPicker2
                selectedValue={state.portable_id}
                onValueChange={(itemValue) => this.setState({ portable_id: itemValue })}
                items={yesNo}
              />

              <Mytext text="NEW STRUCTURE USE" />
              <MyPicker2
                selectedValue={state.structure_use_id}
                onValueChange={(itemValue) => this.setState({ structure_use_id: itemValue })}
                items={state.structure}
              />

              <Mytext text="ESTIMATED REPLACEMENT COST" />
              <Mytextinput
                onChangeText={(replacement_cost_desc) => this.setState({ replacement_cost_desc })}
                value={state.replacement_cost_desc}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="ESTIMATED REPLACEMENT YEAR" />
              <Mytextinput
                onChangeText={(replacement_yr_desc) => this.setState({ replacement_yr_desc })}
                value={state.replacement_yr_desc}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="LIFE SPAN" />
              <Mytextinput
                onChangeText={(life_span) => this.setState({ life_span })}
                value={state.life_span}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="ROOM NUMBER" />
              <Mytextinput
                onChangeText={(room_number) => this.setState({ room_number })}
                value={state.room_number}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="FLOOR LEVELS" />
              <Mytextinput
                onChangeText={(floor_lvls) => this.setState({ floor_lvls })}
                value={state.floor_lvls}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="BASEMENT LEVELS" />
              <Mytextinput
                onChangeText={(basment_lvls) => this.setState({ basment_lvls })}
                value={state.basment_lvls}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="NON-MAINTAINED DATE" />
              <Mytextinput
                onChangeText={(maintained_date) => this.setState({ maintained_date })}
                value={state.maintained_date}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="HISTORICAL STATUS" />
              <MyPicker2
                selectedValue={state.historical_id}
                onValueChange={(itemValue) => this.setState({ historical_id: itemValue })}
                items={state.historical}
              />

              <Mytext text="DESIGNED ORG. ID" />
              <Mytextinput
                onChangeText={(designed_desc) => this.setState({ designed_desc })}
                value={state.designed_desc}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="LEASE ORG. NAME" />
              <Mytextinput
                onChangeText={(org_name) => this.setState({ org_name })}
                value={state.org_name}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="LEASE ORG. TYPE" />
              <Mytextinput
                onChangeText={(org_type) => this.setState({ org_type })}
                value={state.org_type}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="HIGH GRADE LEVEL" />
              <Mytextinput
                onChangeText={(high_grade_lvl) => this.setState({ high_grade_lvl })}
                value={state.high_grade_lvl}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="LOW GRADE LEVEL" />
              <Mytextinput
                onChangeText={(low_grade_lvl) => this.setState({ low_grade_lvl })}
                value={state.low_grade_lvl}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="VBR CHANGES STILL PENDING?" />
              <MyPicker2
                selectedValue={state.pending_id}
                onValueChange={(itemValue) => this.setState({ pending_id: itemValue })}
                items={yesNo}
              />

              <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

}