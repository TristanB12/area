import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import { Text, VStack,Button } from "native-base";
import { useSetRecoilState } from "recoil";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import api from "../../api";
import useServices from "../../hooks/useServices";
import ScreenView from '../../components/ScreenView'
import ServiceItem from "../../components/ServiceItem";
import { useMutation, useQueryClient } from "react-query";

type LinkServiceScreenProps = NativeStackScreenProps<StackParamList, 'LinkService'>
type LinkServiceProps = {
  serviceName: string,
  authorizationCode: string
}

function LinkServiceScreen({ route, navigation } : LinkServiceScreenProps) {
  const { t } = useTranslation('services')
  const { isReaction, serviceName, actionTitle } = route.params
  const setArea = useSetRecoilState(editedAreaAtom)
  const [isLinking, setisLinking] = useState(false)
  const { data } = useServices()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(async ({ serviceName, authorizationCode } : LinkServiceProps) =>
    await api.services.link(serviceName, authorizationCode)
  , {
    onSuccess: () => {
      queryClient.invalidateQueries("services")
    }
  })
  const service = data?.data?.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }

  useEffect(() => {
    api.services.prefetchAuthorize(service.link);
  }, []);

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
          [(isReaction) ? 'reaction' : 'action']: action
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
    const authState = await api.services.authorize(service.link)

    if (!authState) {
      return false
    }
    console.log(authState)
    const { error } = await mutateAsync({
      serviceName: service.name,
      authorizationCode: authState.authorizationCode
    })
    return (!error)
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
        <ServiceItem service={service} />
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