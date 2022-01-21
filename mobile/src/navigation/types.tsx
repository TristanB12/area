import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Areas: undefined,
  Apps: undefined,
  Explore: undefined
}

type StackParamList = {
  Register: undefined,
  Login: undefined,
  Tabs: undefined,
  EditArea: { areaId: number }
}

type StackNavProp = NativeStackNavigationProp<StackParamList>
type TabNavProp = BottomTabNavigationProp<TabParamList>

export type {
  TabParamList,
  StackParamList,
  StackNavProp,
  TabNavProp
}