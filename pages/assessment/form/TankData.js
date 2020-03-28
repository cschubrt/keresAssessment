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

export default class TankingData extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isInsert: true,
      painted_id: '',
      insulated_id: '',
      cathode_protected_id: '',
      epa_regulated_id: '',
      leak_detection_id: '',
      fa_type_id: '',
      tank_location_id: '',
      tank_use_id: '',
      tank_type_id: '',
      instal_date: '',
      out_of_service_date: '',
      manufacturer: '',
      modal_no: '',
      serial_no: '',
      capacity: '',
      fuel_type: '',
      alt_fuel_type: '',
      msn: '',
      classification: '',
      tank: false,
      tankUse: false,
      faType: false,
      master_id: this.props.navigation.state.params.master_id,
      assessment_name: this.props.navigation.state.params.assessment_name
    }
  }

  componentDidMount() {
    this.getTankingData();
  }

  onPressButton = () => {
    this.validate({
      maintained_date: { date: 'MM/DD/YYYY' }
    });
    if (this.isFormValid()) {
      if (this.state.isInsert) {
        this.insertTankingData();
      } else {
        this.updateTankingData();
      }
    }
  }

  insertTankingData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tank_data_table(master_id,painted_id,insulated_id,cathode_protected_id,epa_regulated_id,leak_detection_id,fa_type_id,tank_location_id,tank_use_id,tank_type_id,instal_date,out_of_service_date,manufacturer,modal_no,serial_no,capacity,fuel_type,alt_fuel_type,msn,classification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [state.master_id, state.painted_id, state.insulated_id, state.cathode_protected_id, state.epa_regulated_id, state.leak_detection_id, state.fa_type_id, state.tank_location_id, state.tank_use_id, state.tank_type_id, state.instal_date, state.out_of_service_date, state.manufacturer, state.modal_no, state.serial_no, state.capacity, state.fuel_type, state.alt_fuel_type, state.msn, state.classification],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Tank Data added successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Tank Data add Failed');
          }
        }
      );
    });
  };

  updateTankingData() {
    var that = this;
    const state = this.state;
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE tank_data_table SET painted_id = ?, insulated_id = ?, cathode_protected_id = ?, epa_regulated_id = ?, leak_detection_id = ?, fa_type_id = ?, tank_location_id = ?, tank_use_id = ?, tank_type_id = ?, instal_date = ?, out_of_service_date = ?, manufacturer = ?, modal_no = ?, serial_no = ?, capacity = ?, fuel_type = ?, alt_fuel_type = ?, msn = ?, classification WHERE master_id = ?',
        [state.painted_id, state.insulated_id, state.cathode_protected_id, state.epa_regulated_id, state.leak_detection_id, state.fa_type_id, state.tank_location_id, state.tank_use_id, state.tank_type_id, state.instal_date, state.out_of_service_date, state.manufacturer, state.modal_no, state.serial_no, state.capacity, state.fuel_type, state.alt_fuel_type, state.msn, state.classification, state.master_id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Tank Data updated successfully',
              [
                { text: 'Ok', onPress: () => that.props.navigation.navigate('FormIndex', { master_id: state.master_id, assessment_name: state.assessment_name }) },
              ],
              { cancelable: false }
            );
          } else {
            alert('Tank Data Update Failed');
          }
        }
      );
    });
  }

  getTankingData() {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM tank_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            this.setState({
              painted_id: results.rows.item(0).painted_id,
              insulated_id: results.rows.item(0).insulated_id,
              cathode_protected_id: results.rows.item(0).cathode_protected_id,
              epa_regulated_id: results.rows.item(0).epa_regulated_id,
              leak_detection_id: results.rows.item(0).leak_detection_id,
              fa_type_id: results.rows.item(0).fa_type_id,
              tank_location_id: results.rows.item(0).tank_location_id,
              tank_use_id: results.rows.item(0).tank_use_id,
              tank_type_id: results.rows.item(0).tank_type_id,
              instal_date: results.rows.item(0).instal_date,
              out_of_service_date: results.rows.item(0).out_of_service_date,
              manufacturer: results.rows.item(0).manufacturer,
              modal_no: results.rows.item(0).modal_no,
              serial_no: results.rows.item(0).serial_no,
              capacity: results.rows.item(0).capacity,
              fuel_type: results.rows.item(0).fuel_type,
              alt_fuel_type: results.rows.item(0).alt_fuel_type,
              msn: results.rows.item(0).msn,
              classification: results.rows.item(0).classification,
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

  getTankLocation() {
    if (this.state.tank === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM ref_tank_location ORDER BY tank_desc;', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).tank_desc, value: results.rows.item(i).tank_id });
          }
          this.setState({
            tank: temp
          });
        });
      });
    }
  }

  getTankUse() {
    if (this.state.tankUse === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM ref_tank_use ORDER BY use_desc;', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).use_desc, value: results.rows.item(i).use_id });
          }
          this.setState({
            tankUse: temp
          });
        });
      });
    }
  }

  getFaType() {
    if (this.state.faType === false) {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM ref_fa_type ORDER BY fa_desc;', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push({ label: results.rows.item(i).fa_desc, value: results.rows.item(i).fa_id });
          }
          this.setState({
            faType: temp
          });
        });
      });
    }
  }

  checkSet() {
    if (this.state.tank == false) {
      this.getTankLocation();
    }
    if (this.state.tankUse == false) {
      this.getTankUse();
    }
    if (this.state.faType == false) {
      this.getFaType();
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
    const tankType =
      [
        { value: 1, label: 'Double-wall' },
        { value: 2, label: 'Single-wall' }
      ];

    if (this.state.isLoading) {
      return (<Loader />);
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.viewContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView>

              <Mytext text="CLASSIFICATION" />
              <Mytextinput
                onChangeText={(classification) => this.setState({ classification })}
                value={state.classification}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="PAINTED?" />
              <MyPicker2
                selectedValue={state.painted_id}
                onValueChange={(itemValue) => this.setState({ painted_id: itemValue })}
                items={yesNo}
              />

              <Mytext text="INSULATED?" />
              <MyPicker2
                selectedValue={state.insulated_id}
                onValueChange={(itemValue) => this.setState({ insulated_id: itemValue })}
                items={yesNo}
              />

              <Mytext text="CATHODE PROTECTED?" />
              <MyPicker2
                selectedValue={state.cathode_protected_id}
                onValueChange={(itemValue) => this.setState({ cathode_protected_id: itemValue })}
                items={yesNo}
              />

              <Mytext text="EPA REGULATED?" />
              <MyPicker2
                selectedValue={state.epa_regulated_id}
                onValueChange={(itemValue) => this.setState({ epa_regulated_id: itemValue })}
                items={yesNo}
              />

              <Mytext text="LEAK DETECTION?" />
              <MyPicker2
                selectedValue={state.leak_detection_id}
                onValueChange={(itemValue) => this.setState({ leak_detection_id: itemValue })}
                items={yesNo}
              />

              <Mytext text="OUT OF SERVICE DATE" />
              <Mytextinput
                onChangeText={(out_of_service_date) => this.setState({ out_of_service_date })}
                value={state.out_of_service_date}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="INSTALL DATE" />
              <Mytextinput
                onChangeText={(instal_date) => this.setState({ instal_date })}
                value={state.instal_date}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="MANUFACTURER" />
              <Mytextinput
                onChangeText={(manufacturer) => this.setState({ manufacturer })}
                value={state.manufacturer}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="MODEL NO." />
              <Mytextinput
                onChangeText={(modal_no) => this.setState({ modal_no })}
                value={state.modal_no}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="SERIAL NO." />
              <Mytextinput
                onChangeText={(serial_no) => this.setState({ serial_no })}
                value={state.serial_no}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="TANK LOCATION" />
              <MyPicker2
                selectedValue={state.tank_location_id}
                onValueChange={(itemValue) => this.setState({ tank_location_id: itemValue })}
                items={state.tank}
              />

              <Mytext text="TANK USE" />
              <MyPicker2
                selectedValue={state.tank_use_id}
                onValueChange={(itemValue) => this.setState({ tank_use_id: itemValue })}
                items={state.tankUse}
              />

              <Mytext text="TANK TYPE" />
              <MyPicker2
                selectedValue={state.tank_type_id}
                onValueChange={(itemValue) => this.setState({ tank_type_id: itemValue })}
                items={tankType}
              />

              <Mytext text="CAPACITY" />
              <Mytextinput
                onChangeText={(capacity) => this.setState({ capacity })}
                value={state.capacity}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="FUEL TYPE" />
              <Mytextinput
                onChangeText={(fuel_type) => this.setState({ fuel_type })}
                value={state.fuel_type}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="ALT. FUEL TYPE" />
              <Mytextinput
                onChangeText={(alt_fuel_type) => this.setState({ alt_fuel_type })}
                value={state.alt_fuel_type}
                style={styles.TextInputStyleClass}
              />

              <Mytext text="FA TYPE" />
              <MyPicker2
                selectedValue={state.fa_type_id}
                onValueChange={(itemValue) => this.setState({ fa_type_id: itemValue })}
                items={state.faType}
              />

              <Mytext text="NSN" />
              <Mytextinput
                onChangeText={(msn) => this.setState({ msn })}
                value={state.msn}
                style={styles.TextInputStyleClass}
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