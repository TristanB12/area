import React, { useState } from "react";
import { FlatList } from "react-native";
import { Box, Image, Text, Input, Icon, HStack, Button, VStack } from "native-base";
import { useRecoilValue } from "recoil";
import {  Service } from "../types";
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function ServiceItem({ service } : { service: Service }) {
  const { t } = useTranslation('services')

  return (
    <Box
      variant="card"
      p={4}
      alignItems="center"
    >
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <HStack w="60%" space={4} alignItems="center">
          <Image
            source={{ uri: service.logoUri }}
            size="xs"
            resizeMode="contain"
            alt={service.name}
          />
          <Text>
            { service.name }
          </Text>
        </HStack>
        <Button w="40%" bgColor="danger.600" onPress={() => console.log('unlink')}>
          { t('unlink') }
        </Button>
      </HStack>
    </Box>
  )
}

function MyServicesScreen() {
  const { t } = useTranslation('services')
  const allServices = useRecoilValue(servicesAtom)
  const [services, setServices] = useState(allServices)

  const onChangeText = (text: string) => {
    if (text.length === 0) {
      setServices(allServices)
    } else {
      setServices(allServices.filter(service => service.name.includes(text)))
    }
  }

  return (
    <ScreenView>
      <Input
        placeholder={t('search_service')}
        width="100%"
        borderRadius="6"
        borderColor="tertiary.400"
        _focus={{
          borderColor: "tertiary.400"
        }}
        py="3"
        px="3"
        mb="5"
        fontSize="14"
        InputLeftElement={
          <Box p={2} h="100%" alignItems="center" bgColor="tertiary.400">
            <Icon
              size="md"
              color="white"
              as={<MaterialIcons name="search" />}
              />
          </Box>
        }
        onChangeText={onChangeText}
      />
      <VStack w="100%" space={4}>
        {
          services.map(service =>
            <ServiceItem key={service.name} service={service} />
          )
        }
      </VStack>
    </ScreenView>
  )
}

export default MyServicesScreen