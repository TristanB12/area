import React from "react";
import { Fab, Icon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenView from "./ScreenView";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";

function TabScreenView({ children } : { children: React.ReactNode }) {
  const navigation = useNavigation<StackNavProp>()

  return (
    <ScreenView>
      {
        children
      }
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<MaterialCommunityIcons name="plus" />} />}
        onPress={() => navigation.push('EditArea')}
      />
    </ScreenView>
  )
}

export default TabScreenView