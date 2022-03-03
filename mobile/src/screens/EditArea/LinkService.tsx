import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import { Image, Text, HStack, VStack, Heading, Button } from "native-base";
import { useSetRecoilState } from "recoil";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import api from "../../api";
import useServices from "../../hooks/useServices";
import ScreenView from '../../components/ScreenView'

type LinkServiceScreenProps = NativeStackScreenProps<StackParamList, 'LinkService'>

function LinkServiceScreen({ route, navigation } : LinkServiceScreenProps) {
  const { t } = useTranslation('services')
  const { isReaction, serviceName, actionTitle } = route.params
  const setArea = useSetRecoilState(editedAreaAtom)
  const [isLinking, setisLinking] = useState(false)
  const { data } = useServices()
  const service = data?.data?.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
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

  const linkFromApi = async (): Promise<boolean> => {
    const authState = await api.services.authorize(service)

    if (!authState) {
      return false
    }
    console.log(authState)
    // const { error } = await api.services.link(service.name, authState.authorizationCode)
    // TODO: invalidate 'services' query to get updated isLinked
    return (false)
  }

  const linkService = async () => {
    setisLinking(true)
    const linked = await linkFromApi()
    setisLinking(false)
    if (linked) {
      navigateNext()
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
        <Button
          isLoading={isLinking}
          isLoadingText={t('linking')}
          disabled={isLinking}
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