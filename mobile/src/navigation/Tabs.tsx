import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabParamList } from './types'

import AreasScreen from '../screens/Areas';
import AppsScreen from '../screens/Apps';
import ExploreScreen from '../screens/Explore';

const Tab = createBottomTabNavigator<TabParamList>();

type TabBarIconProps = {
  focused: boolean,
  color: string,
  size: number
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
  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Areas"
        component={AreasScreen}
        options={{
          tabBarIcon: props => getIcon(props, 'infinite')
        }}
      />
      <Tab.Screen
        name="Apps"
        component={AppsScreen}
        options={{
          tabBarIcon: props => getIcon(props, 'apps')
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
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
  headerStyle: {
    elevation: 14,
    shadowOpacity: 0.25,
    borderBottomColor: 'black',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    }
  }
}

export default TabsNavigation