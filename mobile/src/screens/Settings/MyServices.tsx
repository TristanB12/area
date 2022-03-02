import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Image, Text, Icon, HStack, Button, VStack, AlertDialog, Skeleton, Center, Heading } from "native-base";
import { useRecoilState } from "recoil";
import { Service } from "../../types";
import ScreenView from '../../components/ScreenView'
import servicesAtom from "../../recoil/atoms/services";
import api from "../../api";
import useServices from "../../hooks/useServices";
import SearchBar, { SearchBarSkeleton } from "../../components/SearchBar";
import ErrorFetching from "../../components/ErrorFetching";
import Entypo from "react-native-vector-icons/Entypo";

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

function ServiceItemSkeleton() {
  return (
    <Box
      variant="card"
      p={4}
      alignItems="center"
    >
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <HStack w="60%" space={4} alignItems="center">
          <Skeleton size="10" rounded="full" />
          <Skeleton.Text lines={1} w="40%"/>
        </HStack>
        <Skeleton w="40%" />
      </HStack>
    </Box>
  )
}

type ServiceListProps = {
  services: Service[],
  search: string,
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function ServiceList({ services, search, setUnlinkService } : ServiceListProps) {
  return (
    <VStack w="100%" space={4}>
      {
        services
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
  )
}

function ServiceListSkeleton() {
  return (
    <VStack w="100%" space={4}>
      <ServiceItemSkeleton />
      <ServiceItemSkeleton />
      <ServiceItemSkeleton />
    </VStack>
  )
}

type UnlinkServiceDialogProps = {
  service: Service | undefined,
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function UnlinkServiceDialog({ service, setUnlinkService } : UnlinkServiceDialogProps) {
  const { t } = useTranslation(['services', 'common'])
  const [services, setServices] = useRecoilState(servicesAtom)// TODO: replace by mutate
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

function MyServices({ services } : { services: Service[] }) {
  const { t } = useTranslation('services')
  const [unlinkService, setUnlinkService] = useState<Service | undefined>(undefined);  // TODO: filter only connected services
  const [search, setSearch] = useState("")

  return (
    <>
      <SearchBar
        placeholder={t('search_service')}
        search={search}
        setSearch={setSearch}
      />
      <ServiceList
        services={services}
        search={search}
        setUnlinkService={setUnlinkService}
      />
      <UnlinkServiceDialog
        service={unlinkService}
        setUnlinkService={setUnlinkService}
      />
    </>
  )
}

function MyServicesSkeleton() {
  return (
    <>
      <SearchBarSkeleton />
      <ServiceListSkeleton />
    </>
  )
}

function NoLinkedServices() {
  const { t } = useTranslation('services')

  return (
    <Center flex={1} w="90%">
      <HStack space={4} alignItems="center">
        <Heading textAlign="center" color="primary.400">
          { t('no_services_yet') }
        </Heading>
        <Icon
          size="sm"
          color="primary.400"
          as={<Entypo name="emoji-sad" />}
        />
      </HStack>
    </Center>
  )
}

function MyServicesScreen() {
  const { t } = useTranslation('services')
  const { isLoading, data, refetch } = useServices()
  const services: Service[] = data?.data || []

  return (
    <ScreenView>
      {
        isLoading ? (
          <MyServicesSkeleton />
        ) : (data === undefined || data.error) ? (
          <ErrorFetching
            title={t('error_fetching')}
            error={data?.error}
            refetch={refetch}
          />
        ) : (
          services.length > 0 ? <MyServices services={services} /> : <NoLinkedServices />
        )
      }
    </ScreenView>
  )
}

export default MyServicesScreen