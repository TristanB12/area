import React from "react";
import { View } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

function ScreenView({ children, style } : { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <View style={{ flex: 1, paddingVertical: 20, alignItems: "center" }}>
      <View style={{ flex: 1, width: "90%", alignItems: "center", ...style}}>
      {
        children
      }
      </View>
    </View>
  )
}

export default ScreenView