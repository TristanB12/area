import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StackParamList } from './types'
import { navigationTheme } from '../theme';

import SplashScreen from '../screens/Splash'
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
import { useRecoilState } from 'recoil';
import authAtom from '../recoil/atoms/auth';
import { AuthStorage } from '../types/auth';

const Stack = createNativeStackNavigator<StackParamList>();

function StackNavigation() {
  const { t } = useTranslation(['navigation', 'services'])
  const [auth, setAuth] = useRecoilState(authAtom)

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const retrieveAuthFromStorage = async () => {
      let session;
      try {
        session = await EncryptedStorage.getItem("user_session");
      } catch (error) {
        console.error(error)
      }
      if (session) {
        const storage: AuthStorage = JSON.parse(session)
        setAuth({
          ...auth,
          isLoading: false,
          email: storage.email,
          access_token: storage.access_token,
          refresh_token: storage.access_token
        })
      } else {
        setAuth({
          ...auth,
          isLoading: false
        })
      }
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
            <Stack.Group screenOptions={{ headerShown: false, animation: "fade" }}>
              <Stack.Screen name="Register" component={RegisterScreen} options={{
                animationTypeForReplace: auth.isSignout ? 'pop' : 'push',
              }}/>
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