import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigation/types";
import { Image, Text, HStack, VStack, Heading, Button } from "native-base";
import { useRecoilValue } from "recoil";
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";
import { useTranslation } from "react-i18next";

function LinkServiceScreen({ route } : { route: RouteProp<StackParamList, 'LinkService'> }) {
  const { t } = useTranslation('services')
  const { serviceName } = route.params
  const services = useRecoilValue(servicesAtom)
  const service = services.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }

  return (
    <ScreenView>
      <VStack w="100%" mt={10} space={8} alignItems="center">
        <HStack space={6} alignItems="center">
          <Image
            source={{ uri: service.logoUri }}
            size="sm"
            resizeMode="contain"
            alt={service.name}
          />
          <Heading textAlign="center" >
            { service.name }
          </Heading>
        </HStack>
        <Text fontSize="lg"  textAlign="center">
          { t('link_service_helper_text') }
        </Text>
        <Button size="lg" w="80%" shadow={6}>
          { t('link_service') }
        </Button>
      </VStack>
    </ScreenView>
  )
}

export default LinkServiceScreen