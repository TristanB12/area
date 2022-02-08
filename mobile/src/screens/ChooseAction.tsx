import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp, StackParamList } from "../navigation/types";
import { Box, Image, VStack, Text, Input, Icon, HStack } from "native-base";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Area, { Service, Action } from "../types";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import editedAreaAtom from "../recoil/atoms/editedArea";

function ActionItem({ service, action, isReaction } : { service: Service, action: Action, isReaction: boolean }) {
  const setArea = useSetRecoilState(editedAreaAtom)
  const areaActionField: keyof Area = isReaction ? 'reaction' : 'action'
  const navigation = useNavigation<StackNavProp>()

  const onPress = () => {
    if (action.config) {
      navigation.push('ConfigureAction', {
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
        shadow={6}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
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
            action.requiresUserAuth && !service.isAuth &&
            <Icon
              size="sm"
              as={MaterialIcons}
              name="login"
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
  const { serviceName, isReaction } = route.params
  const services = useRecoilValue(servicesAtom)
  const service = services.find(service => service.name === serviceName)

  if (service === undefined) {
    return null
  }
  const actions = isReaction ? service.reactions : service.actions

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isReaction ? "Choose reaction" : "Choose action"
    });
  }, [navigation]);

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