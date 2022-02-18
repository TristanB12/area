import React from "react"
import { Center, Heading, Image, Text, VStack } from "native-base"
import illustration from '../assets/illustration.png'
import { useTranslation } from "react-i18next"

function SplashScreen() {
  const { t } = useTranslation('common')

  return (
    <Center flex={1}>
      <VStack space={10} alignItems="center">
        <Heading size="3xl" color="primary.400">
          A
          <Heading size="3xl" color="black">
            REA
          </Heading>
        </Heading>
        <Image
          source={illustration}
          alt="Area Illustration"
          width="250"
          height="250"
          resizeMode="contain"
        />
        <Text fontSize="lg">
          { t('loading') }
        </Text>
      </VStack>
    </Center>
  )
}

export default SplashScreen