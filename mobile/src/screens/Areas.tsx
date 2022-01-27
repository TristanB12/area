import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import { Box, Image, HStack, Pressable, Text, VStack, Flex } from "native-base";
import Area from "../types";
import areasAtom from "../recoil/atoms/areas";
import { useRecoilValue } from "recoil";
import TabScreenView from "../components/TabScreenView";

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

  return (
    <Pressable w="100%" onPress={goToEditArea}>
      <Box
        shadow={6}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        p={3}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }}
        _light={{
          backgroundColor: "gray.50"
        }}
      >
        <Text color="secondary.900" fontWeight="medium" fontSize="sm">
          { area.title }
        </Text>
        <HStack mt={2}>
          <ServiceListItem
            title={area.action.service}
            url={area.action.logoUri}
          />
          <ServiceListItem
            title={area.reaction.service}
            url={area.reaction.logoUri}
          />
        </HStack>
      </Box>
    </Pressable>
    // <TouchableOpacity onPress={goToEditArea}>
    //   <Card>
    //     <Card.Title h2 style={{ textAlign: "left" }}>
    //       { area.title }
    //     </Card.Title>
    //     <ListItem key={`${area._id}`}>
    //
    //     </ListItem>
    //   </Card>
    // </TouchableOpacity>
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