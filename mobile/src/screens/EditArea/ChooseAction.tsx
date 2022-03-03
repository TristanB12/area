import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavProp, StackParamList } from "../../navigation/types";
import { Box, Image, VStack, Text, Icon, HStack } from "native-base";
import { useSetRecoilState } from "recoil";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import Area, { Service, Action } from "../../types";
import ScreenView from '../../components/ScreenView'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useServices from "../../hooks/useServices";

function ActionItem({ service, action, isReaction } : { service: Service, action: Action, isReaction: boolean }) {
  const setArea = useSetRecoilState(editedAreaAtom)
  const needsLinking = (!service.isLinked && action.requiresUserAuth)
  const areaActionField: keyof Area = isReaction ? 'reaction' : 'action'
  const navigation = useNavigation<StackNavProp>()

  const onPress = () => {
    if (needsLinking) {
      navigation.push('LinkService', {
        isReaction: isReaction,
        serviceName: service.name,
        actionTitle: action.title
      })
    } else if (action.config) {
      navigation.push('ConfigureAction', {
        isReaction: isReaction,
        serviceName: service.name,
        actionTitle: action.title
      })
    } else {
      setArea(area => ({
        ...area,
        [areaActionField]: {
          service: {
            name: service.name,
            logoUri: service.logoUri,
          },
          ...action
        }
      }))
      navigation.navigate('EditArea')
    }
  }

  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
      <Box
        variant="card"
        justifyContent="center"
        _dark={{
        borderColor: "coolGray.600",
        backgroundColor: action ? "gray.700" : "primary.500"
      }} _light={{
        backgroundColor: action ? "gray.50" : "primary.500"
      }}>
        <HStack space={4} p={4} alignItems="center">
          {
            action.config &&
            <Icon
              size="sm"
              as={MaterialIcons}
              name="settings"
              color="primary.500"
            />
          }
          {
            needsLinking &&
            <Icon
              size="sm"
              as={FontAwesome}
              name="link"
              color="primary.500"
            />
          }
          <Text flex={1} >
            { action.title }
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}

type ChooseActionScreenProps = NativeStackScreenProps<StackParamList, 'ChooseAction'>

function ChooseActionScreen({ route, navigation } : ChooseActionScreenProps) {
  const { t } = useTranslation('navigation')
  const { serviceName, isReaction } = route.params
  const { data } = useServices()
  const service = data?.data?.find(service => service.name === serviceName)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isReaction ? t("choose_reaction") : t("choose_action")
    });
  }, [navigation]);

  if (service === undefined) {
    return null
  }
  const actions = isReaction ? service.reactions : service.actions

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
      <VStack w="100%" space={4}>
        {
          actions.map(action =>
            <ActionItem
              key={action.title}
              service={service}
              action={action}
              isReaction={isReaction}
            />
          )
        }
      </VStack>
    </ScreenView>
  )
}

export default ChooseActionScreen