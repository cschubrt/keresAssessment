/*Custom TextInput*/
import React from 'react';
import { View, TextInput } from 'react-native';

const Mytextinput = props => {
    return (
        <View>
            <TextInput
                autoCapitalize={props.autoCapitalize}
                underlineColorAndroid="transparent"
                placeholder={props.placeholder}
                placeholderTextColor="#606060"
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