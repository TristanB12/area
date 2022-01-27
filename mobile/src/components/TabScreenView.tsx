import React from "react";
import { Fab, Icon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenView from "./ScreenView";

function TabScreenView({ children } : { children: React.ReactNode }) {
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
      />
    </ScreenView>
  )
}

export default TabScreenView