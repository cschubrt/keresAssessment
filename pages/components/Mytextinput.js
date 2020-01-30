/*Custom TextInput*/
import React from 'react';
import { View, TextInput } from 'react-native';

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
        </View>
    );
};

export default Mytextinput;