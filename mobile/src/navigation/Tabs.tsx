import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavProp, TabParamList } from './types'

import AreasScreen from '../screens/Tabs/Areas';
import AppsScreen from '../screens/Tabs/Apps';
import ExploreScreen from '../screens/Tabs/Explore';
import { Icon } from 'native-base';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<TabParamList>();

type TabBarIconProps = {
  focused: boolean,
  color: string,
  size: number
}

function Settings() {
  const navigation = useNavigation<StackNavProp>()
  const goToSettings = () => navigation.push('Settings')

  return (
    <TouchableOpacity onPress={goToSettings} style={{ marginRight: 20 }}>
      <Icon as={MaterialIcons} name="settings" color="black" />
    </TouchableOpacity>
  )
}

function getIcon({ focused, color, size }: TabBarIconProps, iconName: string): React.ReactNode {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      size={size}
      color={focused ? "#3772FF" : color}
      style={{
        backgroundColor: focused ? "rgba(55, 114, 255, 0.1)" : "transparent",
        padding: 5,
        borderRadius: 7
      }}
    />
  )
}

function TabsNavigation() {
  const { t } = useTranslation('navigation')

  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Areas"
        component={AreasScreen}
        options={{
          title: t('areas'),
          tabBarIcon: props => getIcon(props, 'infinite')
        }}
      />
      <Tab.Screen
        name="Apps"
        component={AppsScreen}
        options={{
          title: t('apps'),
          tabBarIcon: props => getIcon(props, 'apps')
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: t('explore'),
          tabBarIcon: props => getIcon(props, 'compass')
        }}
      />
    </Tab.Navigator>
  )
}

const options: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  headerShadowVisible: true,
  headerTitleStyle: {
    fontFamily: "NotoSans-Bold",
    fontSize: 25,
    paddingLeft: 5
  },
  headerStyle: {
    elevation: 14,
    shadowOpacity: 0.25,
    borderBottomColor: 'black',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  headerRight: () => <Settings />
}

export default TabsNavigation