import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },
    listContainer: {
        flex: 1,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0,
        marginLeft: 5,
        marginRight: 5
    },
    rowViewContainer: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        width: '95%',
        color: '#404040'
    },
    textViewList: {
        textAlignVertical: 'center',
        width: '5%',
        textAlign: 'right'
    },
    button: {
        marginTop: 12,
        backgroundColor: '#606060',
        borderRadius: 3,
        padding: 10,
        width: '100%'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        padding: 1,
        fontSize: 20
    },
    noText: {
        color: '#000',
        textAlign: 'center',
        width: '100%',
        padding: 1,
        fontSize: 20
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    textAlert: {
        color: 'red',
        textAlign: 'left',
        width: '100%',
        paddingBottom: 1,
        paddingLeft: 5,
        paddingTop: 2,
        fontSize: 17,
    },
    tableContainer: {
        flex: 1,
        padding: 2,
        paddingTop: 5,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#606060'
    },
    headerText: {
        margin: 6,
        color: '#fff',
    },
    cellText: {
        margin: 6,
        color: '#000',
    },
    textBlack: {
        width: '75%',
        color: '#404040',
        fontSize: 20,
    },
    textBlackRight: {
        textAlign: 'right',
        width: '25%',
        color: '#404040',
        fontSize: 19,
    },
    ViewBlack: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 5
    },
    TextInputStyleClass: {
        fontSize: 19,
        textAlign: 'left',
        width: '100%',
        marginBottom: 7,
        height: 41,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 2,
        color: '#606060'
    },
    TextAreaStyleClass: {
        fontSize: 19,
        textAlign: 'left',
        width: '100%',
        marginBottom: 7,
        height: 100,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 2,
        textAlignVertical: 'top',
        color: '#606060'
    },
    picker: {
        borderWidth: 1,
        borderColor: '#737CA1',
        borderRadius: 3,
        height: (Platform.OS == 'ios') ? 88 : 44
    },
    pickerItem: {
        height: (Platform.OS == 'ios') ? 88 : 44
    },
    header: {
        color: '#404040',
        fontSize: 27,
        textAlign: 'center',
        paddingBottom: 10
    }
})

export default styles;