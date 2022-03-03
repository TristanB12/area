import { Box } from "native-base";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

function ScreenView({ children, style } : { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <Box flex={1} paddingY={5} alignItems="center" _dark={{ backgroundColor: "gray.900" }}>
      <Box flex={1} width="90%" alignItems="center" style={style}>
        {
          children
        }
      </Box>
    </Box>
  )
}

export default ScreenView