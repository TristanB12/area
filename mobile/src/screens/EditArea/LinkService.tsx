import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthConfiguration, authorize, AuthorizeResult } from 'react-native-app-auth';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import { Image, Text, HStack, VStack, Heading, Button } from "native-base";
import { useRecoilState, useSetRecoilState } from "recoil";
import ScreenView from '../../components/ScreenView'
import servicesAtom from "../../recoil/atoms/services";
import api from "../../api";
import editedAreaAtom from "../../recoil/atoms/editedArea";

type LinkServiceScreenProps = NativeStackScreenProps<StackParamList, 'LinkService'>

function LinkServiceScreen({ route, navigation } : LinkServiceScreenProps) {
  const { t } = useTranslation('services')
  const { isReaction, serviceName, actionTitle } = route.params
  const setArea = useSetRecoilState(editedAreaAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useRecoilState(servicesAtom)
  const service = services.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }

  const linkFromApi = async (): Promise<boolean> => {
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
    } catch (error) {
      return false
    }
    const { data, error } = await api.services.link(service.name, authState.authorizationCode)
    if (error || !data) {
      return false
    }
    return true
  }

  const updateServicesStore = () => {
    const editedServices = [...services]
    const linkServiceIndex = editedServices.findIndex(
      otherService => otherService.name === service.name
    )
    if (linkServiceIndex === -1) {
      return
    }
    editedServices[linkServiceIndex] = {
      ...service,
      isLinked: true
    }
    setServices(editedServices)
  }

  const navigateNext = () => {
    if (actionTitle) {
      const actions = isReaction ? service.reactions : service.actions
      const action = actions.find(action => action.title === actionTitle)
      if (!action) {
        return
      } else if (action.config) {
        navigation.push('ConfigureAction', {
          isReaction: isReaction,
          serviceName: service.name,
          actionTitle: action.title
        })
      } else {
        setArea(area => ({
          ...area,
          [(isReaction) ? 'reaction' : 'action']: {
            service: {
              name: service.name,
              logoUri: service.logoUri,
            },
            ...action
          }
        }))
        navigation.navigate('EditArea')
      }
    } else {
      navigation.push('ChooseAction', {
        serviceName: service.name,
        isReaction: isReaction
      })
    }
  }

  const linkService = async () => {
    setIsLoading(true)
    if (await linkFromApi()) {
      updateServicesStore()
      navigateNext()
    }
    setIsLoading(false)
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
        <Button
          isLoading={isLoading}
          isLoadingText={t('linking')}
          disabled={isLoading}
          size="lg"
          w="80%"
          shadow={6}
          onPress={async () => await linkService()}
        >
          { t('link_service') }
        </Button>
      </VStack>
    </ScreenView>
  )
}

export default LinkServiceScreen