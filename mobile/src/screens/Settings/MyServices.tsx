import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Image, Text, Icon, HStack, Button, VStack, AlertDialog, Skeleton, Center, Heading } from "native-base";
import { Service } from "../../types";
import ScreenView from '../../components/ScreenView'
import api from "../../api";
import useServices from "../../hooks/useServices";
import SearchBar, { SearchBarSkeleton } from "../../components/SearchBar";
import Entypo from "react-native-vector-icons/Entypo";
import NetworkView from "../../components/NetworkView";
import ServiceItem from "../../components/ServiceItem";

type ServiceCardProps = {
  service: Service,
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function ServiceCard({ service, setUnlinkService } : ServiceCardProps) {
  const { t } = useTranslation('services')

  return (
    <Box
      variant="card"
      p={4}
      alignItems="center"
    >
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <ServiceItem service={service} w="40%" size="xs" />
        <Button w="40%" colorScheme="danger" onPress={() => setUnlinkService(service)}>
          { t('unlink') }
        </Button>
      </HStack>
    </Box>
  )
}

function ServiceCardSkeleton() {
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
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function ServiceList({ services, setUnlinkService } : ServiceListProps) {
  return (
    <VStack w="100%" space={4}>
      {
        services.map(service =>
          <ServiceCard
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
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
    </VStack>
  )
}

type UnlinkServiceDialogProps = {
  service: Service | undefined,
  setUnlinkService: React.Dispatch<React.SetStateAction<Service | undefined>>
}

function UnlinkServiceDialog({ service, setUnlinkService } : UnlinkServiceDialogProps) {
  const { t } = useTranslation(['services', 'common'])
  const [isUnlinking, setIsUnlinking] = useState(false)
  const cancelRef = React.useRef(null);
  const isOpen = (service !== undefined)

  if (service === undefined) {
    return null
  }
  const onClose = () => {
    setUnlinkService(undefined)
  }

  const unlinkFromApi = async (): Promise<boolean> => {
    const { error } = await api.services.unlink(service.name)
    // TODO: invalidate 'services' query to get updated isLinked
    return (!error)
  }

  const unlinkService = async () => {
    setIsUnlinking(true)
    const unlinked = await unlinkFromApi()
    setIsUnlinking(false)
    if (unlinked) {
      onClose()
    }
  }

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          <ServiceItem service={service}/>
        </AlertDialog.Header>
        <AlertDialog.Body>
          { t('unlink_confirm')}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              { t('cancel', { ns: "common" })}
            </Button>
            <Button
              isLoading={isUnlinking}
              isLoadingText={t('unlinking')}
              disabled={isUnlinking}
              colorScheme="danger"
              onPress={unlinkService}
            >
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
  const [unlinkService, setUnlinkService] = useState<Service | undefined>(undefined);
  const [search, setSearch] = useState("")

  return (
    <>
      <SearchBar
        placeholder={t('search_service')}
        search={search}
        setSearch={setSearch}
      />
      <ServiceList
        services={services.filter(service => service.name.includes(search))}
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
  const { isLoading, data, refetch } = useServices("", {
    select: (data) => (data.data === null) ? data : ({
      data: data.data.filter(service => service.isLinked),
      error: null
    })
  })
  const services: Service[] = data?.data || []

  return (
    <ScreenView>
      <NetworkView
        isLoading={isLoading}
        skeleton={<MyServicesSkeleton />}
        data={data}
        errorTitle={t('error_fetching')}
        refetch={refetch}
        render={services.length > 0 ? <MyServices services={services} /> : <NoLinkedServices />}
      />
    </ScreenView>
  )
}

export default MyServicesScreen