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
import MyServicesScreen from '../screens/MyServices';
import EditAreaScreen from '../screens/EditArea';
import ChooseServiceScreen from '../screens/ChooseService';
import LinkServiceScreen from '../screens/LinkService';
import ChooseActionScreen from '../screens/ChooseAction';
import ConfigureActionScreen from '../screens/ConfigureAction';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  const { t } = useTranslation(['navigation', 'services'])
  const isSignedIn = false

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={options}>
        {
          !isSignedIn ? (
            <Stack.Group screenOptions={{ headerShown: false, animation: "fade" }}>
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Group>
          ) : (
            <>
              <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }}/>
              <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }}/>
              <Stack.Screen name="MyServices" component={MyServicesScreen} options={{ title: t('my_services', { ns: 'services' }) }}/>
              <Stack.Screen name="EditArea" component={EditAreaScreen}/>
              <Stack.Screen name="ChooseService" component={ChooseServiceScreen} options={{ title: t('choose_a_service') }}/>
              <Stack.Screen name="LinkService" component={LinkServiceScreen} options={{ title: t('link_service') }}/>
              <Stack.Screen name="ChooseAction" component={ChooseActionScreen}/>
              <Stack.Screen name="ConfigureAction" component={ConfigureActionScreen} options={{ title: t('configure_action') }}/>
            </>
          )
        }
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