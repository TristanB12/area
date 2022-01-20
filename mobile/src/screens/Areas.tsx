import React from "react";
import { View, FlatList } from "react-native";
import { Card, FAB, Icon, ListItem, Image } from "react-native-elements";
import areasMock, { Area } from "../mock/areas";

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

function AreaItem({ area } : { area: Area }) {
  return (
    <Card>
      <Card.Title style={{ textAlign: "left", fontFamily: "OpenSans", fontWeight: "bold", fontSize: 16}}>
        { area.title }
      </Card.Title>
      <ListItem>
        <ServiceListItem
          title={area.action}
          url="https://www.pngkit.com/png/detail/2-21145_youtube-logo-transparent-png-pictures-transparent-background-youtube.png"
        />
        <ServiceListItem
          title={area.reaction}
          url="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        />
      </ListItem>
    </Card>
  )
}

function AreasScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        keyExtractor={(area: Area) => area.title }
        data={areasMock}
        renderItem={item => <AreaItem area={item.item} />}
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