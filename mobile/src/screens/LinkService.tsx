import React from "react";
import { RouteProp } from "@react-navigation/native";
import { AuthConfiguration, authorize, AuthorizeResult } from 'react-native-app-auth';
import { useTranslation } from "react-i18next";
import { Image, Text, HStack, VStack, Heading, Button } from "native-base";
import { StackParamList } from "../navigation/types";
import { useRecoilValue } from "recoil";
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";
import api from "../api";

function LinkServiceScreen({ route } : { route: RouteProp<StackParamList, 'LinkService'> }) {
  const { t } = useTranslation('services')
  const { serviceName } = route.params
  const services = useRecoilValue(servicesAtom)
  const service = services.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }

  const linkService = async () => {
    const config: AuthConfiguration = {
      clientId: 'd18b9bd75e7646cca6097ce296b679f3',
      redirectUrl: 'area:/spotify',
      scopes: ['user-read-email', 'user-read-private'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
      usePKCE: false,
      skipCodeExchange: true
    };

    let authState: AuthorizeResult;
    try {
      authState = await authorize(config)
      console.log(authState)
    } catch (error) {
      console.log(error);
    }
    const { data, error } = await api.services.link(service.name, authState.authorizationCode)
    console.log(data)
    console.log(error)
    if (error) {
      return
    } else if (!data) {
      return
    }
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
        <Button size="lg" w="80%" shadow={6} onPress={linkService}>
          { t('link_service') }
        </Button>
      </VStack>
    </ScreenView>
  )
}

export default LinkServiceScreen