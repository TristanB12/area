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
  EditArea: { areaId: number } | undefined,
  ChooseService: { isReaction: boolean },
  ChooseAction: { serviceName: string, isReaction: boolean },
  ConfigureAction: { serviceName: string, actionTitle: string },
}

type StackNavProp = NativeStackNavigationProp<StackParamList>
type TabNavProp = BottomTabNavigationProp<TabParamList>

export type {
  TabParamList,
  StackParamList,
  StackNavProp,
  TabNavProp
}