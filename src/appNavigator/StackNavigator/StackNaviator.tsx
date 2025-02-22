import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RoutesStack} from '../../routes/routes';
import {SCREEN_NAMES} from '../../constants/ScreensNamesConstants/ScreenName';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>

    <Stack.Navigator initialRouteName={SCREEN_NAMES.HOME_SCREEN}>
      {RoutesStack.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item?.name}
          component={item?.component}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          }}
        />
      ))}
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
