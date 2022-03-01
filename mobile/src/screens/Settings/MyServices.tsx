import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Image, Text, Input, Icon, HStack, Button, VStack, AlertDialog } from "native-base";
import { useRecoilState, useRecoilValue } from "recoil";
import { Service } from "../../types";
import ScreenView from '../../components/ScreenView'
import servicesAtom from "../../recoil/atoms/services";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import api from "../../api";

type ServiceItemProps = {
  service: Service,
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function ServiceItem({ service, setUnlinkService } : ServiceItemProps) {
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
        <Button w="40%" colorScheme="danger" onPress={() => setUnlinkService(service)}>
          { t('unlink') }
        </Button>
      </HStack>
    </Box>
  )
}

type UnlinkServiceDialogProps = {
  service: Service | undefined,
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function UnlinkServiceDialog({ service, setUnlinkService } : UnlinkServiceDialogProps) {
  const { t } = useTranslation(['services', 'common'])
  const [services, setServices] = useRecoilState(servicesAtom)
  const cancelRef = React.useRef(null);
  const isOpen = (service !== undefined)

  if (service === undefined) {
    return null
  }
  const onClose = () => {
    setUnlinkService(undefined)
  }
  const unlinkFromApi = async (): Promise<boolean> => {
    // TODO: call api to unlink service
    const { data, error } = await api.services.unlink(service.name)
    console.log(data)
    console.log(error)
    return (!error || data)
  }

  const unlinkService = async () => {
    const editedServices = [...services]
    const unlinkServiceIndex = editedServices.findIndex(
      otherService => otherService.name === service.name
    )
    if (unlinkServiceIndex === -1) {
      return
    }
    editedServices[unlinkServiceIndex] = {
      ...service,
      isLinked: false
    }
    if (await unlinkFromApi()) {
      setServices(editedServices)
      onClose()
    }
  }

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          <HStack space={4} alignItems="center">
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
        </AlertDialog.Header>
        <AlertDialog.Body>
          { t('unlink_confirm')}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              { t('cancel', { ns: "common" })}
            </Button>
            <Button colorScheme="danger" onPress={unlinkService}>
              { t('unlink') }
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

function MyServicesScreen() {
  const { t } = useTranslation('services')
  const allServices = useRecoilValue(servicesAtom)
  const [unlinkService, setUnlinkService] = useState<Service | undefined>(undefined);
  const [search, setSearch] = useState("")

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
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <VStack w="100%" space={4}>
        {
          allServices
            .filter(service => service.isLinked)
            .filter(service => service.name.includes(search))
            .map(service =>
            <ServiceItem
              key={service.name}
              service={service}
              setUnlinkService={setUnlinkService}
            />
          )
        }
      </VStack>
      <UnlinkServiceDialog
        service={unlinkService}
        setUnlinkService={setUnlinkService}
      />
    </ScreenView>
  )
}

export default MyServicesScreen