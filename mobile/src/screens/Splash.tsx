import React from "react"
import { Center, Image } from "native-base"
import illustration from '../assets/illustration.png'

function SplashScreen() {

  return (
    <Center flex={1}>
      <Image
        source={illustration}
        alt="Area Illustration"
        width="250"
        height="250"
        resizeMode="contain"
      />
    </Center>
  )
}

export default SplashScreen