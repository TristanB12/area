import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../navigation/types";
import { Image, Text, HStack, Heading, VStack, FormControl, Input, Button } from "native-base";
import { useRecoilValue } from "recoil";
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";
import { ActionConfig } from "../types";
import { useTranslation } from "react-i18next";

function ConfigureItem({ config } : { config: ActionConfig }) {
  return (
    <VStack w='100%'>
      <FormControl isRequired>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          { config.display }
        </FormControl.Label>
        <Input
          size="lg"
          w='100%'
          rounded="lg"
          variant="filled"
          placeholder={`ex: ${config.example}`}
          p={4}

        />
      </FormControl>
    </VStack>
  )
}

function ConfigureActionScreen({ route } : { route: RouteProp<StackParamList, 'ConfigureAction'> }) {
  const { t } = useTranslation('common')

  const { serviceName, actionTitle } = route.params
  const services = useRecoilValue(servicesAtom)
  const service = services.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }
  const action = service.actions.find(action => action.title === actionTitle)
  if (action === undefined || action.config === undefined) {
    return null
  }
  const canSave = false

  return (
    <ScreenView>
      <HStack my="5" mb="10" space={6} alignItems="center">
        <Image
          source={{ uri: service.logoUri }}
          size="sm"
          resizeMode="contain"
          alt={service.name}
        />
        <Text textAlign="center" >
          { service.name }
        </Text>
      </HStack>
      <Heading textAlign="center">
        { action.title }
      </Heading>
      <VStack w="100%" space={4} my={5}>
        {
          action.config.map(config =>
            <ConfigureItem key={config.display} config={config} />
          )
        }
      </VStack>
      <Button
        w='80%'
        // onPress={onSubmit}
        _text={{ fontSize: "lg" }}
        disabled={!canSave}
        bgColor={canSave ? "primary.500" : "primary.100"}
      >
        { t('save') }
      </Button>
    </ScreenView>
  )
}

export default ConfigureActionScreen