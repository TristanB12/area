import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StackParamList } from './types'
import { navigationTheme } from '../theme';

import TabsNavigation from './Tabs';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login';
import SettingsScreen from '../screens/Settings';
import EditAreaScreen from '../screens/EditArea';
import ChooseServiceScreen from '../screens/ChooseService';
import ChooseActionScreen from '../screens/ChooseAction';
import ConfigureActionScreen from '../screens/ConfigureAction';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  const { t } = useTranslation('navigation')

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Register" screenOptions={options}>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={TabsNavigation}/>
        </Stack.Group>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }}/>
        <Stack.Screen name="EditArea" component={EditAreaScreen}/>
        <Stack.Screen name="ChooseService" component={ChooseServiceScreen} options={{ title: t('choose_a_service') }}/>
        <Stack.Screen name="ChooseAction" component={ChooseActionScreen}/>
        <Stack.Screen name="ConfigureAction" component={ConfigureActionScreen} options={{ title: t('configure_action') }}/>
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