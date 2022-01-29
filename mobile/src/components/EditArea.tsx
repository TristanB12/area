import React from "react";
import Area, { ServiceAction } from "../types";
import { Box, Text, HStack, Image, Button, Input, VStack, FormControl, TextArea } from "native-base"
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import { TouchableOpacity } from "react-native";

function ServiceCard({ action, isReaction } : { action: ServiceAction | undefined, isReaction?: boolean }) {
  const navigation = useNavigation<StackNavProp>()
  const goToConfigureAction = () => navigation.push('ChooseService')

  return (
    <TouchableOpacity onPress={goToConfigureAction}>
      <Box
        w="100%"
        h="100"
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
        {
          action ?
          <HStack space={5} p={4} alignItems="center">
            <Image
              source={{ uri: action.service.logoUri }}
              size="sm"
              resizeMode="contain"
              alt={action.service.name}
            />
            <Text flex={1} textAlign="center" >
              { action.title }
            </Text>
          </HStack>
          :
          <Text fontFamily="heading" fontSize="lg" fontWeight="bold" textAlign="center" color="white">
            CONFIGURE { isReaction && "RE" }ACTION
          </Text>
        }
      </Box>
    </TouchableOpacity>
  )
}

function EditArea({ area, setArea, onSave } : { area: Area, setArea: React.Dispatch<React.SetStateAction<Area>>, onSave: Function }) {
  const titleIsValid = area.title.length > 0
  const canSave = (
    titleIsValid
    && area.action !== undefined
    && area.reaction !== undefined
  )
  const onSubmit = () => canSave && onSave()

  return (
    <>
      <VStack w='100%' space={6}>
        <VStack w='100%'>
          <FormControl isRequired isInvalid={!titleIsValid}>
            <FormControl.Label _text={{ fontSize: "xl", bold: true }}>
              Area name
            </FormControl.Label>
            <Input
              size="lg"
              w='100%'
              rounded="lg"
              variant="filled"
              placeholder="Your Area name"
              p={4}
              value={area.title}
              onChangeText={value => setArea({ ...area, title: value })}
            />
            {
              !titleIsValid &&
              <FormControl.ErrorMessage>
                A title for your area is required
              </FormControl.ErrorMessage>
            }
          </FormControl>
        </VStack>
        <VStack w='100%'>
          <FormControl>
            <FormControl.Label _text={{ fontSize: "xl", bold: true }}>
              Description (optional)
            </FormControl.Label>
            <TextArea
              size="md"
              variant="filled"
              rounded="lg"
              placeholder="No description"
              p={4}
              value={area.description}
              onChangeText={value => setArea({ ...area, description: value })}
            />
          </FormControl>
        </VStack>
      </VStack>
      <VStack w="100%" space={8}>
        <ServiceCard action={area.action} />
        <ServiceCard action={area.reaction} isReaction />
      </VStack>
      <Button
        w='80%'
        onPress={onSubmit}
        _text={{ fontSize: "lg" }}
        disabled={!canSave}
        bgColor={canSave ? "primary.500" : "primary.100"}
      >
        Save
      </Button>
    </>
  )
}

export default EditArea