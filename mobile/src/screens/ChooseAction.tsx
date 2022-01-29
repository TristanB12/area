import React from "react";
import { TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavProp, StackParamList } from "../navigation/types";
import { Box, Image, VStack, Text, Input, Icon, HStack } from "native-base";
import { useRecoilValue } from "recoil";
import { Service, Action } from "../types";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";

function ActionItem({ service, action } : { service: Service, action: Action }) {
  const navigation = useNavigation<StackNavProp>()
  const goToConfigureAction = () => navigation.push('ConfigureAction', {
    serviceName: service.name,
    actionTitle: action.title
  })

  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={goToConfigureAction}>
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
            action.requiresUserAuth && !service.isAuth &&
            <Icon
              size="sm"
              as={MaterialIcons}
              name="login"
              color="primary.500"
            />
          }
          <Text  >
            { action.title }
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}


function ChooseActionScreen({ route } : { route: RouteProp<StackParamList, 'ChooseAction'> }) {
  const { serviceName } = route.params
  const services = useRecoilValue(servicesAtom)
  const service = services.find(service => service.name === serviceName)

  if (service === undefined) {
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
      <VStack w="100%" space={4}>
        {
          service.actions.map(action =>
            <ActionItem
              key={action.title}
              service={service}
              action={action}
            />
          )
        }
      </VStack>
    </ScreenView>
  )
}

export default ChooseActionScreen