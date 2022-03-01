import React, { useEffect } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StackParamList } from './types'
import { useRecoilState } from 'recoil';
import authAtom from '../recoil/atoms/auth';
import { navigationTheme } from '../theme';
import { retrieveAuthFromStorage } from './onAppStart';

import SplashScreen from '../screens/Splash'
import AppIntroScreen from '../screens/AppIntro'
import TabsNavigation from './Tabs';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login';
import SettingsScreen from '../screens/Settings/Settings';
import MyServicesScreen from '../screens/Settings/MyServices';
import EditAreaScreen from '../screens/EditArea/EditArea';
import ChooseServiceScreen from '../screens/EditArea/ChooseService';
import LinkServiceScreen from '../screens/EditArea/LinkService';
import ChooseActionScreen from '../screens/EditArea/ChooseAction';
import ConfigureActionScreen from '../screens/EditArea/ConfigureAction';
import NavHeader from '../components/NavHeader';
import { useColorModeValue } from 'native-base';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  const { t } = useTranslation(['navigation', 'services'])
  const [auth, setAuth] = useRecoilState(authAtom)

  useEffect(() => {
    retrieveAuthFromStorage(setAuth);
  }, []);

  return (
    <NavigationContainer theme={useColorModeValue(DefaultTheme, DarkTheme)}>
      <Stack.Navigator screenOptions={options}>
        {
          auth.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
          ) : !auth.access_token ? (
            auth.isFirstTimeUsingApp ? (
              <Stack.Screen name="AppIntro" component={AppIntroScreen} options={{ headerShown: false }}/>
            ) : (
              <Stack.Group screenOptions={{ headerShown: false, animation: "fade" }}>
                <Stack.Screen name="Register" component={RegisterScreen} options={{
                  animationTypeForReplace: auth.isSignout ? 'pop' : 'push',
                }}/>
                <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Group>
            )
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
  headerTitle: ({ children }) => <NavHeader title={children} />,
  headerTitleAlign: 'center',
}

export default StackNavigation