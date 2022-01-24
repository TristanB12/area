import React, { useLayoutEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import { Card, Image, Text, Icon, useTheme, Button } from "react-native-elements";
import Area, { ServiceAction } from "../types";
import areasMock from "../mock/areas";

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>

type RightHeaderButtonsProps = {
  navigation: EditAreaScreenProps['navigation']
}

function RightHeaderButtons({ navigation} : RightHeaderButtonsProps) {
  const { theme } = useTheme()

  const confirmDeletion = () =>
    Alert.alert(
      "Supprimer l'AREA",
      "Souhaitez-vous vraiment supprimer l'AREA ?",
      [
        {
          text: "OUI",
          onPress: () => {
            navigation.goBack()
          }
        },
        {
          text: "NON"
        },
      ]
  );

  return (
    <TouchableOpacity onPress={confirmDeletion}>
      <Icon
        name='delete'
        type='materialIcons'
        size={32}
        color={theme.colors?.primary}
      />
    </TouchableOpacity>
  )
}

function FieldEdit({ title } : { title: string }) {
  const { theme } = useTheme()

  return (
    <View style={{ width: "90%", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
      {
        title.length !== 0 ?
        <Text h2>
          { title }
        </Text>
        :
        <Text h2 style={{ fontStyle: "italic", color: "grey", fontWeight: "300" }}>
          Pas de description
        </Text>
      }
      <Icon
        name='edit'
        type='materialIcons'
        size={32}
        color={theme.colors?.primary}
      />
    </View>
  )
}

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightHeaderButtons navigation={navigation} />
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, paddingTop: 20, alignItems: 'center' }}>
      <FieldEdit title={area.title} />
      <FieldEdit title={area.description} />
      <ServiceCard action={area.action} />
      <ServiceCard action={area.reaction} />
      <Button
        title="Save"
        containerStyle={{ width: "90%"}}
        icon={{
          name: 'save',
          type: 'material-icons',
          size: 24,
          color: 'white',
        }}
        titleStyle={{
          fontSize: 20
        }}
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default EditAreaScreen