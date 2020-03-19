import React from 'react';
import AppContainer from './navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <AppContainer />
  )
}