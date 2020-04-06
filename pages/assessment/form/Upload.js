import React, { Component } from 'react';
import styles from '../../../styles/styles';
import Loader from '../../components/Loader';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'keres_assessment.db', createFromLocation: "~keres_assessment.db" });

export default class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            assessment: false,
            observation: false,
            validation: false,
            siteData: false,
            towerData: false,
            tankData: false,
            master_id: this.props.navigation.state.params.master_id,
            assessment_name: this.props.navigation.state.params.assessment_name
        }
    }

    componentDidMount() {
        this.uploadAll();
    }

    getAssessment() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM assessment_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    if (results.rows.length > 0) {
                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updateAssessment.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
                                building_id: results.rows.item(0).building_id,
                                assessment_name: results.rows.item(0).assessment_name,
                                name_of_assessor: results.rows.item(0).name_of_assessor,
                                assessment_date: results.rows.item(0).assessment_date,
                                building_classification: results.rows.item(0).building_classification,
                                notes: results.rows.item(0).notes,
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //console.log(responseJson);
                            }).catch((error) => {
                                //console.error(error);
                            });
                    }
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    getObservation() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM observations_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    if (results.rows.length > 0) {
                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updateObservation.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
                                ac_id: results.rows.item(0).ac_id,
                                map_id: results.rows.item(0).map_id,
                                notes_desc: results.rows.item(0).notes_desc,
                                review_desc: results.rows.item(0).review_desc,
                                tech_desc: results.rows.item(0).tech_desc,
                                gao_notes: results.rows.item(0).gao_notes,
                                kdp_notes: results.rows.item(0).kdp_notes,
                                site_contact: results.rows.item(0).site_contact,
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //console.log(responseJson);
                            }).catch((error) => {
                                //console.log(error);
                            });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    getValidation() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM validation_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    if (results.rows.length > 0) {

                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updateValidation.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
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
                                remarks: results.rows.item(0).remarks,
                                occupency_id: results.rows.item(0).occupency_id,
                                project_number: results.rows.item(0).project_number,
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //console.log(responseJson);
                            }).catch((error) => {
                                //console.log(error);
                            });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }


    getBuildingData() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM building_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    //console.log(results.rows.length);
                    if (results.rows.length > 0) {
                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updateBuilding.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
                                portable_id: results.rows.item(0).portable_id,
                                structure_use_id: results.rows.item(0).structure_use_id,
                                replacement_cost_desc: results.rows.item(0).replacement_cost_desc,
                                replacement_yr_desc: results.rows.item(0).replacement_yr_desc,
                                life_span: results.rows.item(0).life_span,
                                room_number: results.rows.item(0).room_number,
                                floor_lvls: results.rows.item(0).floor_lvls,
                                basment_lvls: results.rows.item(0).basment_lvls,
                                maintained_date: results.rows.item(0).maintained_date,
                                historical_id: results.rows.item(0).historical_id,
                                designed_desc: results.rows.item(0).designed_desc,
                                org_name: results.rows.item(0).org_name,
                                org_type: results.rows.item(0).org_type,
                                high_grade_lvl: results.rows.item(0).high_grade_lvl,
                                low_grade_lvl: results.rows.item(0).low_grade_lvl,
                                pending_id: results.rows.item(0).pending_id,
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //console.log(responseJson);
                            }).catch((error) => {
                                //console.log(error);
                            });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }


    getSiteData() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM site_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    if (results.rows.length > 0) {
                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updateSite.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
                                flower_area_sf: results.rows.item(0).flower_area_sf,
                                gate_and_ditch_area: results.rows.item(0).gate_and_ditch_area,
                                gate_and_ditch_area_irrigated: results.rows.item(0).gate_and_ditch_area_irrigated,
                                nat_area: results.rows.item(0).nat_area,
                                pump_and_ditch: results.rows.item(0).pump_and_ditch,
                                pump_and_ditch_irrigated: results.rows.item(0).pump_and_ditch_irrigated,
                                push_mower_area: results.rows.item(0).push_mower_area,
                                riding_mower_area: results.rows.item(0).riding_mower_area,
                                rough_mower: results.rows.item(0).rough_mower,
                                sprinkler_coverage_auto: results.rows.item(0).sprinkler_coverage_auto,
                                sprinkler_coverage_manual: results.rows.item(0).sprinkler_coverage_manual,
                                shrub_area: results.rows.item(0).shrub_area,
                                total_asphalt: results.rows.item(0).total_asphalt,
                                total_concrete: results.rows.item(0).total_concrete,
                                total_curbs: results.rows.item(0).total_curbs,
                                total_fences: results.rows.item(0).total_fences,
                                total_gravel: results.rows.item(0).total_gravel,
                                small_trees: results.rows.item(0).small_trees,
                                tall_trees: results.rows.item(0).tall_trees,
                                trimming: results.rows.item(0).trimming,
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                               // console.log(responseJson);
                            }).catch((error) => {
                                //console.log(error);
                            });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    getTowerData() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM tower_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    if (results.rows.length > 0) {
                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updatetower.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
                                gross_sqf: results.rows.item(0).gross_sqf,
                                original_cost: results.rows.item(0).original_cost,
                                useful_life: results.rows.item(0).useful_life,
                                planned_replacement_year: results.rows.item(0).planned_replacement_year,
                                project_number: results.rows.item(0).project_number,
                                total_fund_area: results.rows.item(0).total_fund_area,
                                elevation: results.rows.item(0).elevation,
                                height: results.rows.item(0).height,
                                ice_load: results.rows.item(0).ice_load,
                                wind_load: results.rows.item(0).wind_load,
                                tension: results.rows.item(0).tension,
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //console.log(responseJson);
                            }).catch((error) => {
                                //console.log(error);
                            });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    getTankData() {
        try {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM tank_data_table WHERE master_id = ?', [this.state.master_id], (tx, results) => {
                    if (results.rows.length > 0) {


                        fetch('https://cschubert.serviceseval.com/keres_fca/app/updateTank.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                key: '58PvahBTd',
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
                                master_id: this.state.master_id
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                //console.log(responseJson);
                            }).catch((error) => {
                                //console.log(error);
                            });
                        this.setState({
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

    uploadAll() {
        this.getAssessment();
        this.getObservation();
        this.getValidation();
        this.getBuildingData();
        this.getSiteData();
        this.getTowerData();
        this.getTankData();
        //this.toServer();
        Alert.alert('Success', 'Update Successful',
            [
                { text: 'Ok', onPress: () => this.props.navigation.navigate('AssessmentList', { master_id: this.state.master_id, assessment_name: this.state.assessment_name }) },
            ],
            { cancelable: false }
        );
    }

    render() {
        if (this.state.isLoading) {
            return (<Loader />);
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.viewContainer}>
                    <ScrollView keyboardShouldPersistTaps="handled">

                        <Text style={styles.header}>Working</Text>

                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

}