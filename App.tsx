import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/appNavigator/StackNavigator/StackNaviator';
import {NavigationContainer} from '@react-navigation/native';
import StatusBarComponent from './src/components/StatusBarComponent/CustomStatusBar';
import {colors} from './src/styles/color';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
    </View>
  );
};

export default App;
