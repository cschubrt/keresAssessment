/*Custom TextInput with validation*/
import React from 'react';
import ValidationComponent from '../../vals';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Mytextinput = props => {
    return (
        <View
            style={{
                textAlign: 'center',
                width: '100%',
                marginBottom: 7,
                height: 40,
                borderWidth: 1,
                borderColor: '#333',
                borderRadius: 5,
            }}>

            <TextInput
                underlineColorAndroid="transparent"
                placeholder={props.placeholder}
                placeholderTextColor="#707070"
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
                returnKeyType={props.returnKeyType}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
                onSubmitEditing={props.onSubmitEditing}
                style={props.style}
                blurOnSubmit={false}
                value={props.value}
            />
            {this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <Text style={styles.textAlert}>{errorMessage}</Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    TextInputStyleClass: {
        textAlign: 'center',
        width: '100%',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
    },
    textAlert: {
        color: 'red',
        textAlign: 'left',
        width: '100%',
        paddingBottom: 15,
        paddingLeft: 5,
        fontSize: 13,
    },
})

export default Mytextinput;