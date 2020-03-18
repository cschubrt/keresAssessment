import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


const MyPicker = props => {

    const theItems = props.items ? props.items : [{ label: '', value: false }];
    return (
        <View>
            <RNPickerSelect
                placeholder={props.placeholder}
                onValueChange={props.onValueChange}
                value={props.value}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
                dropdownTextHighlightStyle={{ color: '#425A78' }}
                items={theItems}
                Icon={() => {
                    return <View style={{ paddingTop: 15, paddingRight: 10 }}><FontAwesomeIcon icon={faChevronDown} style={{ color: 'grey' }} /></View>;
                }}
            />
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 19,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 2,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 19,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 2,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default MyPicker;