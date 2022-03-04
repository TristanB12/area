import { Stack, Image, Text } from 'native-base'
import React from 'react'
import { Service } from '../types'

type ServiceItemProps = {
  service: Pick<Service, 'name' | 'logoUri'> & { [key: string]: any },
  direction?: "row" | "column",
  w?: string,
  size?: string
}

function ServiceItem({ service, direction, w, size } : ServiceItemProps) {
  return (
    <Stack direction={direction || "row"} w={w || "100%"} space={4} justifyContent="center" alignItems="center">
      <Image
        source={{ uri: service.logoUri }}
        size={size || "sm"}
        resizeMode="contain"
        alt={service.name}
      />
      <Text>
        { service.name }
      </Text>
    </Stack>
  )
}

export default ServiceItem