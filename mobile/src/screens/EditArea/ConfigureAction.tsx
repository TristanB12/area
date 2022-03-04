import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../../navigation/types";
import { Image, Text, HStack, Heading, VStack, FormControl, Input, Button } from "native-base";
import ScreenView from '../../components/ScreenView'
import { useTranslation } from "react-i18next";
import useServices from "../../hooks/useServices";
import Area, { ActionConfig } from "../../types";
import { useSetRecoilState } from "recoil";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ServiceItem from "../../components/ServiceItem";

type ConfigureItemProps = {
  title: string,
  actionConfig: ActionConfig,
  setActionConfig: React.Dispatch<React.SetStateAction<ActionConfig>>
}

function ConfigureItem({ title, actionConfig, setActionConfig } : ConfigureItemProps) {
  return (
    <VStack w='100%'>
      <FormControl isRequired>
        <FormControl.Label _text={{ fontSize: "xl" }}>
          { title }
        </FormControl.Label>
        <Input
          type={actionConfig[title].type}
          size="lg"
          w='100%'
          rounded="lg"
          variant="filled"
          p={4}
          value={actionConfig[title].value}
          onChangeText={newText => setActionConfig({
            ...actionConfig,
            [title]: {
              ...actionConfig[title],
              value: newText
            }
          })}
        />
      </FormControl>
    </VStack>
  )
}

type ConfigureActionScreenProps = NativeStackScreenProps<StackParamList, 'ConfigureAction'>

function ConfigureActionScreen({ route, navigation } : ConfigureActionScreenProps) {
  const setArea = useSetRecoilState(editedAreaAtom)
  const { t } = useTranslation('common')
  const { isReaction, serviceName, actionTitle } = route.params
  const { data } = useServices()
  const service = data?.data?.find(service => service.name === serviceName)
  if (service === undefined) {
    return null
  }
  const actions = isReaction ? service.reactions : service.actions
  const action = actions.find(action => action.title === actionTitle)
  if (action === undefined || action.config === undefined) {
    return null
  }
  const [actionConfig, setActionConfig] = useState(action.config)
  const canSave = Object.keys(actionConfig).every(key => actionConfig[key].value)

  const onSubmit = () => {
    const areaActionField: keyof Area = isReaction ? 'reaction' : 'action'
    setArea(area => ({
      ...area,
      [areaActionField]: {
        ...action,
        config: actionConfig
      }
    }))
    navigation.navigate('EditArea')
  }

  return (
    <ScreenView>
      <ServiceItem service={service}/>
      <Heading my={10} textAlign="center">
        { action.title }
      </Heading>
      <VStack w="100%" space={4} my={5}>
        {
          Object.keys(action.config).map((key) =>
            <ConfigureItem
              key={key}
              title={key}
              actionConfig={actionConfig}
              setActionConfig={setActionConfig}
            />
          )
        }
      </VStack>
      <Button
        w='80%'
        onPress={onSubmit}
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