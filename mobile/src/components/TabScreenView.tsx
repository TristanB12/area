import React from "react";
import { View } from "react-native";
import { FAB } from "react-native-elements";

function TabScreenView({ children } : { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      {
        children
      }
      <FAB
        icon={{ name: 'add', color: 'white' }}
        placement="right"
        size="large"
      />
    </View>
  )
}

export default TabScreenView