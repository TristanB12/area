import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StackParamList } from './types'
import { useRecoilState } from 'recoil';
import authAtom from '../recoil/atoms/auth';
import { AuthStorage } from '../types/auth';
import api from '../api';
import { navigationTheme } from '../theme';

import SplashScreen from '../screens/Splash'
import AppIntroScreen from '../screens/AppIntro'
import TabsNavigation from './Tabs';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login';
import SettingsScreen from '../screens/Settings';
import MyServicesScreen from '../screens/MyServices';
import EditAreaScreen from '../screens/EditArea/EditArea';
import ChooseServiceScreen from '../screens/EditArea/ChooseService';
import LinkServiceScreen from '../screens/EditArea/LinkService';
import ChooseActionScreen from '../screens/EditArea/ChooseAction';
import ConfigureActionScreen from '../screens/EditArea/ConfigureAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavHeader from '../components/NavHeader';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  const { t } = useTranslation(['navigation', 'services'])
  const [auth, setAuth] = useRecoilState(authAtom)

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const retrieveAuthFromStorage = async () => {
      let introPassed: string | null = null;
      let session: string | null = null;

      try {
        introPassed = await AsyncStorage.getItem("intro_passed");
      } catch (error) {
        introPassed = null
      }
      try {
        session = await EncryptedStorage.getItem("user_session");
      } catch (error) {
        session = null
      }
      if (!session) {
        setAuth({
          ...auth,
          isFirstTimeUsingApp: (introPassed === null),
          isLoading: false
        })
        return
      }
      const storage: AuthStorage = JSON.parse(session)
      const { error } = await api.tokens.verify(storage.access_token)
      if (!error) {
        api.tokens.setAccessToken(storage.access_token)
      } else {
        await api.tokens.refresh(storage.refresh_token)
      }
      setAuth({
        ...auth,
        isFirstTimeUsingApp: (introPassed === null),
        isLoading: false,
        email: storage.email,
        access_token: storage.access_token,
        refresh_token: storage.access_token
      })
    };

    retrieveAuthFromStorage();
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
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