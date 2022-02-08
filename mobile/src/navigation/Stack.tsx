import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StackParamList } from './types'
import { navigationTheme } from '../theme';

import TabsNavigation from './Tabs';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login';
import EditAreaScreen from '../screens/EditArea';
import ChooseServiceScreen from '../screens/ChooseService';
import ChooseActionScreen from '../screens/ChooseAction';
import ConfigureActionScreen from '../screens/ConfigureAction';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={options}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="EditArea" component={EditAreaScreen}/>
        <Stack.Screen name="ChooseService" component={ChooseServiceScreen} options={{ title: 'Choose a service' }}/>
        <Stack.Screen name="ChooseAction" component={ChooseActionScreen}/>
        <Stack.Screen name="ConfigureAction" component={ConfigureActionScreen} options={{ title: 'Configure action' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const options: NativeStackNavigationOptions = {
  headerTitleStyle: {
    fontFamily: "NotoSans-Bold",
    fontSize: 25
  },
  headerTitleAlign: 'center',
}

export default StackNavigation