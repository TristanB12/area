import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import { Card, FAB, ListItem, Image } from "react-native-elements";
import Area from "../types";
import areasMock from "../mock/areas";

function ServiceListItem({ title, url } : { title: string, url: string }) {
  return (
    <>
      <Image
        source={{ uri: url }}
        containerStyle={{ width: 24, height: 24, marginRight: 10 }}
        resizeMode="contain"
      />
      <ListItem.Content>
        <ListItem.Title>
          { title }
        </ListItem.Title>
      </ListItem.Content>
    </>
  )
}

function AreaItem({ area, index } : { area: Area, index: number }) {
  const navigation = useNavigation<StackNavProp>()
  const goToEditArea = () => navigation.navigate('EditArea', { areaId: index })

  return (
    <TouchableOpacity onPress={goToEditArea}>
      <Card>
        <Card.Title h2 style={{ textAlign: "left" }}>
          { area.title }
        </Card.Title>
        <ListItem key={area.title}>
          <ServiceListItem
            title={area.action.service}
            url={area.action.logoUri}
          />
          <ServiceListItem
            title={area.reaction.service}
            url={area.reaction.logoUri}
          />
        </ListItem>
      </Card>
    </TouchableOpacity>
  )
}

function AreasScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        keyExtractor={(area: Area) => area.title }
        data={areasMock}
        renderItem={({ item, index }) => <AreaItem area={item} index={index} />}
      />
      <FAB
        icon={{ name: 'add', color: 'white' }}
        placement="right"
        size="large"
      />
    </View>
  )
}

export default AreasScreen