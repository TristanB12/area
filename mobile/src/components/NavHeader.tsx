import React from "react"
import { Heading, useColorModeValue } from "native-base"

function NavHeader({ title } : { title: string }) {
  return (
    <Heading
      color="primary.400"
      fontFamily="NotoSans-Bold"
      fontSize={25}
      paddingLeft={2}
    >
      { title.charAt(0) }
      <Heading color={useColorModeValue("black", "white")}>
        { title.slice(1) }
      </Heading>
    </Heading>
  )
}

export default NavHeader