import React, { Component } from 'react';
import styles from '../../styles/styles';
import { format } from "date-fns";
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import RenderIf from '../components/RenderIf';
import NetInfo from "@react-native-community/netinfo";
import { openDatabase } from 'react-native-sqlite-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });
import { faChevronRight, faDownload, faUpload, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class AssessmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: false,
      isLoading: true,
      tableData: [],
      connection_Status: '',
      tableHead: ['Assessment', 'Date', 'Assessor', 'Status', 'Delete', ''],
      agency_name: this.props.navigation.state.params.agency_name,
      agency_id: this.props.navigation.state.params.agency_id,
      user_name: this.props.navigation.state.params.user_name,
    }
  }

  componentDidMount() {
    this.isAvailable();
    NetInfo.fetch().then(connected => {
      if (connected.isConnected == true && this.state.online) {
        this.setState({
          connection: true,
          connection_Status: "Online",
        })
        this.getAssessmentByAgency()
      } else {
        this.setState({
          connection: false,
          connection_Status: "Offline",
        })
        this.getAssessments();
      }
    });
  }

  isAvailable = () => {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 8000);
    });
    const request = fetch('https://cschubert.serviceseval.com');

    return Promise
      .race([timeout, request])
      .then(this.setit())
      .catch(error => console.log('No Connection to Server'));
  }

  setit() {
    this.setState({ online: true });
  }

  getTankData = (master_id) => {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getTankData.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          master_id: master_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            observationSource: responseJson
          })
          if (this.state.observationSource.length > 0) {
            this.insertTankData(this.state.observationSource);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  insertTankData(src) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tank_data_table(master_id,painted_id,insulated_id,cathode_protected_id,epa_regulated_id,leak_detection_id,fa_type_id,tank_location_id,tank_use_id,tank_type_id,instal_date,out_of_service_date,manufacturer,modal_no,serial_no,capacity,fuel_type,alt_fuel_type,msn,classification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [src[0].master_id, src[0].painted_id, src[0].insulated_id, src[0].cathode_protected_id, src[0].epa_regulated_id, src[0].leak_detection_id, src[0].fa_type_id, src[0].tank_location_id, src[0].tank_use_id, src[0].tank_type_id, src[0].instal_date, src[0].out_of_service_date, src[0].manufacturer, src[0].modal_no, src[0].serial_no, src[0].capacity, src[0].fuel_type, src[0].alt_fuel_type, src[0].msn, src[0].classification],
        (tx, results) => { }
      );
    });
  };

  getTowerData = (master_id) => {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getTowerData.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          master_id: master_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            towerSource: responseJson
          })
          if (this.state.towerSource.length > 0) {
            this.insertTowerData(this.state.towerSource);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  insertTowerData(src) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO tower_data_table(master_id,gross_sqf,original_cost,useful_life,planned_replacement_year,project_number,total_fund_area,elevation,height,ice_load,wind_load,tension) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);',
        [src[0].master_id, src[0].gross_sqf, src[0].original_cost, src[0].useful_life, src[0].planned_replacement_year, src[0].project_number, src[0].total_fund_area, src[0].elevation, src[0].height, src[0].ice_load, src[0].wind_load, src[0].tension],
        (tx, results) => { }
      );
    });
  };

  getBuildingData = (master_id) => {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getBuildingData.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          master_id: master_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            observationSource: responseJson
          })
          if (this.state.observationSource.length > 0) {
            this.insertBuildingData(this.state.observationSource);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  insertBuildingData(src) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO building_data_table(master_id,portable_id,structure_use_id,replacement_cost_desc,replacement_yr_desc,life_span,room_number,floor_lvls,basment_lvls,maintained_date,historical_id,designed_desc,org_name,org_type,high_grade_lvl,low_grade_lvl,pending_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [src[0].master_id, src[0].portable_id, src[0].structure_use_id, src[0].replacement_cost_desc, src[0].replacement_yr_desc, src[0].life_span, src[0].room_number, src[0].floor_lvls, src[0].basment_lvls, src[0].maintained_date, src[0].historical_id, src[0].designed_desc, src[0].org_name, src[0].org_type, src[0].high_grade_lvl, src[0].low_grade_lvl, src[0].pending_id],
        (tx, results) => { }
      );
    });
  };

  getSiteData = (master_id) => {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getSiteData.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          master_id: master_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            siteDataSource: responseJson
          })
          if (this.state.siteDataSource.length > 0) {
            this.insertSiteData(this.state.siteDataSource);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  insertSiteData(src) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO site_data_table(master_id,flower_area_sf,gate_and_ditch_area,gate_and_ditch_area_irrigated,nat_area,pump_and_ditch,pump_and_ditch_irrigated,push_mower_area,riding_mower_area,rough_mower,sprinkler_coverage_auto,sprinkler_coverage_manual,shrub_area,total_asphalt,total_concrete,total_curbs,total_fences,total_gravel,small_trees,tall_trees,trimming) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [src[0].master_id, src[0].flower_area_sf, src[0].gate_and_ditch_area, src[0].gate_and_ditch_area_irrigated, src[0].nat_area, src[0].pump_and_ditch, src[0].pump_and_ditch_irrigated, src[0].push_mower_area, src[0].riding_mower_area, src[0].rough_mower, src[0].sprinkler_coverage_auto, src[0].sprinkler_coverage_manual, src[0].shrub_area, src[0].total_asphalt, src[0].total_concrete, src[0].total_curbs, src[0].total_fences, src[0].total_gravel, src[0].small_trees, src[0].tall_trees, src[0].trimming],
        (tx, results) => { }
      );
    });
  };

  getObservation = (master_id) => {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getObservation.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          master_id: master_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            observationSource: responseJson
          })
          if (this.state.observationSource.length > 0) {
            this.insertObservation(this.state.observationSource);
          } else {
            this.addObservation(master_id);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  addObservation(master_id) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO observations_table(master_id) VALUES (?);',
        [master_id],
        (tx, results) => { }
      );
    });
  };

  insertObservation(src) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO observations_table(master_id, ac_id, map_id, notes_desc, review_desc, tech_desc, gao_notes, kdp_notes, site_contact) VALUES (?,?,?,?,?,?,?,?,?);',
        [src[0].master_id, src[0].ac_id, src[0].map_id, src[0].notes_desc, src[0].review_desc, src[0].tech_desc, src[0].gao_notes, src[0].kdp_notes, src[0].site_contact],
        (tx, results) => { }
      );
    });
  };

  getValidation = (master_id) => {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getValidation.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          master_id: master_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            validationSource: responseJson
          })
          if (this.state.validationSource.length > 0) {
            this.insertValidation(this.state.validationSource);
          }
        }).catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  insertValidation(src) {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO validation_data_table(master_id,inspection_desc,inspection_date,siteid,location,location_number,structure_number,location_id,type_id,use_desc,status_id,description,yr_built,condition_desc,condition_date,latitude,longitude,footprint,maintained_id,maintained_by_id,owned_by_id,occupancy_date,project_number,remarks,occupency_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        [src[0].master_id, src[0].inspection_desc, src[0].inspection_date, src[0].siteid, src[0].location, src[0].location_number, src[0].structure_number, src[0].location_id, src[0].type_id, src[0].use_desc, src[0].status_id, src[0].description, src[0].yr_built, src[0].condition_desc, src[0].condition_date, src[0].latitude, src[0].longitude, src[0].footprint, src[0].maintained_id, src[0].maintained_by_id, src[0].owned_by_id, src[0].occupancy_date, src[0].project_number, src[0].remarks, src[0].occupency_id],
        (tx, results) => { }
      );
    });
  };

  addAssessment = (master_id) => {
    var checkit = false;
    fetch('https://cschubert.serviceseval.com/keres_fca/app/getAssessment.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master_id: master_id,
        user_name: this.state.user_name,
        key: '58PvahBTd'
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        var obj = responseJson;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            checkit = this.insertAssessment(
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
        this.getObservation(master_id);
        this.getValidation(master_id);
        this.getBuildingData(master_id);
        this.getSiteData(master_id);
        this.getTowerData(master_id);
        this.getTankData(master_id);

        alert('Assessment Downloaded');
        this.setState({ tableData: [] });
        this.getAssessmentByAgency()
      }).catch((error) => {
        console.error(error);
      });
  }

  insertAssessment = (agency_id, site_id, master_id, building_id, assessment_name, assessment_date, name_of_assessor, notes, parametric, building_classification) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO assessment_table(agency_id, site_id, master_id, building_id, assessment_name, assessment_date, name_of_assessor, notes, parametric, building_classification, downloaded) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
        [agency_id, site_id, master_id, building_id, assessment_name, assessment_date, name_of_assessor, notes, parametric, building_classification, 1],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            return true;
          }
          return false;
        }
      );
    });
  };

  uploadAssessment(master_id, assessment_name) {
    Alert.alert('Alert', 'Press Ok To Update Assessment',
      [
        { text: 'Ok', onPress: () => this.props.navigation.navigate('Upload', { master_id: master_id, assessment_name: assessment_name }) },
        { text: 'Cancel' },
      ],
      { cancelable: false }
    );
  }

  getAssessmentByAgency() {
    try {
      fetch('https://cschubert.serviceseval.com/keres_fca/app/getAssessmentByAgency.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: this.state.user_name,
          agency_id: this.state.agency_id,
          key: '58PvahBTd'
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          var obj = responseJson;
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var val = obj[key];
              var joined = this.state.tableData.concat([
                [
                  val['assessment_name'],
                  format(new Date(val['assessment_date']), "MM/dd/yyyy"),
                  val['name_of_assessor'],
                  (val['checked_out_by'] === this.state.user_name ? this.checkedValue(val['master_id'], val['assessment_name']) : this.addLink(val['master_id'])),
                  (val['checked_out_by'] === this.state.user_name ? this.NoGoTo(val['master_id'], val['assessment_name']) : false),
                  (val['checked_out_by'] === this.state.user_name ? this.goTo(val['master_id'], val['assessment_name']) : false),
                ]
              ]);
              this.setState({
                tableData: joined
              });
            }
          }
        }).catch((error) => {
          console.log(error);
        });
      this.setState({
        isLoading: false
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  getAssessments() {
    const editIcon = values => (
      <Text style={{ color: '#000', textAlign: 'center', paddingRight: 10 }}><FontAwesomeIcon icon={faCheck} /></Text>
    );
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM assessment_table WHERE downloaded = 1 AND agency_id = ?', [this.state.agency_id], (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              var joined = this.state.tableData.concat([
                [
                  results.rows.item(i).assessment_name,
                  format(new Date(results.rows.item(i).assessment_date), "MM/dd/yyyy"),
                  results.rows.item(i).name_of_assessor,
                  editIcon(results.rows.item(i).master_id),
                  null,
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

  addLink(values) {
    return <TouchableOpacity onPress={() => this.addAssessment(values)}>
      <Text style={{ color: '#000', textAlign: 'center' }}><FontAwesomeIcon icon={faDownload} size={18} /></Text>
    </TouchableOpacity>
  }

  checkedValue(master_id, assessment_name) {
    return <TouchableOpacity onPress={() => this.uploadAssessment(master_id, assessment_name)}>
      <Text style={{ color: '#000', textAlign: 'center' }}><FontAwesomeIcon icon={faUpload} size={18} /></Text>
    </TouchableOpacity>
  }

  goTo(values, assessment_name) {
    return <TouchableOpacity onPress={() => this.props.navigation.navigate('FormIndex', { master_id: values, assessment_name: assessment_name })}>
      <Text style={{ color: '#000', textAlign: 'center' }}><FontAwesomeIcon icon={faChevronRight} size={20} /></Text>
    </TouchableOpacity>
  }

  NoGoTo(master_id, assessment_name) {
    return <TouchableOpacity onPress={() => this.deleteCheck(master_id, assessment_name)}>
      <Text style={{ color: '#000', textAlign: 'center' }}><FontAwesomeIcon icon={faTimes} size={20} /></Text>
    </TouchableOpacity>
  }

  deleteCheck(master_id, assessment_name) {
    Alert.alert('Alert', 'Delete Assessment: ' + assessment_name,
      [
        { text: 'Ok', onPress: () => this.deleteThis(master_id) },
        { text: 'Cancel' },
      ],
      { cancelable: false }
    );
  }

  deleteThis = (master_id) => {
    db.transaction(function (tx) {
      tx.executeSql(
        'delete from assessment_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
      tx.executeSql(
        'delete from observations_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
      tx.executeSql(
        'delete from building_data_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
      tx.executeSql(
        'delete from site_data_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
      tx.executeSql(
        'delete from validation_data_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
      tx.executeSql(
        'delete from tank_data_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
      tx.executeSql(
        'delete from tower_data_table WHERE master_id = ?', [master_id], (tx, results) => { }
      );
    });
    if (this.state.connection) {
      this.deleteAssessment(master_id);
    }
    alert('Assessment Deleted');
    this.setState({ tableData: [] });
    this.getAssessmentByAgency()
  };

  deleteAssessment = (master_id) => {
    fetch('https://cschubert.serviceseval.com/keres_fca/app/deleteAssessment.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master_id: master_id,
        key: '58PvahBTd'
      })
    });
  }

  render() {
    const state = this.state;
    if (this.state.isLoading) {
      return (<Loader />);
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.tableContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">

            <View style={styles.ViewBlack}>
              <Text style={styles.textBlack}>{state.agency_name}</Text>
              <Text style={styles.textBlackRight}>{this.state.connection_Status}</Text>
            </View>
            {RenderIf(state.tableData.length > 0,
              <Table borderStyle={{ borderWidth: 1, borderColor: '#888' }}>
                <Row data={state.tableHead} flexArr={[2, 1, 2, .8, .8, .5]} style={styles.head} textStyle={styles.headerText} />
                <Rows data={state.tableData} flexArr={[2, 1, 2, .8, .8, .5]} textStyle={styles.cellText} />
              </Table>
            )}

          </ScrollView>

        </View>
        <Footer nav={this.props.navigation} />
      </SafeAreaView>
    )
  }

}