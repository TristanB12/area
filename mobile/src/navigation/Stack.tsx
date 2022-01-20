import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './types'
import { navigationTheme } from '../theme';

import TabsNavigation from './Tabs';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Register" component={RegisterScreen}  />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation