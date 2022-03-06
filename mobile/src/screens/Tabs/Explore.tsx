import React from "react";
import { Center, Heading, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import TabScreenView from "../../components/TabScreenView";

function NoExplore() {
  const { t } = useTranslation('explore')

  return (
    <Center flex={1}>
      <VStack space={8} alignItems="center">
        <Heading textAlign="center" color="primary.400">
          { t('tagline') }
        </Heading>
        <Text fontSize="lg" italic>
          { t('coming_soon') }
        </Text>
      </VStack>
    </Center>
  )
}

function Explore() {
  return (
    <TabScreenView >
      <NoExplore />
    </TabScreenView>
  )
}

export default Explore