import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Box, Image, HStack, Pressable, Text, VStack, Heading, Icon, Center, Fab, Skeleton, Button } from "native-base";
import { StackNavProp } from "../../navigation/types";
import Area from "../../types";
import { useSetRecoilState } from "recoil";
import TabScreenView from "../../components/TabScreenView";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import Entypo from 'react-native-vector-icons/Entypo'
import useAreas from "../../hooks/useAreas";
import NetworkView from "../../components/NetworkView";

function ServiceListItem({ title, url } : { title: string, url: string }) {
  return (
    <HStack flex="1" space={3} p={2} alignItems="center">
      <Image
        source={{ uri: url }}
        size="xs"
        resizeMode="contain"
        alt={title}
      />
      <Text >
        { title }
      </Text>
    </HStack>
  )
}

function AreaItem({ area } : { area: Area }) {
  const navigation = useNavigation<StackNavProp>()
  const setEditedArea = useSetRecoilState(editedAreaAtom)
  const goToEditArea = () => {
    setEditedArea(area)
    navigation.push('EditArea')
  }

  if (area.action === undefined || area.reaction === undefined) {
    return null
  }

  return (
    <Pressable w="100%" onPress={goToEditArea}>
      <Box variant="card" p={3}>
        <Text fontWeight="medium" fontSize="sm">
          { area.title }
        </Text>
        <HStack mt={2}>
          <ServiceListItem
            title={area.action.service.name}
            url={area.action.service.logoUri}
          />
          <ServiceListItem
            title={area.reaction.service.name}
            url={area.reaction.service.logoUri}
          />
        </HStack>
      </Box>
    </Pressable>
  )
}

function AreaList({ areas }: { areas: Area[] }) {
  return (
    <VStack w="100%" space={4}>
      {
        areas.map(area =>
          <AreaItem key={area.id} area={area} />
        )
      }
    </VStack>
  )
}

function NoAreas() {
  const { t } = useTranslation('areas')

  return (
    <Center flex={1}>
      <VStack space={8} alignItems="center">
        <HStack space={4} alignItems="center">
          <Heading textAlign="center" color="primary.400">
            { t('no_areas_yet') }
          </Heading>
          <Icon
            size="sm"
            color="primary.400"
            as={<Entypo name="emoji-sad" />}
          />
        </HStack>
        <Text fontSize="lg">
          { t('create_area_hint') }
        </Text>
      </VStack>
    </Center>
  )
}

function AreaItemSkeleton() {
  return (
    <Box w="100%" variant="card" p={3}>
      <Skeleton.Text lines={1} w="70%" />
      <HStack space={4} mt={2} alignItems="center">
        <Skeleton size="10" rounded="full" />
        <Skeleton.Text lines={1} w="25%" />
        <Skeleton size="10" rounded="full" />
        <Skeleton.Text lines={1} w="25%" />
      </HStack>
    </Box>
  )
}

function AreaListSkeleton() {
  return (
    <VStack w="100%" space={4}>
      <AreaItemSkeleton />
      <AreaItemSkeleton />
      <AreaItemSkeleton />
    </VStack>
  )
}

function AreasScreen() {
  const { t } = useTranslation('areas')
  const { isLoading, data, refetch } = useAreas()
  const areas: Area[] = data?.data?.data || []

  return (
    <TabScreenView>
      <NetworkView
        isLoading={isLoading}
        skeleton={<AreaListSkeleton />}
        data={data}
        errorTitle={t('error_fetching')}
        refetch={refetch}
        render={areas.length > 0 ? <AreaList areas={areas} /> : <NoAreas />}
      />
    </TabScreenView>
  )
}

export default AreasScreen