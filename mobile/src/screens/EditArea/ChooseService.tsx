import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavProp, StackParamList } from "../../navigation/types";
import { Box, Image, VStack, Text, Center, Skeleton, Icon} from "native-base";
import { Service } from "../../types";
import ScreenView from '../../components/ScreenView'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from "react-i18next";
import useServices from "../../hooks/useServices";
import ErrorFetching from "../../components/ErrorFetching";
import SearchBar, { SearchBarSkeleton } from "../../components/SearchBar";
import ServiceItem from "../../components/ServiceItem";

function ServiceCard({ service, isReaction } : { service: Service, isReaction: boolean }) {
  const actions = isReaction ? service.reactions : service.actions
  const needsLinking = (!service.isLinked && actions.every(action => action.requiresUserAuth))
  const navigation = useNavigation<StackNavProp>()
  const navigate = () => {
    if (needsLinking) {
      navigation.push('LinkService', {
        isReaction: isReaction,
        serviceName: service.name
      })
    } else {
      navigation.push('ChooseAction', {
        serviceName: service.name,
        isReaction: isReaction
      })
    }
  }

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={navigate}>
      <Box
        variant="card"
        m={2}
        p={4}
        justifyContent="center"
      >
        {
          needsLinking &&
          <Center position="absolute" top={0} right={0} roundedBottomLeft="lg" w="32px" h="32px" bg="tertiary.400">
            <Icon as={<FontAwesome name="link" />} color="white" size={4} />
          </Center>
        }
        <ServiceItem service={service} direction="column" size="xs" />
      </Box>
    </TouchableOpacity>
  )
}

function ServiceCardSkeleton() {
  return (
    <Box
      variant="card"
      flex={1}
      m={2}
      p={4}
      justifyContent="center"
    >
      <VStack space={4} alignItems="center">
        <Skeleton size="10" rounded="full" />
        <Skeleton.Text lines={1} w="50%" />
      </VStack>
    </Box>
  )
}

function SearchServices({ services, isReaction } : { services: Service[], isReaction: boolean }) {
  const { t } = useTranslation('services')
  const [search, setSearch] = useState("")

  return (
    <>
      <SearchBar
        placeholder={t('search_service')}
        search={search}
        setSearch={setSearch}
      />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{ width: "100%" }}
        keyExtractor={service => service.name}
        data={services ? services.filter(service => service.name.includes(search)) : []}
        renderItem={item => <ServiceCard service={item.item} isReaction={isReaction} />}
        numColumns={2}
      />
    </>
  )
}

function SearchServicesSkeleton() {
  return (
    <>
      <SearchBarSkeleton />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.toString()}
        data={[...Array(6).keys()]}
        renderItem={() => <ServiceCardSkeleton />}
        numColumns={2}
      />
    </>
  )
}

function ChooseServiceScreen({ route } : { route: RouteProp<StackParamList, 'ChooseService'> }) {
  const { isReaction } = route.params
  const { t } = useTranslation('services')
  const { isLoading, data, refetch } = useServices("", {
    select: (data) => (data.data === null) ? data : ({
      data: data.data.filter(service => service[(isReaction) ? 'reactions' : 'actions'].length > 0),
      error: null
    })
  })
  const services: Service[] = data?.data || []

  return (
    <ScreenView>
      {
        isLoading ? (
          <SearchServicesSkeleton />
        ) : (data === undefined || data.error) ? (
          <ErrorFetching
            title={t('error_fetching')}
            error={data?.error}
            refetch={refetch}
          />
        ) : (
          <SearchServices services={services} isReaction={isReaction} />
        )
      }
    </ScreenView>
  )
}

export default ChooseServiceScreen