import React from "react";
import { Heading, Skeleton, VStack } from "native-base";
import NetworkView from "../../components/NetworkView";
import TabScreenView from "../../components/TabScreenView";
import useAreas from "../../hooks/useAreas";
import Area from "../../types";
import ServiceCard, { ServiceCardSkeleton } from "../../components/ServiceCard";
import { useTranslation } from "react-i18next";

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

function Apps() {
  const { t } = useTranslation('areas')
  const { isLoading, data, refetch } = useAreas()
  const areas: Area[] = data?.data?.data || []
  const apps = areas.reduce<App[]>((acc, area) => {
    const serviceIndex = (acc.findIndex(app =>
      app.service.name === area.action?.service.name
      || app.service.name === area.reaction?.service.name
    ))
    if (area.action) {
      acc.push({ service: area.action.service, nbAreas: 2 })
    }
    if (area.reaction) {
      acc.push({ service: area.reaction.service, nbAreas: 1 })
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
        render={<AppsList apps={apps} />}
      />
    </TabScreenView>
  )
}

export default Apps