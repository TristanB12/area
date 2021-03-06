import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Areas: undefined,
  Apps: undefined,
  Explore: undefined
}

type StackParamList = {
  Splash: undefined,
  AppIntro: undefined,
  Register: undefined,
  Login: undefined,
  Tabs: undefined,
  Settings: undefined,
  MyServices: undefined,
  EditArea: undefined,
  ChooseService: { isReaction: boolean },
  ChooseAction: { isReaction: boolean, serviceName: string },
  LinkService: { isReaction: boolean, serviceName: string, actionTitle?: string },
  ConfigureAction: { isReaction: boolean, serviceName: string, actionTitle: string },
}

type StackNavProp = NativeStackNavigationProp<StackParamList>
type TabNavProp = BottomTabNavigationProp<TabParamList>

export type {
  TabParamList,
  StackParamList,
  StackNavProp,
  TabNavProp
}