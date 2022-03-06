import React from "react";
import { Center, Heading, HStack, Icon, Skeleton, Text, VStack } from "native-base";
import NetworkView from "../../components/NetworkView";
import TabScreenView from "../../components/TabScreenView";
import useAreas from "../../hooks/useAreas";
import Area, { ServiceAction } from "../../types";
import ServiceCard, { ServiceCardSkeleton } from "../../components/ServiceCard";
import { useTranslation } from "react-i18next";
import Entypo from "react-native-vector-icons/Entypo";

function NbAreasOfService({ nbAreas } : { nbAreas: number }) {
  return (
    <Heading fontSize="md">
      { nbAreas } Area{nbAreas > 1 ? "s" : ""}
    </Heading>
  )
}

function NbAreasOfServiceSkeleton() {
  return (
    <Skeleton.Text lines={1} w="35%" />
  )
}

function AppsListSkeleton() {
  return (
    <VStack w="100%" space={4}>
      {
        [...Array(2).keys()].map((i) =>
          <ServiceCardSkeleton
            key={i}
            rightComponentSkeleton={<NbAreasOfServiceSkeleton />}
          />
        )
      }
    </VStack>
  )
}

type App = {
  service: {
    name: string,
    logoUri: string
  },
  nbAreas: number
}

function AppsList({ apps } : { apps: App[] }) {
  return (
    <VStack w="100%" space={4}>
      {
        apps.map((app) =>
          <ServiceCard
            key={app.service.name}
            service={app.service}
            rightComponent={<NbAreasOfService nbAreas={app.nbAreas} />}
          />
        )
      }
    </VStack>
  )
}

function NoApps() {
  const { t } = useTranslation('apps')

  return (
    <Center flex={1}>
      <VStack space={8} alignItems="center">
        <HStack space={4} alignItems="center">
          <Heading textAlign="center" color="primary.400">
            { t('no_apps_yet') }
          </Heading>
          <Icon
            size="sm"
            color="primary.400"
            as={<Entypo name="emoji-sad" />}
          />
        </HStack>
        <Text fontSize="lg">
          { t('create_app_hint') }
        </Text>
      </VStack>
    </Center>
  )
}

const addOrIncApps = (acc: App[], action: ServiceAction) => {
  const actionServiceIndex = (acc.findIndex(app =>
    app.service.name === action.service.name
  ))
  if (actionServiceIndex === -1) {
    acc.push({ service: action.service, nbAreas: 1 })
  } else {
    acc[actionServiceIndex].nbAreas += 1
  }
}

function Apps() {
  const { t } = useTranslation('areas')
  const { isLoading, data, refetch } = useAreas()
  const areas: Area[] = data?.data?.data || []
  const apps = areas.reduce<App[]>((acc, area) => {
    if (area.action) {
      addOrIncApps(acc, area.action)
    }
    if (area.reaction) {
      addOrIncApps(acc, area.reaction)
    }
    return acc
  }, [])

  return (
    <TabScreenView>
      <NetworkView
        isLoading={isLoading}
        skeleton={<AppsListSkeleton />}
        data={data}
        errorTitle={t('error_fetching')}
        refetch={refetch}
        render={apps.length > 0 ? <AppsList apps={apps} /> : <NoApps />}
      />
    </TabScreenView>
  )
}

export default Apps