import React, { Component } from 'react';
import Loader from './components/Loader';
import { WebView } from 'react-native-webview';

class Browser extends Component {

    LoadingIndicator() {
        return <Loader />
    }

    render() {
        const { params } = this.props.navigation.state

        return (
            <WebView
                style={{ flex: 1 }}
                originWhitelist={['*']}
                source={{ uri: params.link }}
                renderLoading={this.LoadingIndicatorView}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        )
    }
}

export default Browser