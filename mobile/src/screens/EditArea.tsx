import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import { Card, FAB, ListItem, Image, Text } from "react-native-elements";
import Area, { ServiceAction } from "../types";
import areasMock from "../mock/areas";

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>

function ServiceCard({ action } : { action: ServiceAction }) {
  return (
    <Card containerStyle={{ width: "90%" }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Image
          source={{ uri: action.logoUri }}
          containerStyle={{ width: 32, height: 32, marginRight: 10 }}
          resizeMode="contain"
        />
        <Text h2 style={{ flex: 1, textAlign: 'center' }}>
          { action.title }
        </Text>
      </View>
    </Card>
  )
}

function EditAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const { areaId } = route.params
  const area: Area = areasMock[areaId]

  return (
    <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
      <View style={{ width: "100%", flexDirection: "row", justifyContent: 'space-between', backgroundColor: 'red' }}>
        <Text h2>
          { area.title }
        </Text>
        <Text>
          SUPPER
        </Text>
      </View>
      <ServiceCard action={area.action} />
      <ServiceCard action={area.reaction} />
    </View>
  )
}

export default EditAreaScreen