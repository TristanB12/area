import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import { Icon, Box, Text, HStack, Image, Button, Input, VStack, FormControl, TextArea } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Area, { ServiceAction } from "../types";
import { useRecoilValue } from "recoil";
import areasAtom from "../recoil/atoms/areas";
import ScreenView from '../components/ScreenView'

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>

type RightHeaderButtonsProps = {
  navigation: EditAreaScreenProps['navigation']
}

function RightHeaderButtons({ navigation} : RightHeaderButtonsProps) {
  const confirmDeletion = () =>
    Alert.alert(
      "Supprimer l'AREA",
      "Souhaitez-vous vraiment supprimer l'AREA ?",
      [
        {
          text: "OUI",
          onPress: () => {
            navigation.goBack()
          }
        },
        {
          text: "NON"
        },
      ]
  );

  return (
    <TouchableOpacity onPress={confirmDeletion}>
      <Icon as={MaterialCommunityIcons} name="delete" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} />
    </TouchableOpacity>
  )
}


function ServiceCard({ action } : { action: ServiceAction }) {
  return (
    <Box w="100%" shadow={6} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <HStack space={5} p={4} alignItems="center">
        <Image
          source={{ uri: action.logoUri }}
          size="sm"
          resizeMode="contain"
          alt={action.service}
        />
        <Text flex={1} textAlign="center">
          { action.title }
        </Text>
      </HStack>
    </Box>
  )
}

function EditAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const { areaId } = route.params
  const areas = useRecoilValue(areasAtom)
  const [area, setArea] = useState(areas.find(area => area._id === areaId))

  if (area === undefined) {
    return null
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightHeaderButtons navigation={navigation} />
    });
  }, [navigation]);

  const isInvalid = area.title.length === 0
  const onSubmit = () => {
    return area.title.length !== 0
  }

  return (
    <ScreenView>
      <VStack w='100%'>
        <FormControl isRequired isInvalid={isInvalid}>
          <FormControl.Label _text={{ bold: true }}>
            Area name
          </FormControl.Label>
          <Input
            size="md"
            w='100%'
            variant="filled"
            placeholder="Your Area name"
            value={area.title}
            onChangeText={value => setArea({ ...area, title: value })}
          />
          {
            isInvalid &&
            <FormControl.ErrorMessage>
              A title for your area is required
            </FormControl.ErrorMessage>
          }
        </FormControl>
      </VStack>
      <VStack w='100%'>
        <FormControl>
          <FormControl.Label _text={{ bold: true }}>
            Description (optional)
          </FormControl.Label>
          <TextArea
            size="md"
            variant="filled"
            placeholder="No description"
            value={area.description}
            onChangeText={value => setArea({ ...area, description: value })}
          />
        </FormControl>
      </VStack>
      <ServiceCard action={area.action} />
      <ServiceCard action={area.reaction} />
      <Button
        leftIcon={<Icon as={MaterialCommunityIcons} name="content-save" />}
        w='80%'
        onPress={onSubmit}
      >
        Save
      </Button>
    </ScreenView>
  )
}

export default EditAreaScreen