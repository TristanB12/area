import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import { Box, Image, HStack, Pressable, Text, VStack } from "native-base";
import Area from "../../types";
import areasAtom from "../../recoil/atoms/areas";
import { useRecoilValue } from "recoil";
import TabScreenView from "../../components/TabScreenView";

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
  const goToEditArea = () => navigation.navigate('EditArea', { areaId: area._id })

  if (area.action === undefined || area.reaction === undefined) {
    return null
  }

  return (
    <Pressable w="100%" onPress={goToEditArea}>
      <Box variant="card" p={3}>
        <Text color="secondary.900" fontWeight="medium" fontSize="sm">
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

function AreasScreen() {
  const areas = useRecoilValue(areasAtom)

  return (
    <TabScreenView>
      <VStack w="100%" space={4}>
        {
          areas.map(area =>
            <AreaItem key={area._id} area={area} />
          )
        }
      </VStack>
    </TabScreenView>
  )
}

export default AreasScreen