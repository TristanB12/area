import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigation/types";
import { Image, Text, HStack, Heading } from "native-base";
import { useRecoilValue } from "recoil";
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";

function ConfigureActionScreen({ route } : { route: RouteProp<StackParamList, 'ConfigureAction'> }) {
  const { serviceName, actionTitle } = route.params
  const services = useRecoilValue(servicesAtom)
  const service = services.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }
  const action = service.actions.find(action => action.title === actionTitle)
  if (action === undefined) {
    return null
  }

  return (
    <ScreenView>
      <HStack my="5" mb="10" space={6} alignItems="center">
        <Image
          source={{ uri: service.logoUri }}
          size="sm"
          resizeMode="contain"
          alt={service.name}
        />
        <Text  textAlign="center" >
          { service.name }
        </Text>
      </HStack>
      <Heading>
        { action.title }
      </Heading>
    </ScreenView>
  )
}

export default ConfigureActionScreen