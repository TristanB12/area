import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types'

import AreasScreen from '../screens/Areas';
import AppsScreen from '../screens/Apps';
import ExploreScreen from '../screens/Explore';

const Tab = createBottomTabNavigator<TabParamList>();

function TabsNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Areas" component={AreasScreen} />
      <Tab.Screen name="Apps" component={AppsScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  )
}

export default TabsNavigation