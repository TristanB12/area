import React from "react"
import { Box, HStack, Skeleton } from "native-base"
import { Service } from "../types"
import ServiceItem from "./ServiceItem"

type ServiceCardSkeletonProps = {
  rightComponentSkeleton?: JSX.Element
}

function ServiceCardSkeleton({ rightComponentSkeleton } : ServiceCardSkeletonProps) {
  return (
    <Box
      variant="card"
      p={4}
      alignItems="center"
    >
      {
        rightComponentSkeleton ? (
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <HStack w="50%" space={4} alignItems="center">
              <Skeleton size="10" rounded="full" />
              <Skeleton.Text lines={1} w="50%"/>
            </HStack>
            { rightComponentSkeleton }
          </HStack>
        ) : (
          <HStack w="100%" space={4} alignItems="center">
            <Skeleton size="10" rounded="full" />
            <Skeleton.Text lines={1} w="40%"/>
          </HStack>
        )
      }
    </Box>
  )
}

type ServiceCardProps = {
  service: Pick<Service, 'name' | 'logoUri'> & { [key: string]: any },
  rightComponent?: JSX.Element
}

function ServiceCard({ service, rightComponent } : ServiceCardProps) {
  return (
    <Box
      variant="card"
      p={4}
      alignItems="center"
    >
      {
        rightComponent ? (
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <ServiceItem service={service} w="50%" size="xs" />
            { rightComponent }
          </HStack>
        ) : (
          <ServiceItem service={service} />
        )
      }
    </Box>
  )
}

export { ServiceCardSkeleton }
export default ServiceCard