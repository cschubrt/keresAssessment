import React from 'react';
import { Item, Picker, Icon } from 'native-base';


const MyPicker2 = props => {
    const theItems = props.items ? props.items : [{ label: '', value: '' }];
    return (
        <Item style={{ marginBottom: 22 }} picker>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrowdown" />}
                style={{ color: '#606060' }}
                placeholder="Make Selection"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={props.selectedValue}
                onValueChange={props.onValueChange}
            >
                {Object.keys(theItems).map((key) => {
                    return (<Picker.Item label={theItems[key].label} value={theItems[key].value} key={key} />)
                })}
            </Picker>
        </Item>
    );
};

export default MyPicker2;