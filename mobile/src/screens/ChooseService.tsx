import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import { Box, Image, VStack, Text, Input, Icon } from "native-base";
import { useRecoilValue } from "recoil";
import { Service } from "../types";
import ScreenView from '../components/ScreenView'
import servicesAtom from "../recoil/atoms/services";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function ServiceItem({ service } : { service: Service }) {
  const navigation = useNavigation<StackNavProp>()
  const goToChooseAction = () => navigation.push('ChooseAction', {
    serviceName: service.name
  })

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={goToChooseAction}>
      <Box
        m={2}
        p={4}
        shadow={6}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        justifyContent="center"
        _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _light={{
        backgroundColor: "gray.50"
      }}
      >
        <VStack space={4}  alignItems="center">
          <Image
            source={{ uri: service.logoUri }}
            size="xs"
            resizeMode="contain"
            alt={service.name}
          />
          <Text>
            { service.name }
          </Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}

function ChooseServiceScreen() {
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
        placeholder="Search service"
        width="100%"
        borderRadius="6"
        borderColor="tertiary.400"
        _focus={{
          borderColor: "tertiary.400"
        }}
        py="3"
        px="3"
        my="5"
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
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{ width: "100%" }}
        keyExtractor={service => service.name}
        data={services}
        renderItem={item => <ServiceItem service={item.item} />}
        numColumns={2}
      />
    </ScreenView>
  )
}

export default ChooseServiceScreen